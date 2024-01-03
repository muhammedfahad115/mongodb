const mongoose = require('mongoose')

const detailsSchema  = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required:true
    },
    phonenumber : {
        type : Number,
        required : true,
    },
    dateofbirth : {
        type : Date,
        required : true 
    },
})

const userprofile =  mongoose.model('userprofile',detailsSchema)

module.exports = userprofile;


