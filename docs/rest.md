# REST-API

## Table of Contents

* [V1](#v1)

  * [closedorders post /v1/closedorders](#closedorders-post-v1closedorders)
  * [ticker get /v1/ticker](#ticker-get-v1ticker)
  * [orderbook get /v1/orderbook](#orderbook-get-v1orderbook)
  * [activecontracts get /v1/activecontracts](#activecontracts-get-v1activecontracts)

## V1

### closedorders `post /v1/closedorders`

#### Params

| Parameter  | Required |  Type  |                              Explanation                               |
| :--------: | :------: | :----: | :--------------------------------------------------------------------: |
|   symbol   |   YES    | string |                                 交易对                                 |
|   begin    |   YES    | string |                  开始时间， 如：‘2018-07-06 00:00:00’                  |
|    end     |   YES    | string |                 结束时间：与开始时间间隔不能超过一个月                 |
| public_key |   YES    | string |               用户 public key (非用户名, 在个人中心申请)               |
|    sign    |   YES    | string | 签名， [签名算法](./sign.md) |

#### Response

```json
{
  "RC": 0,
  "message": "successful operation",
  "data": [
    {
      "Timestamp": 1524641909134,
      "CRID": "af1b7fb8-3e1f-4e1f-8224-53c498685298",
      "OID": "183c04b53fa84d9186222841f1fdb399",
      "Symbol": "BTC_USD",
      "Side": "2",
      "OrderType": "2",
      "LastQty": 0,
      "CumQty": 0,
      "LeaveQty": 0,
      "Price": 8002.11,
      "StopPrice": 0,
      "Status": "4",
      "Text":
        "Canceled by request: id=af1b7fb8-3e1f-4e1f-8224-53c498685298 account=Books",
      "TimeInForce": "1",
      "ExprDate": 0,
      "ExprTime": "00: 00: 00",
      "AveragePrice": "0",
      "ExecutionDetails": [],
      "Created": 1524641723244,
      "FeeExchange": 0,
      "FeeExchangeOvernight": 0,
      "TradeFeeLogs": [],
      "IsLiquidation": false,
      "IsEarlyProfit": false,
      "IsDelivery": false,
      "Account": "Books",
      "MsgType": "ExecReport"
    }
  ]
}
```

### ticker `get /v1/ticker`

#### Params

| Parameter | Required |  Type  | Explanation |
| :-------: | :------: | :----: | :---------: |
|  symbol   |   YES    | string |   交易对    |

#### Response

```json
{
  "RC": 0,
  "message": "successful operation",
  "data": {
    "Symbol": "BTC_USD",
    "BidPrice": 6693.8,
    "AskPrice": 6693.9,
    "Open": 6713.2,
    "High": 6713.2,
    "Low": 6713.2,
    "Last": 6713.2,
    "LastQuantity": 0.0001,
    "PrevCls": 6713.2,
    "Volume": 0,
    "Volume24H": 0.0001,
    "Timestamp": 1531180801039,
    "ExecutionLimitDown": 0,
    "ExecutionLimitUp": 0,
    "MsgType": "Ticker"
  }
}
```

### orderbook `get /v1/orderbook`

#### Params

| Parameter | Required |  Type  | Explanation |
| :-------: | :------: | :----: | :---------: |
|  symbol   |   YES    | string |   交易对    |

#### Response

```json
{
  "RC": 0,
  "message": "successful operation",
  "data": [
    {
      "Side": "1",
      "Size": 0.121,
      "Price": 6693.8
    },
    {
      "Side": "2",
      "Size": 0.0573,
      "Price": 6693.9
    }
  ]
}
```

### activecontracts `get /v1/activecontracts`

#### Response

```json
{
  "RC": 0,
  "message": "successful operation",
  "data": [
    {
      "Symbol": "BTC_USD",
      "Quantity": 0.0001,
      "Price": 0.01,
      "Index": null,
      "BaseCurrency": "BTC",
      "QuoteCurrency": "USD",
      "ContractType": 1,
      "MaxQuantity": 2000
    },
    {
      "Symbol": "BCH_USD",
      "Quantity": 0.0001,
      "Price": 0.01,
      "Index": null,
      "BaseCurrency": "BCH",
      "QuoteCurrency": "USD",
      "ContractType": 1,
      "MaxQuantity": 2000
    }
  ]
}
```
