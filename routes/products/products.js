var express = require('express');
var router = express.Router();
const {Product } = require('../../model/model');
var validateProduct=require('../../middlewares/validateProduct');
var checkSessionAuth = require("../../middlewares/checkSessionAuth");

//showing product on the page
router.get('/',async function(req,res){
    var products = await Product.find();
    console.log(products);
    res.render("list",{products});
});
//check session
router.get('/add',checkSessionAuth, async function (req, res, next) {
    res.render("products/add");
  }); 
//show products list
router.get('/add',function(req,res){
    res.render("products/add");
});
//storing products using form
router.post('/add',validateProduct, async function(req,res){
    
    let product = new Product(req.body);
    await product.save();
    return res.redirect('/products');
});

//delete and redirect to that page
router.get('/delete/:index',checkSessionAuth,async function(req,res){
    var product =await Product.findByIdAndDelete(req.params.index);
    res.redirect('/products');
});
//getting data of the form
router.get('/edit/:index',checkSessionAuth,async function(req,res){
    var product = await Product.findById(req.params.index);
    res.render('products/edit',{product});
});
//add to cart
router.get('/cart/:index',async function(req,res){
    let product =await Product.findById(req.params.index);
    let cart = [];
    if (req.cookies.cart) cart =req.cookies.cart;
    cart.push(product);
    res.cookie("cart",cart);
   
    console.log("Add to cart");
    res.redirect('/products');
});
//remove from cart
router.get('/cart/remove/:index',async function(req,res){
    
    let cart = [];
    if (req.cookies.cart) cart =req.cookies.cart;
    cart.splice(cart.findIndex
        ((c)=> c._id==req.params.index,1)
        );
    res.cookie("cart",cart);
    res.redirect('/cart');
});
//posting edit record record
router.post('/edit/:index',validateProduct,async function(req,res){
    var product =await Product.findById(req.params.index);
    product.Name=req.body.Name;
    product.Size=req.body.Size;
    product.Availability=req.body.Availability;
    product.ProductCode=req.body.ProductCode;
    product.Price=req.body.Price;
    product.Quantity=req.body.Quantity
    await product.save();
    res.redirect('/products');
});



module.exports = router;