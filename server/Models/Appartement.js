const mongoose = require("mongoose");

const Appartement = mongoose.Schema({
  Numero: {
    type: String,
    required: true,
  },
  CnClient: {
    type: String,
    required: true,
  },
  Isrented:{
    type: Boolean,
    require:true
  },
  Etage: {
    type: String,
    require: true
  }
},
{
  timestamps: true
});

module.exports = mongoose.model("appartements", Appartement);
