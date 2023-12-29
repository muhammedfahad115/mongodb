
const mongoose = require('mongoose')


const userschema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    }
    ,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        required: true, 
        default: "user",
    }
})

const userModel = new mongoose.model('userCollection', userschema)

module.exports = userModel
