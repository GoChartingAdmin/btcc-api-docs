# Engine Response API

_注意:_ 所有响应 `RC` 类型为 `Number`

The WebSocket API in this trading engine will replace the original sisyphus project.

## Table of Contents

* [Public Api](#public-api)

  * [0. Heartbeat](#0-heartbeat)

  * [1. Get active contracts](#1-get-active-contracts)

    * [GetActiveContractsResponse](#getactivecontractsresponse)

  * [2. Quote](#2-quote)

    * [QuoteResponse](#quoteresponse)

  * [3. Login: AccountInfo, ExecReport](#3-login-accountinfo-execreport)

    * [LoginResponse](#loginresponse)
    * [AccountInfo](#accountinfo)
    * [ExecReport](#execreport)

  * [4. Logout](#4-logout)

    * [LogoutResponse](#logoutresponse)

  * [5. Place order](#5-place-order)

    * [PlaceOrderResponse](#placeorderresponse)

  * [6. Cancel all orders](#6-cancel-all-orders)

    * [CancelAllOrdersResponse](#cancelallordersresponse)

  * [7. Cancel order](#7-cancel-order)

    * [CancelOrderResponse](#cancelorderresponse)

  * [8. Cancel replace order](#8-cancel-replace-order)

    * [CancelReplaceOrderResponse](#cancelreplaceorderresponse)

  * [8. Get account info](#8-get-account-info)

    * [GetAccountInfoResponse](#getaccountinforesponse)

  * [9. Get orders](#9-get-orders)

    * [GetOrdersResponse](#getordersresponse)

  * [10. Get trades](#10-get-trades)

    * [GetTradesResponse](#gettradesresponse)

  * [Appendix 0: Result Codes](#appendix-0-result-codes)

    * [0.1 Exchange-Engine Result Codes](#01-exchange-engine-result-codes)

  * [Appendix 1: Types](#appendix-1-types)

    * [1.1 OrdStatus](#11-ordstatus)
    * [1.2 OrdRejReason](#12-ordrejreason)
    * [1.3 CxlRejReason](#13-cxlrejreason)
    * [1.4 Order Side](#14-order-side)
    * [1.5 Order Type](#15-order-type)

  * [Appendix 2: Components](#appendix-2-components)

    * [2.1 ActiveContract](#21-activecontract)
    * [2.2 Ticker](#22-ticker)
    * [2.3 OrderBook](#23-orderbook)
    * [2.4 OrderBook Entry](#24-orderbook-entry)
    * [2.5 PremiumAdjustment](#25-premiumadjustment)
    * [2.6 AccountBalance](#26-accountbalance)
    * [2.7 ContractDetail](#27-contractdetail)
    * [2.8 ExecutionDetail](#28-executiondetail)
    * [2.9 ExecTradeFeeLog](#29-exectradefeelog)

## Public Api

### 0. Heartbeat

`{"MsgType":"Heartbeat"}` 5 seconds interval to keep WebSocket session alive.

### 1. Get active contracts

#### GetActiveContractsResponse

| Field     | Value/Explanation                                                          |
| --------- | -------------------------------------------------------------------------- |
| MsgType   | GetActiveContractsResponse                                                 |
| CRID      | an unique ID from client to identify requests and responses                |
| RC        | 0 means success, non-zero indicates failure                                |
| Reason    | result information                                                         |
| Contracts | object contains information of currently trading symbols, see Appendix 2.2 |

### 2. Quote

#### QuoteResponse

| Field             | Value/Explanation                                                          |
| ----------------- | -------------------------------------------------------------------------- |
| MsgType           | QuoteResponse                                                              |
| CRID              | an unique ID from client to identify requests and responses                |
| RC                | 0 means success, non-zero indicates failure                                |
| Reason            | result information                                                         |
| Ticker            | market OHCL ticker data object, see Appendix 2.2                           |
| OrderBook         | orderbook object for current order book, see Appendix 2.3                  |
| PremiumAdjustment | object holding information about price PremiumAdjustment, see Appendix 2.5 |

### 3. Login: AccountInfo, ExecReport

#### LoginResponse

| Field   | Value/Explanation                                           |
| ------- | ----------------------------------------------------------- |
| MsgType | LoginResponse                                               |
| CRID    | an unique ID from client to identify requests and responses |
| RC      | 0 means success, non-zero indicates failure                 |
| Reason  | result information                                          |
| Account | account ID                                                  |

#### AccountInfo

| Field   | Value/Explanation                    |
| ------- | ------------------------------------ |
| MsgType | AccountInfo                          |
| Account | account ID                           |
| RP      | RiskProfile                          |
| G       | Group                                |
| BL      | BalanceList, see Appendix 2.6        |
| CDL     | ContractDetailList, see Appendix 2.7 |

#### ExecReport

| Field                | Value/Explanation                                  |
| -------------------- | -------------------------------------------------- |
| MsgType              | ExecReport                                         |
| Account              | account ID                                         |
| Timestamp            |                                                    |
| CRID                 | ClientRequestID                                    |
| OID                  | OrderID                                            |
| Symbol               |                                                    |
| Side                 |                                                    |
| OrderType            |                                                    |
| LastQty              |                                                    |
| CumQty               | Quantity that has been already executed            |
| LeaveQty             | Quantity that pending to be executed               |
| Price                |                                                    |
| StopPrice            |                                                    |
| Status               |                                                    |
| Text                 |                                                    |
| TimeInForce          |                                                    |
| ExprDate             | expiration date if TimeInForce is 'good till date' |
| ExprTime             | expiration time if TimeInForce is 'good till date' |
| SettlementQty        | Quantity has been executed at current execution    |
| AveragePrice         |                                                    |
| ExecutionDetails     | see Appendix 2.8                                   |
| Created              | Created timestamp                                  |
| FeeExchange          |                                                    |
| FeeExchangeOvernight |                                                    |
| TradeFeeLogs         | see Appendix 2.9                                   |
| IsLiquidation        |                                                    |
| IsEarlyProfit        |                                                    |
| IsDelivery           |                                                    |

### 4. Logout

#### LogoutResponse

| Field   | Value/Explanation                                           |
| ------- | ----------------------------------------------------------- |
| MsgType | LoginResponse                                               |
| CRID    | an unique ID from client to identify requests and responses |
| RC      | 0 means success, non-zero indicates failure                 |
| Reason  | result information                                          |
| Account | account ID                                                  |

### 5. Place order

#### PlaceOrderResponse

| Field        | Value/Explanation                                           |
| ------------ | ----------------------------------------------------------- |
| MsgType      | PlaceOrderResponse                                          |
| CRID         | an unique ID from client to identify requests and responses |
| RC           | 0 means success, non-zero indicates failure                 |
| Reason       | result information                                          |
| OID          | order ID                                                    |
| Text         | text to explain OrdRejReason                                |
| OrdRejReason | order reject reason                                         |

### 6. Cancel all orders

#### CancelAllOrdersResponse

| Field             | Value/Explanation                                           |
| ----------------- | ----------------------------------------------------------- |
| MsgType           | CancelAllOrdersResponse                                     |
| CRID              | an unique ID from client to identify requests and responses |
| RC                | 0 means success, non-zero indicates failure                 |
| Reason            | result information                                          |
| CancelledOrdersId | list of cancelled order IDs                                 |

### 7. Cancel order

#### CancelOrderResponse

| Field        | Value/Explanation                                           |
| ------------ | ----------------------------------------------------------- |
| MsgType      | CancelOrderResponse                                         |
| CRID         | an unique ID from client to identify requests and responses |
| RC           | 0 means success, non-zero indicates failure                 |
| Reason       | result information                                          |
| OID          | order Id                                                    |
| OrdStatus    | order status                                                |
| CxlRejReason | cancel reject reason                                        |

### 8. Cancel replace order

#### CancelReplaceOrderResponse

| Field        | Value/Explanation                                           |
| ------------ | ----------------------------------------------------------- |
| MsgType      | CancelReplaceOrderResponse                                  |
| CRID         | an unique ID from client to identify requests and responses |
| RC           | 0 means success, non-zero indicates failure                 |
| Reason       | result information                                          |
| OID          | previous order Id                                           |
| OrdStatus    | order status                                                |
| CxlRejReason | cancel reject reason                                        |

### 8. Get account info

#### GetAccountInfoResponse

| Field       | Value/Explanation                                           |
| ----------- | ----------------------------------------------------------- |
| MsgType     | CancelReplaceOrderResponse                                  |
| CRID        | an unique ID from client to identify requests and responses |
| RC          | 0 means success, non-zero indicates failure                 |
| Reason      | result information                                          |
| AccountInfo | object contains account information                         |

### 9. Get orders

#### GetOrdersResponse

| Field        | Value/Explanation                                                     |
| ------------ | --------------------------------------------------------------------- |
| MsgType      | RetrieveOrderResponse                                                 |
| CRID         | an unique ID from client to identify requests and responses           |
| RC           | 0 means success, non-zero indicates failure                           |
| Reason       | result information                                                    |
| Reports      | information object related to the order that you specified in request |
| OrdRejReason | order reject reason                                                   |

### 10. Get trades

#### GetTradesResponse

| Field   | Value/Explanation                                           |
| ------- | ----------------------------------------------------------- |
| MsgType | GetTradesResponse                                           |
| CRID    | an unique ID from client to identify requests and responses |
| RC      | 0 means success, non-zero indicates failure                 |
| Reason  | result information                                          |
| Trades  | object for records of trades                                |

### Appendix 0: Result Codes

#### 0.1 Exchange-Engine Result Codes

_注意:_ 所有响应 `RC` 类型为 `Number`

| Constant                           | Value | Description                                            |
| ---------------------------------- | ----- | ------------------------------------------------------ |
| RC_DATA_EMPTY                      | -1    | data is empty                                          |
| RC_OPR_SUCCESSED                   | 0     | successful operation                                   |
| RC_OPR_FAILED                      | 1     | operate failed                                         |
| RC_USER_AUTHEN_FAILED              | 2     | user authen failed                                     |
| RC_USER_ALREADY_EXIST              | 3     | user is already exist                                  |
| RC_CONNECTION_SECURITY_FAILED      | 4     | connection security is failed                          |
| RC_INVALID_WITHDARWAL_EFF_MARGIN   | 11    | invalid withdarwal exceed eff margin                   |
| RC_TRANSACTION_ID_IS_NOT_UNIQUE    | 12    | transaction id is not unique                           |
| RC_SYSTEM_FAILED                   | 99    | an exception of system                                 |
| RC_UNKNOWN_SYMBOL                  | 2001  | unknown symbol                                         |
| RC_EXCHANGE_CLOSED                 | 2002  | Market is closed                                       |
| RC_ORDER_EXCEEDS_LIMIT             | 2003  | order exceeds limit                                    |
| RC_UNKNOWN_ORDER                   | 2005  | unknown order                                          |
| RC_DUPLICATE_ORDER                 | 2006  | duplicate order                                        |
| RC_INVALID_INVESTOR_ID             | 2010  | invalid investor                                       |
| RC_INCORRECT_QUANTITY              | 2013  | incorrect quantity                                     |
| RC_UNKNOWN_ACCOUNT                 | 2015  | unknown account                                        |
| RC_PRICE_EXCEED_CURRENT_PRICE_BAND | 2016  | price excceeds current price band                      |
| RC_OTHER                           | 2099  | other status                                           |
| RC_ORDER_CANCEL_EXECUTE_SELF_ORDER | 2100  | order is cancelled, because it will execute self order |
| RC_CLORDID_CANNOT_EMPTY            | 2101  | order id can't be empty                                |
| RC_INCORRECT_ORDER_SIDE            | 2102  | order side is incorrect                                |
| RC_INCORRECT_ORDER_TYPE            | 2103  | order type is incorrect                                |
| RC_INCORRECT_POSITION_EFFECT       | 2104  | position effect is incorrect                           |
| RC_INCORRECT_PRICE                 | 2105  | price is incorrect                                     |
| RC_INCORRECT_SECURITY_TYPE         | 2106  | security type is incorrect                             |
| RC_INCORRECT_PRICE_DIGITS          | 2107  | price digits is incorrect                              |
| RC_ACCOUNT_IS_LIQUIDATING          | 2108  | account is liquidating                                 |
| RC_POSITION_EXCEEDS_LIMIT          | 2109  | position exceeds limit                                 |
| RC_MARGIN_INSUFFICIENT             | 2110  | margin is insufficient                                 |
| RC_CLORDID_DUPLICATED_WITH_TODAY   | 2111  | orderID is duplicated With in today                    |
| RC_ORDER_COUNT_ISZERO              | 2112  | order count is zero                                    |
| RC_INCORRECT_TIME_INFORCE          | 2113  | time in force is incorrect                             |
| RC_BEGIN_CANNOT_GREATER_THAN_END   | 2114  | begin can not be greater than the end                  |
| RC_INCORRECT_OLDQUANTITY           | 2115  | old quanity is incorrect                               |
| RC_TOO_LATE_TO_CANCEL              | 3000  | too late to cancel                                     |
| RC_ORDER_ALREADY_PENDING_STATUS    | 3001  | order already in pending status                        |
| RC_ORDER_DOES_NOT_BELONG_TO_USER   | 3100  | order does not belong to user                          |
| RC_FAILTO_CANCEL_ORDER_MANAGER     | 3101  | fail to cancel in order manager                        |
| RC_MARKET_ORDER_CANNOT_CANCELLED   | 3102  | market order can't be cancelled                        |
| RC_MARKET_ORDER_CANNOT_REPLACED    | 3103  | market order can't be replaced                         |
| RC_LINKED_ORDER_ISNOT_SUPPORTED    | 3104  | linked order is not supported                          |
| RC_INVALID_ACCOUNT                 | 3410  | invalid account                                        |
| RC_INVALID_TYPE                    | 3411  | invalid type                                           |
| RC_INVALID_FORK                    | 3412  | invalid fork                                           |
| RC_INVALID_AMOUNT                  | 3413  | invalid amount                                         |
| RC_NOT_ENOUGH_FUNDS                | 3414  | not enough funds                                       |
| RC_TOO_MANY_ACTIVE_QUOTES          | 4001  | too many active quotes                                 |
| RC_ACTIVE_QUOTE_STANDS             | 4002  | active quote stands                                    |
| RC_NO_ACTIVE_QUOTE                 | 4003  | no actvie quote                                        |

### Appendix 1: Types

#### 1.1 OrdStatus

| Value              | Code | Source |
| ------------------ | ---- | ------ |
| New                | '0'  | FIX    |
| PartiallyFilled    | '1'  | FIX    |
| Filled             | '2'  | FIX    |
| DoneForDay         | '3'  | FIX    |
| Canceled           | '4'  | FIX    |
| PendingCancel      | '6'  | FIX    |
| Stopped            | '7'  | FIX    |
| Rejected           | '8'  | FIX    |
| Suspended          | '9'  | FIX    |
| PendingNew         | 'A'  | FIX    |
| Calculated         | 'B'  | FIX    |
| Expired            | 'C'  | FIX    |
| AcceptedForBidding | 'D'  | FIX    |
| PendingReplace     | 'E'  | FIX    |
| DoneForOvernight   | 'F'  |        |
| CancelledBySystem  | 'G'  |        |
| DoneBySystem       | 'S'  |        |

#### 1.2 OrdRejReason

| Value                                       | Code | Source |
| ------------------------------------------- | ---- | ------ |
| UnknownSymbol                               | 1    | FIX    |
| ExchangeClosed                              | 2    | FIX    |
| OrderExcceedsLimit                          | 3    | FIX    |
| UnknownOrder                                | 5    | FIX    |
| InvalidInvestorID                           | 10   | FIX    |
| IncorrectQuantity                           | 13   | FIX    |
| UnknownAccount                              | 15   | FIX    |
| Other                                       | 99   | FIX    |
| PriceExcceedsCurrentPriceBand               | 16   |        |
| OrderCancelledBecauseItWillExecuteSelfOrder | 100  |        |
| ClOrdIDCannotBeEmpty                        | 101  |        |
| IncorrectOrderSide                          | 102  |        |
| IncorrectOrderType                          | 103  |        |
| IncorrectPositionEffect                     | 104  |        |
| IncorrectPrice                              | 105  |        |
| IncorrectSecurityType                       | 106  |        |
| IncorrectPriceDigits                        | 107  |        |
| AccountIsLiquidating                        | 108  |        |
| PositionExcceedsLimit                       | 109  |        |
| MarginInsufficient                          | 110  |        |
| ClOrdIDIsDuplicatedWithInToday              | 111  |        |
| EMPTY                                       | -1   |        |
| NOT_REJECT                                  | 0    |        |

#### 1.3 CxlRejReason

| Value                        | Code | Source |
| ---------------------------- | ---- | ------ |
| TooLateToCancel              | 0    | FIX    |
| UnknownOrder                 | 1    | FIX    |
| OrderAlreadyInPendingStatus  | 3    | FIX    |
| DuplicateOrder               | 6    | FIX    |
| Other                        | 99   | FIX    |
| PriceExceedsCurrentPriceBand | 8    |        |
| OrderDoesNotBelongToUser     | 100  |        |
| FailToCancelInOrderManager   | 101  |        |
| MarketOrderCannotBeCancelled | 102  |        |
| IncorrectOrderType           | 103  |        |
| IncorrectQuantity            | 104  |        |
| IncorrectPrice               | 105  |        |
| MarginInsufficient           | 110  |        |
| LinkedOrderIsNotSupported    | 111  |        |
| IncorrectOldQuantity         | 120  |        |
| Empty                        | -1   |        |

#### 1.4 Order Side

| Value | Code |
| ----- | ---- |
| BUY   | '1'  |
| SELL  | '2'  |

#### 1.5 Order Type

| Value  | Code |
| ------ | ---- |
| MARKET | '1'  |
| LIMIT  | '2'  |
| STOP   | '3'  |

### Appendix 2: Components

#### 2.1 ActiveContract

| Field    | Value/Explanation                                   |
| -------- | --------------------------------------------------- |
| Symbol   | contract symbol, e.g. BTCUSD                        |
| Index    | index symbol, eg. BPIUSD, BPI = Bitcoin Price Index |
| Quantity | the minimum quantity, eg. 0.0001                    |
| Price    | the minimum price, eg. 0.01                         |

#### 2.2 Ticker

| Field              | Value/Explanation    |
| ------------------ | -------------------- |
| Symbol             |                      |
| BidPrice           |                      |
| AskPrice           |                      |
| Open               |                      |
| High               |                      |
| Low                |                      |
| Last               |                      |
| LastQuantity       |                      |
| PrevCls            | previous close price |
| Volume             |                      |
| Volume24H          |                      |
| Timestamp          |                      |
| ExecutionLimitDown |                      |
| ExecutionLimitUp   |                      |

#### 2.3 OrderBook

| Field     | Value/Explanation |
| --------- | ----------------- |
| Timestamp |                   |
| Symbol    |                   |
| Version   |                   |
| Type      |                   |
| List      | see Appendix 2.4  |

#### 2.4 OrderBook Entry

| Field | Value/Explanation |
| ----- | ----------------- |
| Side  |                   |
| Size  |                   |
| Price |                   |

#### 2.5 PremiumAdjustment

| Field | Value/Explanation               |
| ----- | ------------------------------- |
| PBM   | PriceBandMidpoint               |
| APP   | AveragePricePremium             |
| LCCR  | LongCarryingChargeRete          |
| SCCR  | ShortCarryingChargeRate         |
| CCF   | CarryingChargeFrequency         |
| ELCCR | ExpectedLongCarryingChargeRate  |
| ESCCR | ExpectedShortCarryingChargeRate |
| ECCF  | ExpectedCarryingChargeFrequency |

#### 2.6 AccountBalance

| Field | Value/Explanation |
| ----- | ----------------- |
| CR    | Currency          |
| SOD   | TransferTotal     |
| C     | Cash              |

#### 2.7 ContractDetail

| Field | Value/Explanation          |
| ----- | -------------------------- |
| S     | Symbol                     |
| TSS   | TotalSellSize              |
| TBS   | TotalBuySize               |
| OS    | OpenSize                   |
| AP    | AveragePrice               |
| P     | Profit                     |
| MV    | MarketValue                |
| IMF   | InitialMarginFactor        |
| LP    | LiquidationPrice           |
| BIMR  | BaseInitialMarginRequired  |
| QIMR  | QuoteInitialMarginRequired |

#### 2.8 ExecutionDetail

| Field          | Value/Explanation |
| -------------- | ----------------- |
| Index          |                   |
| Timestamp      |                   |
| Price          |                   |
| TotalQuantity  |                   |
| OpenedQuantity |                   |
| ClosedQuantity |                   |

#### 2.9 ExecTradeFeeLog

| Field | Value/Explanation |
| ----- | ----------------- |
| A     | Account           |
| C     | Created timestamp |
| FTP   | FeeType           |
| FST   | FeeSubType        |
| Q     | Quantity          |
| FT    | FeeTotal          |
