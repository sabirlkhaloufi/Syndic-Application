const express = require('express')
const router = express.Router()
const {getAllCertificats, updateCertificat, deleteCertificat, addCertificat, getOneCertificat} = require('../Controllers/CertificatController')

router.get('/getAll',getAllCertificats)
router.get('/getOne/:id',getOneCertificat)
router.post('/add',addCertificat)
router.put('/update/:id',updateCertificat)
router.delete('/delete/:id',deleteCertificat)

module.exports = router