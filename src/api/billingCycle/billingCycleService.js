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

module.exports = billingCycle
