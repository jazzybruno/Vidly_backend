const { default: mongoose } = require("mongoose");
const { required } = require("nodemon/lib/config");
const { newCustomer } = require("./customer");


const rentals = new mongoose.Schema({
   
   Customer: {
        type: new mongoose.Schema({
         name:{
             type: String,
             required: true,
             maxlength:40,
             minlength: 10,
         },

         isGold: {
             type:Boolean,
             required: true
         },

         Phone:{
             type:Number,
             maxlength:10,
             minlength:10,
             required: true,
         }
        }),
        required: true,
   } ,

   Movie:{
       type: new mongoose.Schema({
        title: {
            type: String,
            maxlength: 20,
            minlength: 3,
            trim: true,
            required: true
        },
    
        dailyRentalRate: {
            type: Number,
            required: true,
            maxlength: 100,
        }
       }),
       required: true
   } ,

  dateOut: {
      type: Date,
      default: Date.now
  },

  dateReturned: {
      type: Date,
      required: false
  },

  rentalFee: {
      type: Number,
      required: false,
      minlength: 0
  } 

})


module.exports = mongoose.model("Rentals" , rentals)