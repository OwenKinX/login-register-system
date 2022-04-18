const express = require('express')
const router = express.Router()

const customer = require('./customer')
const profile = require('./profile')

router.use('/customer', customer)
router.get('/profile', profile)

module.exports = router