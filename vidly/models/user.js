const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')
const { bool, string } = require('joi')



const newuser = new mongoose.Schema({
     
    

    name: {
        type: String,
        maxlength: 30,
        minlength:10,
        required: true
    },

    email: {
        type: String,
        maxlength: 30,
        minlength: 10,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 8
    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
})


newuser.methods.generateToken = function() {
    const token = jwt.sign( { _id: this._id , isAdmin: this.isAdmin} , 'config.get("digitalsign")');
    return token;
}

module.exports =  mongoose.model("users" , newuser)