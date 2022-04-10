  const User =  require('../../../models/user')
  const jwt = require('jsonwebtoken')
  const config = require('config')
const { default: mongoose } = require('mongoose')


  

test('Authatication Token' , ()=>{
    const details = { 
        _id:  mongoose.Types.ObjectId().toHexString(),
        isAdmin: false
        }
    const user = new User(details)

    const token =   user.generateToken()
   const valid =  jwt.verify(token , 'config.get("digitalsign")')
     expect(valid).toMatchObject(details)

})