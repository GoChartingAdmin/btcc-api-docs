const WebSocket = require('ws')
const Big = require('big.js')

class Orderbook {
  constructor({ wsUrl = 'wss://ws.freesnow.com', symbol = 'BTC_USD' } = {}) {
    this.ws = new WebSocket(wsUrl)
    this.symbol = symbol

    this._version = null
    this._orderbook = new Map()

    this.ws.on('open', this._onOpen.bind(this))
    this.ws.on('message', msg => this._onMessage(msg))
    this.ws.on('error', console.log)
    this.ws.on('close', () => console.log('ws close'))
  }

  _onOpen() {
    console.log('ws open')
    // subscribe
    this.ws.send(
      JSON.stringify({
        action: 'Subscribe',
        symbol: this.symbol
      })
    )
  }

  _onMessage(msg) {
    let data
    try {
      data = JSON.parse(msg)
    } catch (err) {
      console.log(`bad ws json, ${msg}`)
    }
    if (data.MsgType === 'OrderBook') {
      if (data.Type === 'F') {
        // full orderbook
        // set version
        this._version = data.Version
        if (Array.isArray(data.List)) {
          data.List.forEach(o => {
            this._orderbook.set(o.Price, o)
          })
        }
      } else if (data.Type === 'I') {
        // increasement
        if (data.Version !== ++this._version) {
          // missing orderbook, refetch
          this.ws.send(
            JSON.stringify({
              action: 'Subscribe',
              symbol: this.symbol
            })
          )
        } else {
          if (Array.isArray(ob)) {
            ob.forEach(o => {
              if (this._orderbook.has(o.Price)) {
                // if exists, update
                const _update = this._orderbook.get(o.Price)
                _update.Size = new Big(_update.Size).add(o.Size).toString()
                // delete, if quantity is 0
                if (_update.Size === '0') {
                  this._orderbook.delete(o.Price)
                } else {
                  this._orderbook.set(o.Price, _update)
                }
              } else {
                // if not exists, add to cache
                this._orderbook.set(o.Price, o)
              }
            })
          }
        }
      }
    }
  }

  // get orderbook here
  get orderbook() {
    return [...this._orderbook.values()]
  }
}

// const ob = new Orderbook()
// setInterval(() => console.log(ob._version, ob.orderbook), 1000)
