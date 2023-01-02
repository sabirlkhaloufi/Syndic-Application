const express = require('express')
const router = express.Router()
const {getAllExperiences, updateExperience, deleteExperience, addExperience, getOneExperience} = require('../Controllers/PaymentController')

router.get('/getAll',getAllExperiences)
router.get('/getone/:id',getOneExperience)
router.post('/add',addExperience)
router.put('/update/:id',updateExperience)
router.delete('/delete/:id',deleteExperience)

module.exports = router