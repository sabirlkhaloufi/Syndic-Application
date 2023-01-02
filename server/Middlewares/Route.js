const express = require('express')
const router = express.Router()

router.all("*",(req, res, next) => {
    throw new Error(`c'ant find this router ${req.originalUrl} `)
    next(err.message)
})

module.exports = router