const mongoose = require('mongoose');
//import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RentSchema = Schema({
  rentnumber: Number,
  username: String,
  platenumber: String,
  rentdate: Date,
});

module.exports = mongoose.model('rents', RentSchema);