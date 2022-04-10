const express = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const { status } = require('express/lib/response')
const Joi = require('joi')
const router = express.Router()


router.post('/' , async(req, res)=>{

   const  {error , value} = validate(req.body)
    if( error) return res.send(error.details[0].message)

    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send("The email or password is invalid")
   let valid =   await  bcryptjs.compare(req.body.password , user.password)
   if (!valid) {
      return  res.status(400).send("The email or password is invalid")
   }
    const token =  await  user.generateToken()
   res.header('x-auth-token' , token).send(valid)
})


function validate(user) {
    const Schema = Joi.object({
       email: Joi.string().min(9).required().email(),
       password: Joi.string().min(4).max(12).required()
    })

    return Schema.validate(user)
}

module.exports = router