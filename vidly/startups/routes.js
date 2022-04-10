const home = require('../routes/home')
const genres = require('../routes/genres')
const customers = require('../routes/customers')
const movies = require('../routes/movies')
const rentals = require('../routes/rentals')
const auth = require('../routes/auth')
const users = require('../routes/user')
const error = require('../middleware/error')
const express = require('express')

module.exports = function (app) {
app.use(express.json())
app.use('/api/genres' , genres)
app.use('/api/rentals' , rentals)
app.use('/api/users' , users)
app.use('/api/auth' , auth)
app.use('/api/movies' , movies)
app.use('/api/customer' , customers)
app.use('/' , home)
app.use(error)

}