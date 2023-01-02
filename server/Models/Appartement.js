const mongoose = require("mongoose");

const Appartement = mongoose.Schema({
  Numero: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  }
},
{
  timestamps: true
});

module.exports = mongoose.model("appartements", CertificatShema);
