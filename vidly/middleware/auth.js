const jwt = require('jsonwebtoken')
const config = require('config')


function auth(req , res , next) {
    token = req.header('x-auth-token')
    if(!token) return res.status(401).send("Acess denied ! No token provided ")

     try {
      const decoded =  jwt.verify(token , 'config.get("digitalsign")' )
        req.user = decoded
        next()
     } catch (ex) {
         res.status(400).send(" Failed ! Invalid token")
     }
     
}

module.exports = auth 