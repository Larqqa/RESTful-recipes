require('dotenv').config()

let PORT = process.env.PORT
let USERS_URI = process.env.USERS_URI
let RECIPES_URI = process.env.RECIPES_URI

if (process.env.NODE_ENV === 'test') {
  USERS_URI = process.env.TEST_USERS_URI
  RECIPES_URI = process.env.TEST_RECIPES_URI
}

module.exports = {
  USERS_URI,
  RECIPES_URI,
  PORT
}