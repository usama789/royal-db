var mongoose = require('mongoose');
const Joi = require("joi");

var productSchema=mongoose.Schema({
    Name:String,
    ProductCode:String,
    Price:Number,
    Size:String,
    Availability:String,
    Quantity:Number
});
var Product = mongoose.model('product',productSchema);

function validateProduct(data){
    const schema = Joi.object({
        Name:Joi.string().min(3).max(10).required(),
        
        ProductCode:Joi.string().max(5).required(),
        Price:Joi.number().min(0).required(),
        Size:Joi.string().max(2).required(),
        Availability:Joi.string().max(20).required(),
        Quantity:Joi.number().max(50).required()

    });
    return schema.validate(data,{abortEarly:false});
}
module.exports.Product = Product;
module.exports.validate= validateProduct;