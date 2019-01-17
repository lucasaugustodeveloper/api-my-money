const billingCycle = require('./billingCycle')

billingCycle.methods(['get', 'post', 'put', 'delete'])
billingCycle.updateOptions({ new: true, runValidators: true })

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
