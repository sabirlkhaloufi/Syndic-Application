const express = require('express')
const router = express.Router()
const {getAllProjects, getOneProject, updateProject, deleteProject, addProject} = require('../Controllers/ProjectsController')
const {upload} = require('../Utils/fileUpload');


router.get('/getAll',getAllProjects)
router.post('/add',upload.array('files'),addProject)
router.put('/update/:id',updateProject)
router.delete('/delete/:id',deleteProject)
router.get('/getOne/:id',getOneProject)

module.exports = router