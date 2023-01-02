const mongoose = require("mongoose");

 
const Payment = mongoose.Schema({
  Prix: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  NumeroApparetement: {
    type:[mongoose.Schema.Types.ObjectId],
    ref:'appartements',
    require: true
  },
  Date: {
    type: Date,
    required: true,
  }},
{
  timestamps: true
});

module.exports = mongoose.model("Payments", Payment);
