const { default: mongoose } = require('mongoose')
const config = require('config')
const winston = require('./winston')
const URL = config.get('db')


module.exports = function () {
    mongoose.connect(URL  )
    .then(() => console.log(`Database connected ${URL} `))
    .catch( (err) =>  winston.error( "some thing went wrong" + err))
}