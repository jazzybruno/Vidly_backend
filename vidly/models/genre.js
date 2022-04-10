  const mongoose =  require('mongoose')
  const Joi = require('joi')

  const genreSchema = new mongoose.Schema({
      name: {
          type: String,
          maxlength: 10,
          minlength: 5,
          required: true
      }
  });


   
  module.exports.genreSchema = genreSchema
  module.exports = mongoose.model("Genres" , genreSchema)