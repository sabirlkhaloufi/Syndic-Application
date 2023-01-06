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
  NameClient: {
    type: String,
    required: true,
  },
  // Isrented:{
  //   type: Boolean,
  //   require:true
  // },
  Etage: {
    type: Number,
    require: true
  }
},
{
  timestamps: true
});

module.exports = mongoose.model("Appartement", Appartement);
