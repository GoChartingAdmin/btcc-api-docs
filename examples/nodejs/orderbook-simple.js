const Websocket = require('ws')
const { v4 } = require('uuid')

const ws = new Websocket('wss://ws.freesnow.com')

const SYMBOL = 'BTC_USD'

const subscribe = symbol => {
  return {
    action: 'Subscribe',
    symbol
  }
}

ws.on('open', () => {
  console.log('ws open')
  ws.send(JSON.stringify(subscribe(SYMBOL)))
  // 每 10s 获取一次 orderbook 全量
  setInterval(() => ws.send(JSON.stringify(subscribe(SYMBOL))), 10000)
})

ws.on('message', msg => {
  let data = {}
  try {
    data = JSON.parse(msg)
  } catch (err) {
    console.log(err)
  }
  if (data.MsgType === 'OrderBook' && data.Type === 'F') {
    // full orderbook here
    console.log(data.List)
  } else {
    // console.log(msg)
  }
})
ws.on('error', console.log)
ws.on('close', () => console.log('ws close'))
