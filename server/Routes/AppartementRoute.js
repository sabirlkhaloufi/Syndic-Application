const express = require('express')
const { get } = require('../app')
const router = express.Router()
const {getAllAppartement, updateAppartement, deleteAppartement, addAppartement, getOneAppartement} = require('../Controllers/AppartementController')

router.get('/getAll',getAllAppartement)
router.get('/getOne/:id',getOneAppartement)
router.post('/add',addAppartement)
router.put('/update/:id',updateAppartement)
router.delete('/delete/:id',deleteAppartement)

module.exports = router