const recipesRouter = require('express').Router()
const Recipe = require('../models/recipe')
const User = require('../models/user')
const crypto = require('crypto')

recipesRouter.get('/', (req, res) => {
  Recipe.find({}).then(recipes => {
    res.json(recipes.map(recipe => recipe.toJSON()))
  })
})

recipesRouter.get('/:id', async (req, res, next) => {
  try{
    const recipe = await Recipe.findById(req.params.id)
    if (recipe) {
      res.json(recipe.toJSON())
    } else {
      res.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})


recipesRouter.post('/', async (req, res, next) => {
  const body = req.body

  const recipe = new Recipe({
    category: body.category,
    title: body.title,
    description: body.description,
    ingredients: body.ingredients,
    steps: body.steps,
    servings: body.servings,
    timeToMake: body.timeToMake,
    recipeID: crypto.randomBytes(20).toString('hex'),
    userID: body.userID,
  })

  try {
    const user = await User.findById(body.userID)
    if (user) {
      const saved = await recipe.save()
      res.json(saved.toJSON())
    } else {
      res.status(404).end()
    }

  } catch(exception) {
    next(exception)
  }
})

recipesRouter.delete('/:id', async (req, res, next) => {
  try {
    await Recipe.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

recipesRouter.put('/:id', (req, res, next) => {
  const body = req.body

  const recipe = {
    category: body.category,
    title: body.title,
    description: body.description,
    ingredients: body.ingredients,
    steps: body.steps,
    servings: body.servings,
    timeToMake: body.timeToMake,
    recipeID: crypto.randomBytes(20).toString('hex'),
  }

  Recipe.findByIdAndUpdate(req.params.id, recipe, { new: true})
    .then(newRecipe => {
      res.json(newRecipe.toJSON())
    })
    .catch(error => next(error))
})


module.exports = recipesRouter