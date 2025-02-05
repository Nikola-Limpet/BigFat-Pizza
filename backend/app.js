const config = require('./config/config')
const express = require('express')

const app = express()

const cors = require('cors')

const logger = require('./utils/logger')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
const unknownEndpoint = require('./middlewares/unknownEndpoint')


mongoose.set('strictQuery', false)
logger.info('connecting to ', config.MONGO_DB_URI)

// connect to mongodb 

mongoose.connect(config.MONGO_DB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDb', error.message)
  })

// Built-in MiddleWare
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

// custom middleware



// Routes

// auth
app.use('/api/auth/register', )
app.use('/api/auth/login', )
app.use('/api/auth/refreseh-token', )

// prodcuts
app.use('/api/products', )
app.use('/api/prodcuts/:id', )
app.use('/api/categories', )


// orders 
app.use('/api/orders', )
app.use('/api/orders/:id', )
app.use('/api/orders/track/:id', )


// users 
app.use('/api/user/profile', )
app.use('/api/user/orders', )
app.use('/api/user/addresses', )




// Custom error middlewares
app.use(unknownEndpoint)
app.use(errorHandler)


module.exports = app;