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
  Date: {
    type: Date,
    required: true,
  }},
{
  timestamps: true
});

module.exports = mongoose.model("Payments", ExperiencesShema);
