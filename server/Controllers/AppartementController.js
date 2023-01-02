require("dotenv").config()
const Appartement = require("../Models/Appartement")
const asyncHandler = require('express-async-handler');


// method  : get
// url     : api/Appartement/getAll
// acces   : Puplic
const getAllAppartement = asyncHandler(async(req,res) => {
    Appartement.find({}, function(err, Appartement) {
        res.send(Appartement);  
    });
})


// method  : get
// url     : api/Appartement/getOne/:id
// acces   : Public
const getOneCertificat = asyncHandler(async(req,res) => {
    const {id} = req.params;
    try{
        const certificat =  await Appartement.findOne({ _id:id});
        res.send(certificat)
    } catch(error){
        res.status(400)
        throw new Error(error)
    }
})


// method  : post
// url     : api/Appartement/add
// acces   : private
const addCertificat = asyncHandler(async(req,res) => {
    
    const {title, image, ID, dateExperation, } = req.body
    if(!title || !image || !ID || !dateExperation){
        res.status(400)
        throw new Error('please add all fields')
    }else{
        try{
            const certificat =  await Appartement.create({
                title,
                image,
                ID,
                dateExperation
            });
            res.send({message:"add success"})
        } catch(error){
            res.status(400)
            throw new Error(error)
        }
    }
})


// method  : put
// url     : api/Appartement/update/:id
// acces   : private
const updateCertificat = asyncHandler(async(req,res) => {
    const {id} = req.params
    const {title, image, ID, dateExperation, } = req.body
    if(!title || !image || !ID || !dateExperation){
        res.status(400)
        throw new Error('please add all fields')
    }else{
        try{
            const certificat =  await Appartement.updateOne({_id:id},{
                title,
                image,
                ID,
                dateExperation
            });
            res.send({message:"updated success"})
        } catch(error){
            res.status(400)
            throw new Error(error)
        }
    }
})

// method  : delete
// url     : api/Appartement/delete/:id
// acces   : private
const deleteCertificat = asyncHandler(async(req,res) => {
    const {id} = req.params;
    try{
        const certificat =  await Appartement.findOneAndRemove({ _id:id});
        res.send({message:"deleted success"})
    } catch(error){
        res.status(400)
        throw new Error(error)
    }
})



module.exports = {getAllAppartement, updateCertificat, deleteCertificat, addCertificat, getOneCertificat}