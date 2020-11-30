const mongoose = require('mongoose');

const URI = "mongodb+srv://rafay:Rafay123@cluster0.tyocc.mongodb.net/products?retryWrites=true&w=majority";

const connectDB = async() => {
    await mongoose.connect(URI, {
        useUnifiedTopology:true,
        useNewUrlParser:true
    });
    console.log('db connected');
}

module.exports = connectDB;