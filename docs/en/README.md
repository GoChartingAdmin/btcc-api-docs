# WS-API

## Table of Contents

* [Examples](#examples)

* [Common](#common)

* [PUBLIC MESSAGE](#public-message)

  * [GetActiveContracts](#getactivecontracts)
  * [GetTrades](#gettrades)
  * [SubscribeAllTickers](#subscribealltickers)
  * [UnSubscribeAllTickers](#unsubscribealltickers)
  * [Subscribe](#subscribe)
  * [UnSubscribe](#unsubscribe)

* [PRIVATE MESSAGE](#private-message)

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

## Common

You can add `crid` field for all requests. If you add this field, it will be returned in `CRID` value. If you do not add this field, then it is a random `uuid`.

## PUBLIC MESSAGE

No signature and `common` fields

### GetActiveContracts

get all of the current trading pairs information by using `action` field

```json
{
  "action": "GetActiveContracts"
}
```

#### Response

[GetActiveContractsResponse](./engine.md#getactivecontractsresponse)

### GetTrades

Search the specific trading pair’s transaction history

| Parameter | Required |  Type  |          Explanation          |
| :-------: | :------: | :----: | :---------------------------: |
|  symbol   |   YES    | string | trading pair (e.g. 'BTC_USD') |
|   count   |   YES    | number |      quantity: 100 limit      |

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

Subscribe all of the trading pairs’ tickers, push all of the ticker arrays every second

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

Unsubscribe all of the trading pairs’ tickers

```json
{
  "action": "UnSubscribeAllTickers"
}
```

### Subscribe

Subscribe a specific trading pair’s `ticker` and `orderbook`

#### params

| Parameter | Required |  Type  |          Explanation          |
| :-------: | :------: | :----: | :---------------------------: |
|  symbol   |   YES    | string | trading pair (e.g. 'BTC_USD') |

```json
{
  "action": "Subscribe",
  "symbol": "BTC_USD"
}
```

#### Response

Push this trading pair’s [2.2 Ticker](./engine.md#22-ticker) and [2.3 OrderBook](./engine.md#23-orderbook) messages continuously

### UnSubscribe

Unsubscribe a specific trading pair’s `ticker` and `orderbook`

#### params

| Parameter | Required |  Type  |          Explanation          |
| :-------: | :------: | :----: | :---------------------------: |
|  symbol   |   YES    | string | trading pair (e.g. 'BTC_USD') |

```json
{
  "action": " UnSubscribe",
  "symbol": "BTC_USD"
}
```

## PRIVATE MESSAGE

### common

Add common field for all kind of requests

#### params

| Parameter  | Required |       Type       |                                                       Explanation                                                       |
| :--------: | :------: | :--------------: | :---------------------------------------------------------------------------------------------------------------------: |
| timestamp  |   YES    |  timestamp (13)  |                        13-digit timestamp (Server will not request an expired request over `2s`)                        |
|   nonce    |   YES    | string or number |                                                  8-digit random number                                                  |
| public_key |   YES    |      string      |                             user public key (not username, get it from user control center)                             |
|    sign    |   YES    |      string      |                     signature （please see the [sign.md](./sign.md) for the detailed information）                      |
|   action   |   YES    |      string      |                                          message type（support type as below）                                          |
|    crid    |   YES    |      string      | If you add `crid` field, it will be returned in `CRID` value. If you do not add this field, then it is a random `uuid`. |

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

Subscribe push notification

#### params

use `common` field

#### Response

[LoginResponse](./engine.md#loginresponse)

Push [ExecReport](./engine.md#execreport) when order state change. Push [AccountInfo](./engine.md#accountinfo) when account assets change.

### Logout

Unsubscribe push notification

#### params

use `common` field

#### Response

[LogoutResponse](./engine.md#logoutresponse)

### PlaceOrder

place orders

#### params

| Parameter  | Required |               Type               |                                          Explanation                                           |
| :--------: | :------: | :------------------------------: | :--------------------------------------------------------------------------------------------: |
|   symbol   |   YES    |              string              |                                 trading pair (e.g. 'BTC_USD')                                  |
|    side    |   YES    |       enum ('SELL', 'BUY')       |                                          buy or sell                                           |
| order_type |   YES    | enum ('LIMIT', 'MARKET', 'STOP') |                    order type: market order, limit order or stop-loss order                    |
| stop_price |    NO    |              number              |       stop-loss price: `>0`, The required change to YES when order_type is `STOP` order        |
|   price    |   YES    |              number              |                                          price: `>0`                                           |
|  quantity  |   YES    |              number              | trading volume:`>0` (get different trading pair configuration according to GetActiveContracts) |

#### Response

[PlaceOrderResponse](./engine.md#placeorderresponse)

### GetOpenOrders

Get open orders for specific trading pair, you can query all your trading pairs’ transaction history when `symbol`’s status is `null`

#### params

| Parameter | Required |   Type    |                   Explanation                   |
| :-------: | :------: | :-------: | :---------------------------------------------: |
|  symbol   |    NO    |  string   |          trading pair (e.g. 'BTC_USD')          |
|   begin   |    NO    | timestamp |    query begin timestamp: default value `0`     |
|    end    |    NO    | timestamp | query end timestamp: default value `Date.now()` |

#### Response

[GetOrdersResponse](./engine.md#getordersresponse)

### GetClosedOrders

Get closed orders for specific trading pair, you can query all your trading pairs’ transaction history when `symbol`’s status is `null`

#### params

| Parameter | Required |   Type    |                   Explanation                   |
| :-------: | :------: | :-------: | :---------------------------------------------: |
|  symbol   |    NO    |  string   |          trading pair (e.g. 'BTC_USD')          |
|   begin   |    NO    | timestamp |    query begin timestamp: default value `0`     |
|    end    |    NO    | timestamp | query end timestamp: default value `Date.now()` |

#### Response

[GetOrdersResponse](./engine.md#getordersresponse)

### GetAllOrders

Get all ordersfor specific trading pair, you can query all your transaction history when `symbol` is `null`

#### params

| Parameter | Required |   Type    |                   Explanation                   |
| :-------: | :------: | :-------: | :---------------------------------------------: |
|  symbol   |   YES    |  string   |          trading pair (e.g. 'BTC_USD')          |
|   begin   |    NO    | timestamp |    query begin timestamp: default value `0`     |
|    end    |    NO    | timestamp | query end timestamp: default value `Date.now()` |

#### Response

[GetOrdersResponse](./engine.md#getordersresponse)

### CancelOrder

cancel order

#### params

| Parameter | Required |  Type  |          Explanation          |
| :-------: | :------: | :----: | :---------------------------: |
|  symbol   |   YES    | string | trading pair (e.g. 'BTC_USD') |
| order_id  |   YES    | string |        order ID: `OID`        |

#### Response

[Cancel replace order response](./engine.md#cancelorderresponse)

### CancelReplaceOrder

Update the information of pending orders

#### params

|  Parameter   | Required |  Type  |                                           Explanation                                           |
| :----------: | :------: | :----: | :---------------------------------------------------------------------------------------------: |
|    symbol    |   YES    | string |                                  trading pair (e.g. 'BTC_USD')                                  |
|   order_id   |   YES    | string |                                         order ID: `OID`                                         |
|    price     |   YES    | number |                                           price: `>0`                                           |
|  stop_price  |    NO    | number |        stop-loss price: `>0`, The required change to YES when order_type is `STOP` order        |
|   quantity   |   YES    | number | trading volume: `>0` (get different trading pair configuration according to GetActiveContracts) |
| old_quantity |   YES    | number |                                        unfilled quantity                                        |

#### Response

[Cancel replace order response](./engine.md#cancelreplaceorderresponse)

### CancelAllOrders

Cancel all pending orders

#### params

| Parameter  | Required |            Type             |                      Explanation                       |
| :--------: | :------: | :-------------------------: | :----------------------------------------------------: |
|   symbol   |   YES    |           string            |             trading pair (e.g. 'BTC_USD')              |
|    side    |   YES    | enum ('SELL', 'BUY', 'ALL') |                      buy or sell                       |
| high_price |    NO    |           number            | cancel price range: high price, default value `100000` |
| low_price  |    NO    |           number            |    cancel price range: low price, default value `0`    |

#### Response

[CancelAllOrdersResponse](./engine.md#cancelallordersresponse)

### RetrieveOrder (deprecated)

retrieve order (deprecated)

#### params

| Parameter | Required |  Type  |          Explanation          |
| :-------: | :------: | :----: | :---------------------------: |
| order_id  |   YES    | string |        order ID: `OID`        |
|  symbol   |   YES    | string | trading pair (e.g. 'BTC_USD') |

### GetAccountInfo

Get account assets’ details

#### params

use `common` field

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
