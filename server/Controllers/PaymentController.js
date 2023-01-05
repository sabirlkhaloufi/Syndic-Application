require("dotenv").config()
const Payment = require("../Models/Payment")
const asyncHandler = require('express-async-handler');
const generatePdf = require('../Utils/generatePdf')



// method  : get
// url     : api/Payment/getAll
// acces   : Puplic
const getAllPayment = asyncHandler(async(req,res) => {
    const payment  = await Payment.find()
    res.send(payment);  


    // userCollection.aggregate([{
    //     $group: resources
    // }, {
    //     $lookup: {
    //         from: "Comments", // collection to join
    //         localField: "_id",//field from the input documents
    //         foreignField: "user_id",//field from the documents of the "from" collection
    //         as: "comments"// output array field
    //     }
    // }, {
    //     $lookup: {
    //         from: "Post", // from collection name
    //         localField: "_id",
    //         foreignField: "user_id",
    //         as: "posts"
    //     }
    // }],function (error, data) {
    //  return res.json(data);
 //handle error case also
// });

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
            const payment =  await Payment.create({
                Apparetement,
                Prix,
                Date
            });
            
            // generatePdf(payment,res);

            console.log(Date);
            res.send({message:"add success"})
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


const getPdf = (req, res)=>{
    const {id} = req.params
    res.download("uploads/result.pdf")
    // res.sendFile("uploads/result.pdf");
    // res.sendFile(`/uploads/facture${id}.pdf`)
}


module.exports = {getAllPayment, getOnePayment, addPayment, updatePayment, deletePayment, getPdf}