// WIP

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const dbconnect = require('../utils/dbconnect')

const User = require('../models/user')
const Recipe = require('../models/recipe')
const Hash = require('../utils/hash')

// Test objects
const userObj = {
  username: 'testing',
  password: 'testing',
  loginKEY: Hash.TWENTY,
}

Hash.hash(userObj.password, res => {
  userObj.password = res
})

const recipeObj = {
  title: 'muroja maidossa',
  category: 'aamupala',
  group: ['vilja ja riisi', 'maitotuotteet', 'marjat ja hedelmät'],
  description: 'muroja maidossa hillolla, tai marjoilla',
  ingredients: ['muroja', 'maitoa', 'hilloa tai marjoja'],
  steps: ['kaada murot kulhoon', 'lisää maitoa', 'sekoita sekaan hillo tai marjat'],
  servings: 1,
  timeToMake: 15,
  userID: null
}

/* ----------RECIPE TESTS---------- */
describe('Recipe tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Recipe.deleteMany({})

    let newUser = new User(userObj)
    const user = await newUser.save()
    recipeObj.userID = user._id

    let newRecipe = new Recipe(recipeObj)

    await newRecipe.save()
  })

  test('recipe is returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('recipe title is returned correctly', async () => {
    const users = await User.find({})
    const username = users.map(u => u.username)
    expect(username).toContain(userObj.username)
  })

  test('recipe title can not be a duplicate', async () => {
    let newRecipe = new Recipe(recipeObj)
    let err = null
    try {
      await newRecipe.save()
      err = 'no catch'
    } catch(ex) {
      err = 'catch'
    }
    expect(err).toBe('catch')
  })

  test('recipe can be edited', async () => {
    const newRecipe = {
      title: 'muroja marjoilla',
      category: 'lounas',
      description: 'muroja marjoilla'
    }
    const options = {
      context: 'query',
      runValidators: true,
      new: true
    }

    const recipeArr = await Recipe.find({title: recipeObj.title})
    const recipe = recipeArr[0]
    const editedRecipe = await Recipe.findByIdAndUpdate(recipe.id, newRecipe, options)

    expect(editedRecipe.title).toBe(newRecipe.title)
    expect(editedRecipe.category).toBe(newRecipe.category)
    expect(editedRecipe.description).toBe(newRecipe.description)
  })

  test('recipe can be removed', async () => {
    const recipeArr = await Recipe.find({title: recipeObj.title})
    const recipe = recipeArr[0]

    await Recipe.findByIdAndRemove(recipe._id)

    const recipes = await Recipe.find({})
    expect(recipes).toEqual([])
  })
})

afterAll(() => {
  dbconnect.usersDB.connection.close()
  dbconnect.recipesDB.connection.close()
}) 