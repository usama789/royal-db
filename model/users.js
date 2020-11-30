var mongoose = require('mongoose');
const Joi = require("joi");
var productSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String

   
});
var User = mongoose.model('User',productSchema);
module.exports = User;