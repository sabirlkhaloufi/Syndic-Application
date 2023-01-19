const express = require('express')
const router = express.Router()
const {Login, Logout, verifyToken} = require('../Controllers/AuthController')

router.post('/login',Login)
router.get('/logout',Logout)
router.get('/verifyToken/:token', verifyToken)
module.exports = router