const express = require('express')
const router = express.Router()
const {getAllFormations, updateFormation, deleteFormation, addFormation, getOneFromation} = require('../Controllers/FormationController')

router.get('/getAll',getAllFormations)
router.get('/getOne/:id',getOneFromation)
router.post('/add',addFormation)
router.put('/update/:id',updateFormation)
router.delete('/delete/:id',deleteFormation)

module.exports = router