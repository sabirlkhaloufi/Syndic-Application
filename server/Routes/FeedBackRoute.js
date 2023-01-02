const express = require('express')
const router = express.Router()
const {getAllFeedback, updateFeedBack, deleteFeedBack, addFeedBack, getOneFeedBack} = require('../Controllers/FeedbackController')

router.get('/getAll',getAllFeedback)
router.get('/getone/:id',getOneFeedBack)
router.post('/add',addFeedBack)
router.put('/update/:id',updateFeedBack)
router.delete('/delete/:id',deleteFeedBack)

module.exports = router