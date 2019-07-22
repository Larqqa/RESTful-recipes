const config = require('../utils/config')
const logger = require('../utils/logger')
const Mongoose = require('mongoose').Mongoose

// Connect to two databases
let usersDB = new Mongoose()
let recipesDB = new Mongoose()

// User DB
usersDB.connect(config.USERS_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

// Recipes DB
recipesDB.connect(config.RECIPES_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

module.exports = {
  usersDB,
  recipesDB
}