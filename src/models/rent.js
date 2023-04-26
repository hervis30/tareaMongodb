const mongoose = require('mongoose');
//import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RentSchema = Schema({
  rentnumber: String,
  username: String,
  platenumber:String,
  deadline:String,
});

module.exports = mongoose.model('rent', RentSchema);