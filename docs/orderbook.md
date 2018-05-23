## 维护 Orderbook

### 简单版

轮询请求全量, 例如: 每 10s 发送一次 [Subscribe](./README.md#subscribe) 请求, 完整版例子 [orderbook-simple](https://github.com/zcong1993/btcc-api-docs/blob/master/examples/nodejs/orderbook-simple.js)

```js
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
```

### 高级版(实时)(推荐)

发送 [Subscribe](./README.md#subscribe) 请求会收到一次 `Type` 为 'F' 的全量 orderbook, 之后会收到 `Type` 为 'I' 的增量.

规则:

* version 不为上个 `version + 1` 时, 重新订阅
* price 已存在, 增加或减少相应的 size
* price 不存在, 增加相应记录
* size 为 0 时, 删除该条

完整版例子 [orderbook](https://github.com/zcong1993/btcc-api-docs/blob/master/examples/nodejs/orderbook.js)
