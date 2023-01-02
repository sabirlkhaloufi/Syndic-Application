const express = require('express')
const router = express.Router()
const {Login, Logout} = require('../Controllers/AuthController')

router.post('/login',Login)
router.get('/logout',Logout)

module.exports = router