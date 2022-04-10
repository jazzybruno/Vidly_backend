const express = require('express')
const Customer = require('../models/customer')
const Movie = require('../models/movies') 
const auth = require('../middleware/auth')
const Rental = require('../models/rentals')
const admin = require('../middleware/admin')
const router = express.Router()



// router.get('/' ,  async(req, res)=>{
//     let rentals = await Rental.find()
//     res.send(rentals)
// })

router.post('/'  ,auth  , async(req , res)=>{
    
    const {error , value} =  validate(req.body)
    if(error) return res.status(401).send(error.message)

         const customer = await Customer.findById(req.body.customer_id);
         if(!customer){
            return res.status(401).send("The genre with the id provided was not found in the list of genres")
         }
         const movie = await Movie.findById(req.body.movie_id);
         if(!movie){
            return res.status(401).send("The genre with the id provided was not found in the list of genres")
         }
        const rental = new Rental({
            Customer: {
                name: customer.name,
                isGold: customer.isGold,
                Phone: customer.Phone
            },

            Movie: {
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            },

            dateReturned: req.body.dateReturned,
            rentalFee: req.body.rentalFee
        })
        
        const saved = await rental.save()
        res.send(saved)
        
    
})

// router.put('/:id' ,  auth , async(req , res)=>{
      
//           const {error , value} =  validate(req.body)
//           if(error) return res.status(401).send(error.message)
    
        
//         const id = req.params.id
//          let rental =   await Rental.findById(id)

//         const customer = await Customer.findById(req.body.customer_id);
//          if(!customer){
//             return res.status(400).send("The genre with the id provided was not found in the list of genres")
//          }
//          const movie = await Movie.findById(req.body.movie_id);
//          if(!movie){
//             return res.status(401).send("The genre with the id provided was not found in the list of genres")
//          }
       
//          rental.customer = {
//             name: customer.name,
//             isGold: customer.isGold,
//             Phone: customer.Phone
//          }  

//          rental.Movie = {
//             title: movie.title,
//             dailyRentalRate: movie.dailyRentalRate
//          }

//          rental.dateReturned =  req.body.dateReturned,
//          rental.rentalFee =  req.body.rentalFee
         

//          let update =  await rental.save()
//          res.send(update)
         

    
// })

// router.delete('/:id' ,  [ auth , admin] , async(req , res)=>{
//     const id = req.params
//     await Rental.deleteOne({_id: id})
//     res.send("This rental is no longer in the list of renters")
// })


// function validate(rental) {
//     const schema = Joi.object( { 
//         customer_id: Joi.objectId().required(),
//         movie_id: Joi.objectId().required()
//     })
//     return schema.validate(rental)
// }

module.exports = router