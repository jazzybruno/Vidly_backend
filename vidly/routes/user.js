const bcryptjs = require('bcryptjs')
const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
const Joi = require('joi')
const  _ = require('lodash')
const mongoose = require('mongoose')
const User = require('../models/user')
const auth = require('../middleware/auth')
const passwordComplexity = require('joi-password-complexity')
const router = express.Router()


router.get('/me' , auth , async(req , res)=>{
   const user =  await User.findById(req.user._id).select('-password')
    res.send(user)
})

router.post('/' , async(req , res)=>{
  
          
        const { error , value} =  validate(req.body)
        if(error) return res.send(error.details[0].message)

    
        let user = await User.findOne({email: req.body.email})
        if (user) {
            res.status(400).send("User already exists")
        }else{
            user = new User( _.pick( req.body , ['email' , 'name' , 'password']))
            const salt = await bcryptjs.genSalt(10)
            user.password = await bcryptjs.hash(user.password , salt)
            
            
              try {
               const token = await user.generateToken()
                await user.save()                
              res.header('x-auth-token' , token).send(_.pick(user , [ '_id'  , 'name' , 'email', ]))
              } catch (ex) {
                  res.send(ex.message)
              }  
         }
    }
)

function validate(users) {
    const Schema = Joi.object( {
      name: Joi.string().min(8).max(50).required(),
      email: Joi.string().min(10).max(50).required().email(),
      password: new passwordComplexity()
    })

    return Schema.validate(users)
}


module.exports = router