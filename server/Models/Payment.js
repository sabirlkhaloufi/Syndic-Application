const mongoose = require("mongoose");

 
const Payment = mongoose.Schema({
  Prix: {
    type: String,
    required: true,
  },
  Apparetement: {
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
