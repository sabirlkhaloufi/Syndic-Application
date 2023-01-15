const express = require('express')
const router = express.Router()
const {getAllPayment, getOnePayment, addPayment,CountPayment, updatePayment, deletePayment, getPdf} = require('../Controllers/PaymentController')

router.get('/getAll',getAllPayment)
router.get('/getone/:id',getOnePayment)
router.post('/add',addPayment)
router.put('/update/:id',updatePayment)
router.delete('/delete/:id',deletePayment)

router.get("/getPdf/:id",getPdf)
router.get("/count",CountPayment)

module.exports = router