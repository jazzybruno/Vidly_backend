const { default: mongoose } = require("mongoose");
const {  genreSchema } = require("./genre");



const movies = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        minlength: 3,
        trim: true,
        required: true
    },

    genre: {
        type: Object,
        required: true,
    },

   numberInStock:{
       type: Number,
       required: true,      
   },

   dailyRentalRate: {
       type: Number,
       required: true,
       maxlength: 100,
   }
})

module.exports = mongoose.model("Movies" , movies)
