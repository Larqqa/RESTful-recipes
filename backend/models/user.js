const dbconnect = require('../utils/dbconnect')

const database = dbconnect.usersDB

database.set('useFindAndModify', false)
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new database.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    unique: true
  },
  password: {
    type: String,
    minlength: 6
  },
  email: {
    type: String,
    unique: true,
  },
  loginKEY: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

userSchema.plugin(uniqueValidator)

module.exports = database.model('User', userSchema)