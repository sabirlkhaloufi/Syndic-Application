const express = require('express')
const { get } = require('../app')
const router = express.Router()
const {getAllAppartement, updateAppartement, CountAppartement, deleteAppartement, addAppartement, getOneAppartement} = require('../Controllers/AppartementController')

router.get('/getAll',getAllAppartement)
router.get('/getOne/:id',getOneAppartement)
router.post('/add',addAppartement)
router.put('/update/:id',updateAppartement)
router.delete('/delete/:id',deleteAppartement)
router.get('/count',CountAppartement)

module.exports = router