const express = require('express')
const mongoose = require('mongoose')
const Genre = require('../models/genre')
const movies = require('../models/movies')
const Movies = require('../models/movies')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const router = express.Router()



router.get('/' ,  async(req , res)=>{
    const movies = await Movies.find()
    res.send(movies)
})

router.post('/' , auth ,  async(req, res)=>{
    const genre = await Genre.findById(req.body.genre_id)
    if(!genre){
       return res.status(400).send("The genre with the id provided was not found in the list of genres")
    }

    const movie = new Movies({
        title: req.body.title,
        genre: {
            _id: genre.id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

     const saved =  await movie.save()
     res.send(saved)
})


router.put('/:id',  auth , async(req , res)=>{
    const genre = await Genre.findById(req.body.genre_id)
    if(!genre){
        return res.status(400).send("The genre with the id provided was not found in the list of genres")
     }

     const id = req.params.id
    let movie =  await Movies.findById(id)
     movie.title = req.body.title,
     movie.genre = {
         _id : genre.id,
         name: genre.name
     },
     movie.numberInStock = req.body.numberInStock,
     movie.dailyRentalRate = req.body.dailyRentalRate

     let update =  await movie.save()
     res.send(update)
    })


    router.delete('/:id' , [ auth , admin], async(req , res)=>{
        const id = req.params.id
          await Movies.deleteOne({_id: id})
        res.send("The movie was deleted from the list")
    })

module.exports = router