const jwt = require('jsonwebtoken')
const config = require('config')
const res = require('express/lib/response')

function admin(req , res , next) {
    if (req.user.isAdmin === false)  return  res.status(501).send('You are not allowed to perfom this action')
    next()
     
}

module.exports = admin