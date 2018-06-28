// key or secret is only for staging local network test, do not put production key or secret here
import createHmac from 'create-hmac'
import { stringify } from 'qs'

const userId = 'add your id here'
const token = 'add your token here'

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
  user_id: userId,
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

origin.sign = sign(origin, token)

const subscribeChannal = (symbol = 'BTCUSD', action = 'Subscribe') => {
  return {
    action,
    symbol
  }
}

const priWsSubscribe = {
  action: 'Login',
  user_id: userId,
  timestamp: Date.now(),
  nonce: Math.random()
    .toString()
    .slice(2, 10)
}
priWsSubscribe.sign = sign(priWsSubscribe, token)

const priWsUnSubscribe = {
  action: 'Logout',
  user_id: userId,
  timestamp: Date.now(),
  nonce: Math.random()
    .toString()
    .slice(2, 10)
}
priWsUnSubscribe.sign = sign(priWsUnSubscribe, token)

const getOpenOrders = {
  action: 'GetOpenOrders',
  user_id: userId,
  symbol,
  timestamp: Date.now(),
  nonce: Math.random()
    .toString()
    .slice(2, 10)
}
getOpenOrders.sign = sign(getOpenOrders, token)

const cancelOrder = {
  action: 'CancelOrder',
  user_id: userId,
  order_id: '3c30282fef1b49849435e27f3a083299',
  symbol,
  timestamp: Date.now(),
  nonce: Math.random()
    .toString()
    .slice(2, 10)
}
cancelOrder.sign = sign(cancelOrder, token)

const retrieveOrder = {
  action: 'RetrieveOrder',
  user_id: userId,
  order_id: '3e1bdd7d35294ba7afc10ed9b1d4b598',
  symbol,
  timestamp: Date.now(),
  nonce: Math.random()
    .toString()
    .slice(2, 10)
}
retrieveOrder.sign = sign(retrieveOrder, token)

const cancelAllOrders = {
  action: 'CancelAllOrders',
  user_id: userId,
  symbol,
  side: 'ALL',
  timestamp: Date.now(),
  nonce: Math.random()
    .toString()
    .slice(2, 10)
}
cancelAllOrders.sign = sign(cancelAllOrders, token)

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
