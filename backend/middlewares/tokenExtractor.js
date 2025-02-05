require('dotenv').config()
const jwt = require('jsonwebtoken')

const tokenExtractor = async (request, response, next) => {
  const token = request.token
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if(decodedToken.id) {
    request.user = await User.findById(decodedToken.id)
    } 
  } else {
    request.user = null
  }
  next()
}

module.exports = tokenExtractor;
