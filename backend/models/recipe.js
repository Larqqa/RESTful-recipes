const dbconnect = require('../utils/dbconnect')

const database = dbconnect.recipesDB

database.set('useFindAndModify', false)
const uniqueValidator = require('mongoose-unique-validator')

const recipeSchema = new database.Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  steps: {
    type: Array,
    required: true,
  },
  servings: Number,
  timeToMake: Number,
  userID: {
    type: String,
    required: true,
  },
})

recipeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

recipeSchema.plugin(uniqueValidator)

module.exports = database.model('Recipe', recipeSchema)