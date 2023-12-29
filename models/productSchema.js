const mongoose = require('mongoose')

const productschema = new mongoose.Schema({
    productName : {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    }
})

const productModel = new mongoose.model('productCollection',productschema)
module.exports = productModel