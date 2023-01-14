require("dotenv").config()
const Payment = require("../Models/Payment")
const ApparetementModel = require("../Models/Appartement")
const asyncHandler = require('express-async-handler');
const generatePdf = require('../Utils/generatePdf')



// method  : get
// url     : api/Payment/getAll
// acces   : Puplic
const getAllPayment = asyncHandler(async(req,res) => {
    const payment  = await Payment.find({}).populate({path:'Apparetement',select:'Numero -_id'});
    res.send(payment);  

})


// method  : get
// url     : api/Payment/getOne/:id
// acces   : Public
const getOnePayment = asyncHandler(async(req,res) => {
    const {id} = req.params;
    try{
        const payment =  await Payment.findOne({ _id:id});
        res.send(payment)
    } catch(error){
        res.status(400)
        throw new Error(error)
    }
})


// method  : post
// url     : api/Payment/add
// acces   : private
const addPayment = asyncHandler(async(req,res) => {
    const {Apparetement, Prix, Date} = req.body
    if(!Apparetement || !Prix || !Date){

        res.status(400)
        throw new Error('please add all fields')
    }else{
        try{
            let payment =  await Payment.create({
                Apparetement,
                Prix,
                Date
            });

            const NumeroAppartement = await ApparetementModel.findOne({ _id:payment.Apparetement})
            payment.Apparetement = NumeroAppartement;
            console.log(payment);
            generatePdf(payment,res);
            res.send(payment)

        } catch(error){
            res.status(400)
            throw new Error(error)
        }
    }
})


// method  : put
// url     : api/Payment/update/:id
// acces   : private
const updatePayment = asyncHandler(async(req,res) => {
    const {id} = req.params
    const {Apparetement, Prix, Date} = req.body
    if(!Apparetement || !Prix || !Date){
        res.status(400)
        throw new Error('please add all fields')
    }else{
        try{
            const payment =  await Payment.updateOne({_id:id},{
                Apparetement,
                Prix,
                Date
            });
            res.send({message:"updated success"})
        } catch(error){
            res.status(400)
            throw new Error(error)
        }
    }
})

// method  : delete
// url     : api/Payment/delete/:id
// acces   : private
const deletePayment = asyncHandler(async(req,res) => {
    const {id} = req.params;
    try{
        const payment =  await Payment.findOneAndRemove({ _id:id});
        res.send({message:"deleted success"})
    } catch(error){
        res.status(400)
        throw new Error(error)
    }
})



// method  : delete
// url     : api/Payment/getpdf/:id
// acces   : private
const getPdf = (req, res)=>{
    const {id} = req.params
    console.log(id);
    // console.log(`${__dirname}/uploads/result.pdf`);
    res.download(`${__dirname}/pdf/facture${id}.pdf`)
    // res.sendFile("uploads/result.pdf");
    // res.sendFile(`/uploads/facture${id}.pdf`)
}


module.exports = {getAllPayment, getOnePayment, addPayment, updatePayment, deletePayment, getPdf}