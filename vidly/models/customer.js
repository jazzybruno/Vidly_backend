const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')

const newCustomer = new mongoose.Schema({
    isGold:{
    type: Boolean,
    require:true
    },

    name: {
        type: String,
        required: true,
        maxlength: 40,
        minlength: 8  
    },

    Phone: {
        type : Number,
        maxlength: 10,
        minlength: 10,
        required: true
    }
})

module.exports.newCustomer = newCustomer
module.exports = mongoose.model("Customers" , newCustomer)

