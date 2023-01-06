const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema
 
const Payment = mongoose.Schema({
  Prix: {
    type: String,
    required: true,
  },
  Apparetement: {
    type:ObjectId,
    ref:'Appartement',
    require: true
  },
  Date: {
    type: Date,
    required: true,
  }},
{
  timestamps: true
});

module.exports = mongoose.model("Payment", Payment);
