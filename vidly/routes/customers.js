  const mongoose =  require('mongoose')
 const auth = require('../middleware/auth')
  const Customer = require('../models/customer')
 const admin = require('../middleware/admin')
  const express = require('express')
const Joi = require('joi')
  const router = express.Router()

  router.post('/' , auth , async(req , res)=>{
         
     const {error , value} = validate(req.body) 
     if(error) return res.status(401).send(error.details[0].message)

      const customer = new Customer({
          isGold: req.body.isGold,
          name: req.body.name,
          Phone:req.body.Phone
      })

      let saved =  await customer.save()
      res.send(saved)
  }) 

  router.get('/' , async(req , res)=>{
      let customers = await  Customer.find()
      if (!customers) {
          res.send("They are no customer in the database")
      }else{
        res.send(customers)
      }
  })

  router.put('/:id', auth , async(req , res)=>{
      const id = req.params.id
      let customer = await Customer.findById(id)
      res.send(customer)
      customer.isGold = req.body.isGold,
      customer.name = req.body.name,
      customer.Phone = req.body.Phone
      let updated =  await customer.save()
      res.send(updated)
  })

  router.delete('/:id' , [ auth , admin], async(req , res)=>{
      const id = req.params.id
     await Customer.deleteOne({_id: id})
     res.send("The customer was deleted from the database")
  } )


  function validate(customer) {
       const schema = Joi.object({
           isGold: Joi.boolean().required(),
           name: Joi.string().required().min(8).max(40),
           Phone: Joi.number().required().min(10)
       })
       return schema.validate(customer)
  }
  module.exports = router;