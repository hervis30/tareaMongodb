const mongoose = require('mongoose');
//import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CarSchema = Schema({
  platenumer: String,
  description: String,
  brand:String,
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('car', CarSchema);