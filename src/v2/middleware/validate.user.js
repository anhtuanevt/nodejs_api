const jwt = require('jsonwebtoken')
require('dotenv').config()

const validateUser = async (req, res, next) => {
   const authorization = req.headers.authorization
   if(!authorization) return res.status(401).send({message : 'Unauthorized'})
   
   const token = authorization && authorization.split(' ')[1]
   // console.log(token)

   if(!token) return res.status(401).send({message : 'Unauthorized'})
   try {
      var decoded = jwt.verify(token, process.env.PRIVATE_KEY)
      req.userId = decoded.userId
      next()
   } catch (error) {
      return res.status(401).send({message : 'Unauthorized'})
   }
  
};

module.exports = validateUser;

