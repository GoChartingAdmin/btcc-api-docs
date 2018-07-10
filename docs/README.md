# WS-API

## Table of Contents

* [Examples](#examples)

* [Heartbeat](#heartbeat)

* [Common](#common)

* [PUBLIC 消息](#public-消息)

  * [GetActiveContracts](#getactivecontracts)
  * [GetTrades](#gettrades)
  * [SubscribeAllTickers](#subscribealltickers)
  * [UnSubscribeAllTickers](#unsubscribealltickers)
  * [Subscribe](#subscribe)
  * [UnSubscribe](#unsubscribe)

* [PRIVATE 消息](#private-消息)

  * [common](#common-1)
  * [Login](#login)
  * [Logout](#logout)
  * [PlaceOrder](#placeorder)
  * [GetOpenOrders](#getopenorders)
  * [GetClosedOrders](#getclosedorders)
  * [GetAllOrders](#getallorders)
  * [CancelOrder](#cancelorder)
  * [CancelReplaceOrder](#cancelreplaceorder)
  * [CancelAllOrders](#cancelallorders)
  * [RetrieveOrder (deprecated)](#retrieveorder-deprecated)
  * [GetAccountInfo](#getaccountinfo)

* [ERROR RC CODE](#error-rc-code)

## Examples

* [Javascript](https://github.com/zcong1993/btcc-api-docs/tree/master/examples/js)
* [NodeJS](https://github.com/zcong1993/btcc-api-docs/tree/master/examples/nodejs)
* [Python3](https://github.com/zcong1993/btcc-api-docs/tree/master/examples/python3)

## Heartbeat

#### 被动心跳

每隔 4s 左右会收到服务端心跳包 `{"MsgType":"Heartbeat"}`, 订阅 public 消息之后可能会更加频繁.

#### 主动心跳

客户端可以主动向服务端发送主动心跳, 格式如下:

```json
{
  "action": "PositiveHeartbeat",
  "data": "any data, 可选参数"
}
```

你将收到以下消息:

```json
{
  "MsgType": "PositiveHeartbeat",
  "data": "any data, 可选参数"
}
```

## Common

所有请求均可加 `crid` 字段, 若主动附带此字段, 则返回值中 `CRID` 会与此保持一致, 若忽略该字段, 则为随机 `uuid`

## PUBLIC 消息

不需要签名和任何 `common` 字段

### GetActiveContracts

获取当前所有开放的交易对信息, 仅需要 `action` 字段

```json
{
  "action": "GetActiveContracts"
}
```

#### Response

[GetActiveContractsResponse](./engine.md#getactivecontractsresponse)

### GetTrades

查询特定交易对历史成交记录

| Parameter | Required |  Type  |       Explanation       |
| :-------: | :------: | :----: | :---------------------: |
|  symbol   |   YES    | string | 交易对 (例：'BTC_USD'） |
|   count   |   YES    | number |   订单数量：上限 100    |

```json
{
  "action": "GetTrades",
  "symbol": "BTC_USD",
  "count": 50
}
```

#### Response

[GetTradesResponse](./engine.md#gettradesresponse)

### SubscribeAllTickers

订阅所有交易对的 Tickers, 每秒推送所有 ticker 数组

```json
{
  "action": "SubscribeAllTickers"
}
```

#### Response

```json
{
  "MsgType": "AllTickersResponse",
  "data": ["...tickers"]
}
```

### UnSubscribeAllTickers

取消订阅所有交易对的 Tickers

```json
{
  "action": "UnSubscribeAllTickers"
}
```

### Subscribe

订阅特定交易对的 `ticker` 和 `orderbook`

#### params

| Parameter | Required |  Type  |       Explanation       |
| :-------: | :------: | :----: | :---------------------: |
|  symbol   |   YES    | string | 交易对 (例：'BTC_USD'） |

```json
{
  "action": "Subscribe",
  "symbol": "BTC_USD"
}
```

#### Response

会持续推送该交易对的[2.2 Ticker](./engine.md#22-ticker) 和 [2.3 OrderBook](./engine.md#23-orderbook) 的消息

### UnSubscribe

取消订阅特定交易对的 `ticker` 和 `orderbook`

#### params

| Parameter | Required |  Type  |       Explanation       |
| :-------: | :------: | :----: | :---------------------: |
|  symbol   |   YES    | string | 交易对 (例：'BTC_USD'） |

```json
{
  "action": " UnSubscribe",
  "symbol": "BTC_USD"
}
```

## PRIVATE 消息

### common

common 为每种请求均必须附带的字段

#### params

| Parameter  | Required |       Type       |                                    Explanation                                    |
| :--------: | :------: | :--------------: | :-------------------------------------------------------------------------------: |
| timestamp  |   YES    |  timestamp (13)  |                   13 位时间戳, 服务端不会请求过期`2s`以上的请求                   |
|   nonce    |   YES    | string 或 number |                                   8 位随机数字                                    |
| public_key |   YES    |      string      |                    用户 public key (非用户名, 在个人中心申请)                     |
|    sign    |   YES    |      string      |                         签名（详见[sign.md](./sign.md)）                          |
|   action   |   YES    |      string      |                           消息类型（ 支持的类型见下方）                           |
|    crid    |   YES    |      string      | 若主动附带此字段, 则返回值中 `CRID` 会与此保持一致, 若忽略该字段, 则为随机 `uuid` |

```js
  action: {
    type: 'string',
    enum: [
      'Login',
      'Logout',
      'PlaceOrder',
      'GetOpenOrders',
      'GetClosedOrders',
      'GetAllOrders',
      'CancelOrder',
      'CancelAllOrders',
      'RetrieveOrder',
      'GetAccountInfo',
      'CancelReplaceOrder'
    ]
  }
```

### Login

订阅帐号相关消息推送

#### params

仅需要 `common` 字段

#### Response

[LoginResponse](./engine.md#loginresponse)

并会在账户订单状态变动时推送 [ExecReport](./engine.md#execreport), 在账户资产变动时推送 [AccountInfo](./engine.md#accountinfo)

### Logout

取消订阅帐号相关消息推送

#### params

仅需要 `common` 字段

#### Response

[LogoutResponse](./engine.md#logoutresponse)

### PlaceOrder

下单操作

#### params

| Parameter  | Required |               Type               |                           Explanation                            |
| :--------: | :------: | :------------------------------: | :--------------------------------------------------------------: |
|   symbol   |   YES    |              string              |                     交易对 (例：'BTC_USD'）                      |
|    side    |   YES    |       enum ('SELL', 'BUY')       |                             买或者卖                             |
| order_type |   YES    | enum ('LIMIT', 'MARKET', 'STOP') |                 订单类型: 市价单、限价单或止损单                 |
| stop_price |    NO    |              number              |   止损价格： `>0`, order_type 为 `STOP` 时，required 变为 YES    |
|   price    |   YES    |              number              |                            价格: `>0`                            |
|  quantity  |   YES    |              number              | 订单交易量: `>0`(具体根据 GetActiveContracts 获取不同交易对配置) |

#### Response

[PlaceOrderResponse](./engine.md#placeorderresponse)

### GetOpenOrders

获取自己当前正在进行的订单记录, `symbol` 为 `null` 时，可查询所有交易对的记录

#### params

| Parameter | Required |   Type    |            Explanation             |
| :-------: | :------: | :-------: | :--------------------------------: |
|  symbol   |    NO    |  string   |      交易对 (例：'BTC_USD'）       |
|   begin   |    NO    | timestamp |     查询开始时间戳，默认值`0`      |
|    end    |    NO    | timestamp | 查询结束时间戳, 默认值`Date.now()` |

#### Response

[GetOrdersResponse](./engine.md#getordersresponse)

### GetClosedOrders

获取自己已关闭的订单记录, `symbol` 为 `null` 时，可查询所有交易对的记录

#### params

| Parameter | Required |   Type    |            Explanation             |
| :-------: | :------: | :-------: | :--------------------------------: |
|  symbol   |    NO    |  string   |      交易对 (例：'BTC_USD'）       |
|   begin   |    NO    | timestamp |     查询开始时间戳, 默认值`0`      |
|    end    |    NO    | timestamp | 查询结束时间戳, 默认值`Date.now()` |

#### Response

[GetOrdersResponse](./engine.md#getordersresponse)

### GetAllOrders

获取自己所有订单记录, `symbol` 为 `null` 时，可查询所有交易对的记录

#### params

| Parameter | Required |   Type    |            Explanation             |
| :-------: | :------: | :-------: | :--------------------------------: |
|  symbol   |   YES    |  string   |      交易对 (例：'BTC_USD'）       |
|   begin   |    NO    | timestamp |     查询开始时间戳, 默认值`0`      |
|    end    |    NO    | timestamp | 查询结束时间戳, 默认值`Date.now()` |

#### Response

[GetOrdersResponse](./engine.md#getordersresponse)

### CancelOrder

取消订单

#### params

| Parameter | Required |  Type  |       Explanation       |
| :-------: | :------: | :----: | :---------------------: |
|  symbol   |   YES    | string | 交易对 (例：'BTC_USD'） |
| order_id  |   YES    | string |     订单号： `OID`      |

#### Response

[Cancel replace order response](./engine.md#cancelorderresponse)

### CancelReplaceOrder

更新未成交的订单信息

#### params

|  Parameter   | Required |  Type  |                            Explanation                            |
| :----------: | :------: | :----: | :---------------------------------------------------------------: |
|    symbol    |   YES    | string |                      交易对 (例：'BTC_USD'）                      |
|   order_id   |   YES    | string |                          订单号： `OID`                           |
|    price     |   YES    | number |                            价格： `>0`                            |
|  stop_price  |    NO    | number |    止损价格： `>0`, order_type 为 `STOP` 时，required 变为 YES    |
|   quantity   |   YES    | number | 订单交易量： `>0`(具体根据 GetActiveContracts 获取不同交易对配置) |
| old_quantity |   YES    | number |                       下单后，未成交的订单                        |

#### Response

[Cancel replace order response](./engine.md#cancelreplaceorderresponse)

### CancelAllOrders

批量取消订单

#### params

| Parameter  | Required |            Type             |               Explanation                |
| :--------: | :------: | :-------------------------: | :--------------------------------------: |
|   symbol   |   YES    |           string            |         交易对 (例：'BTC_USD'）          |
|    side    |   YES    | enum ('SELL', 'BUY', 'ALL') |                 买或者卖                 |
| high_price |    NO    |           number            | 取消价格范围： 最高价格, 默认值 `100000` |
| low_price  |    NO    |           number            |   取消价格范围： 最低价格, 默认值 `0`    |

#### Response

[CancelAllOrdersResponse](./engine.md#cancelallordersresponse)

### RetrieveOrder (deprecated)

查询订单 (deprecated)

#### params

| Parameter | Required |  Type  |       Explanation       |
| :-------: | :------: | :----: | :---------------------: |
| order_id  |   YES    | string |     订单号： `OID`      |
|  symbol   |   YES    | string | 交易对 (例：'BTC_USD'） |

### GetAccountInfo

获取账户余额详情

#### params

仅需要 `common` 字段

#### Response

[GetAccountInfoResponse](./engine.md#getaccountinforesponse)

## ERROR RC CODE

```js
exports.TIME_IN_FORCE = {
  DAY: '0',
  GTC: '1'
}

exports.ERROR_REPONSED = {
  INVALID_JSON_PAYLOAD: {
    RC: '-2001',
    data: 'invalid json payload'
  },
  WS_NOT_OK: {
    RC: '-2002',
    data: 'ws not ok, try again later'
  },
  AUTH_ERROR: {
    RC: '-2003',
    data: 'auth error'
  },
  NEED_LOGIN: {
    RC: '-2004',
    data: 'action need login first'
  },
  INVALID_ACTION: {
    RC: '-2005',
    data: 'invalid action'
  },
  INVALID_SYMBOL: {
    RC: '-2007',
    data: 'invalid symbol'
  }
}

exports.VALIDATE_ERROR_CODE = '-2006'
```
