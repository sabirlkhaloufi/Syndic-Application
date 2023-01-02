require("dotenv").config()
const certificats = require("../Models/certificats")
const asyncHandler = require('express-async-handler');


// method  : get
// url     : api/Certificats/getAll
// acces   : Puplic
const getAllCertificats = asyncHandler(async(req,res) => {
    certificats.find({}, function(err, certificats) {
        res.send(certificats);  
    });
})


// method  : get
// url     : api/Certificats/getOne/:id
// acces   : Public
const getOneCertificat = asyncHandler(async(req,res) => {
    const {id} = req.params;
    try{
        const certificat =  await certificats.findOne({ _id:id});
        res.send(certificat)
    } catch(error){
        res.status(400)
        throw new Error(error)
    }
})


// method  : post
// url     : api/Certificats/add
// acces   : private
const addCertificat = asyncHandler(async(req,res) => {
    
    const {title, image, ID, dateExperation, } = req.body
    if(!title || !image || !ID || !dateExperation){
        res.status(400)
        throw new Error('please add all fields')
    }else{
        try{
            const certificat =  await certificats.create({
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
// url     : api/Certificats/update/:id
// acces   : private
const updateCertificat = asyncHandler(async(req,res) => {
    const {id} = req.params
    const {title, image, ID, dateExperation, } = req.body
    if(!title || !image || !ID || !dateExperation){
        res.status(400)
        throw new Error('please add all fields')
    }else{
        try{
            const certificat =  await certificats.updateOne({_id:id},{
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
// url     : api/Certificats/delete/:id
// acces   : private
const deleteCertificat = asyncHandler(async(req,res) => {
    const {id} = req.params;
    try{
        const certificat =  await certificats.findOneAndRemove({ _id:id});
        res.send({message:"deleted success"})
    } catch(error){
        res.status(400)
        throw new Error(error)
    }
})



module.exports = {getAllCertificats, updateCertificat, deleteCertificat, addCertificat, getOneCertificat}