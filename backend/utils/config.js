require('dotenv').config()

// Set vars for database

// Production
let PORT = process.env.PORT
let USERS_URI = process.env.USERS_URI
let RECIPES_URI = process.env.RECIPES_URI

// Testing
if (process.env.NODE_ENV === 'test') {
  USERS_URI = process.env.TEST_USERS_URI
  RECIPES_URI = process.env.TEST_RECIPES_URI
}

// Development
if (process.env.NODE_ENV === 'development') {
  USERS_URI = process.env.DEV_USERS_URI
  RECIPES_URI = process.env.DEV_RECIPES_URI
}

module.exports = {
  USERS_URI,
  RECIPES_URI,
  PORT
}