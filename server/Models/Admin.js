const mongoose = require("mongoose");

/// model /user
const AdminShema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }},
  {
    timestamps: true
  });

module.exports = mongoose.model("admins", AdminShema);
