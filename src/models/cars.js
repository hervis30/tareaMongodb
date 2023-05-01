const mongoose = require('mongoose');
//import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CarSchema = Schema({
  platenumber: String,
  description: String,
  brand: String,
  status: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('cars', CarSchema);