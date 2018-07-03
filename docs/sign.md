## 签名

签名使用 `hmac sha256`, 将请求需要的字段 _从小到大排序_ 然后 `querystring stringify` 再用 `secret_key` 作为 `secret` 生成 `hex` 格式签名

示例代码:

```js
import createHmac from 'create-hmac'
import { stringify } from 'qs'

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
```

可以参考[example/index.js](../example/index.js)
