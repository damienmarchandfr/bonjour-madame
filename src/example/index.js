const BM = require('../../dist')
const moment = require('moment')
const client = new BM.BonjourMadameClient()

client.get(false)
  .then(m => {
    console.log(m)
    return client.getAtDate(moment().subtract(3, 'day').toDate())
  })
  .then((m) => {
    console.log(m)
  })
  .catch(err => {
    console.error(err)
  })
