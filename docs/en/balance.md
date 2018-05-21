## Account Balance Calculation

If you send the request [getaccountinfo](./README.md#getaccountinfo), you will get responses as below:

Please refer to [accountbalance](./engine.md#_2-6-accountbalance) for the meaning of the fields.

```json
{
  "AccountInfo": {
    "RP": "Speculation",
    "G": "dt",
    "BL": [
      {
        "CR": "BCH",
        "SOD": 0.0,
        "C": 1000.0
      },
      {
        "CR": "BTC",
        "SOD": 0.0,
        "C": 999.9933
      },
      {
        "CR": "ETC",
        "SOD": 0.0,
        "C": 1000.0
      },
      {
        "CR": "ETH",
        "SOD": 0.0,
        "C": 1000.0
      },
      {
        "CR": "USD",
        "SOD": 0.0,
        "C": 1000066.471996
      },
      {
        "CR": "MONA",
        "SOD": 0.0,
        "C": 0.0
      }
    ],
    "CDL": [
      {
        "S": "ETH_USD",
        "TSS": 0.0,
        "TBS": 0.0,
        "OS": 0.0,
        "AP": 0.0,
        "P": 0.0,
        "MV": 0.0,
        "IMF": 1.0,
        "LP": 0.0,
        "BIMR": 0.0,
        "QIMR": 0.0,
        "LKP": 0.0
      },
      {
        "S": "BCH_BTC",
        "TSS": 0.0,
        "TBS": 0.0,
        "OS": 0.0,
        "AP": 0.0,
        "P": 0.0,
        "MV": 0.0,
        "IMF": 1.0,
        "LP": 0.0,
        "BIMR": 0.0,
        "QIMR": 0.0,
        "LKP": 0.0
      },
      {
        "S": "BCH_USD",
        "TSS": 0.0,
        "TBS": 0.0,
        "OS": 0.0,
        "AP": 0.0,
        "P": 0.0,
        "MV": 0.0,
        "IMF": 1.0,
        "LP": 0.0,
        "BIMR": 0.0,
        "QIMR": 0.0,
        "LKP": 0.0
      },
      {
        "S": "ETC_BTC",
        "TSS": 0.0,
        "TBS": 0.0,
        "OS": 0.0,
        "AP": 0.0,
        "P": 0.0,
        "MV": 0.0,
        "IMF": 1.0,
        "LP": 0.0,
        "BIMR": 0.0,
        "QIMR": 0.0,
        "LKP": 0.0
      },
      {
        "S": "ETC_USD",
        "TSS": 0.0,
        "TBS": 0.0,
        "OS": 0.0,
        "AP": 0.0,
        "P": 0.0,
        "MV": 0.0,
        "IMF": 1.0,
        "LP": 0.0,
        "BIMR": 0.0,
        "QIMR": 0.0,
        "LKP": 0.0
      },
      {
        "S": "ETH_BTC",
        "TSS": 0.0,
        "TBS": 0.0,
        "OS": 0.0,
        "AP": 0.0,
        "P": 0.0,
        "MV": 0.0,
        "IMF": 1.0,
        "LP": 0.0,
        "BIMR": 0.0,
        "QIMR": 0.0,
        "LKP": 0.0
      },
      {
        "S": "BTC_USD",
        "TSS": 0.0,
        "TBS": 0.0036,
        "OS": 0.0,
        "AP": 0.0,
        "P": 0.0,
        "MV": 0.0,
        "IMF": 1.0,
        "LP": 0.0,
        "BIMR": 0.0,
        "QIMR": 0.02574,
        "LKP": 0.0
      },
      {
        "S": "LTC_USD",
        "TSS": 0.0,
        "TBS": 0.0,
        "OS": 0.0,
        "AP": 0.0,
        "P": 0.0,
        "MV": 0.0,
        "IMF": 1.0,
        "LP": 0.0,
        "BIMR": 0.0,
        "QIMR": 0.0,
        "LKP": 0.0
      },
      {
        "S": "DASH_USD",
        "TSS": 0.0,
        "TBS": 0.0,
        "OS": 0.0,
        "AP": 0.0,
        "P": 0.0,
        "MV": 0.0,
        "IMF": 1.0,
        "LP": 0.0,
        "BIMR": 0.0,
        "QIMR": 0.0,
        "LKP": 0.0
      },
      {
        "S": "MONA_USD",
        "TSS": 0.0,
        "TBS": 0.0,
        "OS": 0.0,
        "AP": 0.0,
        "P": 0.0,
        "MV": 0.0,
        "IMF": 1.0,
        "LP": 0.0,
        "BIMR": 0.0,
        "QIMR": 0.0,
        "LKP": 0.0
      }
    ],
    "IsLocked": false,
    "Account": "275d51ea9ba74291b2bdcc7400e17a22",
    "MsgType": "AccountInfo"
  },
  "RC": 0,
  "CRID": "e3206a45-fa5d-4944-90a1-896c966e5822",
  "Reason": "OK",
  "MsgType": "GetAccountInfoResponse"
}
```

### Account Balance Calculation Method

```js
// accuracy calculation for floating number
const Big = require('big.js')

// Calculate frozen balance
const sumFrozen = (cdl, coin) => {
  let sum = new Big('0')
  cdl.forEach(c => {
    // split symbol
    const tmp = c.S.split('_')
    if (tmp.length !== 2) {
      // invalid symbol
      return
    }
    if (tmp[0] === coin) {
      // + BIMR
      sum = sum.plus(c.BIMR)
      return
    }
    if (tmp[1] === coin) {
      // + QIMR
      sum = sum.plus(c.QIMR)
      return
    }
  })
  return sum.toString()
}

const getBalanceFromInfoObject = info => {
  const obj = {}
  info.BL.forEach(bl => {
    const frozen = sumFrozen(info.CDL, bl.CR)
    obj[bl.CR] = {
      total: bl.C,
      frozen,
      avail: new Big(bl.C).minus(frozen).toString() // avail = total - frozen
    }
  })
  return obj
}

console.log(getBalanceFromInfoObject(info.AccountInfo))

/*
{ BCH: { total: 1000, frozen: '0', avail: '1000' },
  BTC: { total: 999.9933, frozen: '0', avail: '999.9933' },
  ETC: { total: 1000, frozen: '0', avail: '1000' },
  ETH: { total: 1000, frozen: '0', avail: '1000' },
  USD:
   { total: 1000066.471996,
     frozen: '0.02574',
     avail: '1000066.446256' },
  MONA: { total: 0, frozen: '0', avail: '0' } }
*/
```
