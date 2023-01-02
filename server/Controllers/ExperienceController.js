require("dotenv").config()
const Experiences = require("../Models/Experiences")
const asyncHandler = require('express-async-handler');


// method  : get
// url     : api/experiences/getAll
// acces   : Puplic
const getAllExperiences = asyncHandler(async(req,res) => {
    Experiences.find({}, function(err, Experience) {
        res.send(Experience);  
    });
})


// method  : get
// url     : api/experiences/getOne/:id
// acces   : Public
const getOneExperience = asyncHandler(async(req,res) => {
    const {id} = req.params;
    try{
        const experience =  await Experiences.findOne({ _id:id});
        res.send(experience)
    } catch(error){
        res.status(400)
        throw new Error(error)
    }
})


// method  : post
// url     : api/experiences/add
// acces   : private
const addExperience = asyncHandler(async(req,res) => {
    const {title, entreprise, firstYear, endYear, type } = req.body
    if(!title || !entreprise || !firstYear || !endYear || !type){
        res.status(400)
        throw new Error('please add all fields')
    }else{
        try{
            const experience =  await Experiences.create({
                title,
                entreprise,
                firstYear,
                endYear,
                type
            });
            res.send({message:"add success"})
        } catch(error){
            res.status(400)
            throw new Error(error)
        }
    }
})


// method  : put
// url     : api/experiences/update/:id
// acces   : private
const updateExperience = asyncHandler(async(req,res) => {
    const {id} = req.params
    const {title, entreprise, firstYear, endYear, type } = req.body
    if(!title || !entreprise || !firstYear || !endYear || !type){
        res.status(400)
        throw new Error('please add all fields')
    }else{
        try{
            const experience =  await Experiences.updateOne({_id:id},{
                title,
                entreprise,
                firstYear,
                endYear,
                type
            });
            res.send({message:"updated success"})
        } catch(error){
            res.status(400)
            throw new Error(error)
        }
    }
})

// method  : delete
// url     : api/experiences/delete/:id
// acces   : private
const deleteExperience = asyncHandler(async(req,res) => {
    const {id} = req.params;
    try{
        const experience =  await Experiences.findOneAndRemove({ _id:id});
        res.send({message:"deleted success"})
    } catch(error){
        res.status(400)
        throw new Error(error)
    }
})



module.exports = {getAllExperiences, updateExperience, deleteExperience, addExperience ,getOneExperience}