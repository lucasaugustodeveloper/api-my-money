const billingCycle = require('./billingCycle')
const errorHandle = require('../../common/errorHandle')

billingCycle.methods(['get', 'post', 'put', 'delete'])
billingCycle.updateOptions({ new: true, runValidators: true })
billingCycle
  .after('post', errorHandle)
  .after('put', errorHandle)

billingCycle.route('count', (req, res, next) => {
  billingCycle.count((error, value) => {
    if (error) {
      return res.status(500).json({ errors: [error] })
    }

    if (!error) {
      res.json({ value })
    }
  })
})

billingCycle.route('summary', (req, res, next) => {
  billingCycle.aggregate([{
    $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } }
  }, {
    $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" } }
  }, {
    $project: { _id: 0, credit: 1, debt: 1 }
  }]).exec((error, result) => {
    if (error) {
      return res.status(500).json({ errors: [error] })
    }

    res.json(result[0] || { credit: 0, debt: 0 })
  })
})

module.exports = billingCycle
