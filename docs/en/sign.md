## SIGNATURE

Use `hmac sha256` on the signature. The request fields _sorted from small to large_, and then use `querystring stringify`. Generate `hex` signature by using `secret_key` as `secret`.

For example:

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

[example/index.js](../example/index.js) as reference
