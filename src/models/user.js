const mongoose = require('mongoose');
//import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  name: String,
  password:String,
});

module.exports = mongoose.model('user', UserSchema);