// key or secret is only for staging local network test, do not put production key or secret here
import createHmac from 'create-hmac'
import { stringify } from 'qs'

const publicKey = 'add your public key here'
const secretKey = 'add your secret key here'

// object sort
const sortObj = obj => {
  const res = {}
  Object.keys(obj)
    .sort()
    .forEach(k => {
      res[k] = obj[k]
    })
  return res
}

// querystring payload object then hmac sha256
const sign = (payload, secret) => {
  let content = payload
  if (typeof payload === 'object') {
    content = stringify(sortObj(payload))
  }
  const hmac = createHmac('sha256', Buffer.from(secret))
  hmac.update(content)
  return hmac.digest('hex')
}

const symbol = 'BTC_USD'

const origin = {
  action: 'PlaceOrder',
  public_key: publicKey,
  symbol,
  side: 'SELL',
  order_type: 'LIMIT',
  quantity: 0.001,
  price: 8002.11,
  timestamp: Date.now(),
  nonce: Math.random()
    .toString()
    .slice(2, 10)
}

origin.sign = sign(origin, secretKey)

const subscribeChannal = (symbol = 'BTCUSD', action = 'Subscribe') => {
  return {
    action,
    symbol
  }
}

const priWsSubscribe = {
  action: 'Login',
  public_key: publicKey,
  timestamp: Date.now(),
  nonce: Math.random()
    .toString()
    .slice(2, 10)
}
priWsSubscribe.sign = sign(priWsSubscribe, secretKey)

const priWsUnSubscribe = {
  action: 'Logout',
  public_key: publicKey,
  timestamp: Date.now(),
  nonce: Math.random()
    .toString()
    .slice(2, 10)
}
priWsUnSubscribe.sign = sign(priWsUnSubscribe, secretKey)

const getOpenOrders = {
  action: 'GetOpenOrders',
  public_key: publicKey,
  symbol,
  timestamp: Date.now(),
  nonce: Math.random()
    .toString()
    .slice(2, 10)
}
getOpenOrders.sign = sign(getOpenOrders, secretKey)

const cancelOrder = {
  action: 'CancelOrder',
  public_key: publicKey,
  order_id: '3c30282fef1b49849435e27f3a083299',
  symbol,
  timestamp: Date.now(),
  nonce: Math.random()
    .toString()
    .slice(2, 10)
}
cancelOrder.sign = sign(cancelOrder, secretKey)

const retrieveOrder = {
  action: 'RetrieveOrder',
  public_key: publicKey,
  order_id: '3e1bdd7d35294ba7afc10ed9b1d4b598',
  symbol,
  timestamp: Date.now(),
  nonce: Math.random()
    .toString()
    .slice(2, 10)
}
retrieveOrder.sign = sign(retrieveOrder, secretKey)

const cancelAllOrders = {
  action: 'CancelAllOrders',
  public_key: publicKey,
  symbol,
  side: 'ALL',
  timestamp: Date.now(),
  nonce: Math.random()
    .toString()
    .slice(2, 10)
}
cancelAllOrders.sign = sign(cancelAllOrders, secretKey)

const isLocal = false

const wsUrl = isLocal ? 'ws://localhost:9393' : 'wss://ws.btcc.com'

console.log(wsUrl)

const ws = new WebSocket(wsUrl)

ws.addEventListener('open', () => {
  console.log('ws open')
  // ws.send(JSON.stringify(cancelOrder))
  console.log('send', JSON.stringify(origin))
  // Array(62).fill(null).forEach(() => ws.send(JSON.stringify(origin)))
  // ws.send(JSON.stringify(cancelAllOrders))
  ws.send(JSON.stringify(getOpenOrders))
  // ws.send(JSON.stringify(retrieveOrder))
  // ws.send(JSON.stringify(cancelOrder))
  // ws.send(JSON.stringify(origin))
  // subscribe channel
  // ws.send(JSON.stringify(subscribeChannal(symbol)))
  // ws.send(JSON.stringify(priWsSubscribe))
  // setTimeout(() => {
  //   console.log('unsubscribe')
  //   ws.send(JSON.stringify(subscribeChannal(symbol, 'UnSubscribe')))
  //   ws.send(JSON.stringify(priWsUnSubscribe))
  // }, 5000)
})
ws.addEventListener('message', msg => console.log(JSON.parse(msg.data)))
ws.addEventListener('error', console.log)
ws.onclose = () => console.log('ws close')
