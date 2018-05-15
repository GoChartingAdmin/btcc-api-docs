const { createHmac } = require('crypto')
const { stringify } = require('qs')
const { v4 } = require('uuid')
const Websocket = require('ws')

const userId = 'your user id here'
const token = 'your token here'

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

const getAccountInfo = {
  crid: v4(),
  action: 'GetAccountInfo',
  user_id: userId,
  timestamp: Date.now(),
  nonce: Math.random()
    .toString()
    .slice(2, 10)
}
getAccountInfo.sign = sign(getAccountInfo, token)

const ws = new Websocket('wss://ws.freesnow.com')

ws.on('open', () => {
  console.log('ws open')
  ws.send(JSON.stringify(getAccountInfo))
})

ws.on('message', console.log)
ws.on('error', console.log)
ws.on('close', () => console.log('ws close'))
