 const express =  require('express')
 const   Genre  = require('../models/genre')
 const router = express.Router()
 const auth = require('../middleware/auth')
 const admin = require('../middleware/admin')
 const validate = require('../middleware/validatingObjectId')
 const Joi = require('joi')
const { default: mongoose } = require('mongoose')



  router.get('/' , async (req, res)=>{
      let genres =  await Genre.find() 
      if (!genres) {
        return  res.status(400).send("The are no genres to be shown")
      }   
      res.send(genres)
  })

  router.get( '/:id' ,validate ,  async ( req , res)=>{
    
    const result =  await Genre.findById(req.params.id)
    if(!result)  return res.status(404).send('There are no genres matching that id')
    res.send( result)
  })
 
router.post('/' ,  auth , async(req , res )=>{

      const  {error , value} = validation(req.body)
      if(error) return res.status(401).send(error.details[0].message)  

     const genre = new Genre({
        name: req.body.name
    })
       await genre.save()
        res.send(genre)
       
})


  router.put('/:id' ,  auth, validate ,  async(req , res , next )=>{
    const id = req.params.id
    const genre =  await Genre.findById(id)
    if (!genre) {
         return  res.status(400).send(`The genre with the id ${id} was not found in the list of genres`)
    }
    //validating the new names
     
     const  {error , value} = validation(req.body)
     if(error) return res.status(401).send(error.details[0].message)
    // updating the results
       genre.name = req.body.name
      //saving the updates 
     
        await genre.save()
        res.send(genre)
      
  })

  router.delete('/:id', [ auth , admin] , validate , async(req , res)=>{
     
      let deleted =  await Genre.deleteOne({_id: req.params.id})
      res.send("The genre was deleted from the database")
    
  })

  function validation( genre) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(10).required()
    })
    return schema.validate(genre)
}
  


  module.exports = router;