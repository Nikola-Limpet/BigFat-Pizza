const app = require('./app')

// API version 2.0 - main branch update
const config = require('./config/config')
const logger = require('./utils/logger')


app.listen(config.PORT, () => {
  logger.info(`Sever Running On Port: ${config.PORT}`)
})