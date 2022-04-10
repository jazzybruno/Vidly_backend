require('express-async-errors')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./startups/routes')
const mongodb = require('./startups/database')
const configure = require('./startups/config')
const validate = require('./startups/validation')
const logging = require('./startups/winston')
const error = require('./middleware/error')
const app = express()
const PORT = process.env.PORT ||   5000
logging()
routes(app)
mongodb()
configure()
validate()

 module.exports =  app.listen(PORT, ()=>{
    console.log(`Listening on port: ${PORT}`);
})
