const recipesRouter = require('express').Router()
const Recipe = require('../models/recipe')
const User = require('../models/user')

recipesRouter.get('/', (req, res) => {
  Recipe.find({}).then(recipes => {
    res.json(recipes.map(recipe => recipe.toJSON()))
  })
})

recipesRouter.get('/user/:id', (req, res) => {
  Recipe.find({userID: req.params.id}).then(recipes => {
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

recipesRouter.get('/title/:title', async (req, res, next) => {
  try{
    const recipe = await Recipe.findOne({title: req.params.title})
    if (recipe) {
      res.json(recipe.toJSON())
    } else {
      res.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

recipesRouter.post('/:loginKEY', async (req, res, next) => {
  const body = req.body

  const recipe = new Recipe({
    category: body.category,
    title: body.title,
    description: body.description,
    ingredients: body.ingredients,
    steps: body.steps,
    servings: body.servings,
    timeToMake: body.timeToMake,
    userID: body.userID,
  })

  try {
    const user = await User.findById(body.userID)
    if (user && user.loginKEY === req.params.loginKEY) {
      const saved = await recipe.save()
      res.json(saved.toJSON())
    } else {
      next(new Error('No user by that ID or not logged in'))
      res.status(404).end()
    }

  } catch(exception) {
    next(exception)
  }
})

recipesRouter.delete('/:id&:userID&:loginKEY', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userID)
    if (user && user.loginKEY === req.params.loginKEY) {
      await Recipe.findByIdAndRemove({_id: req.params.id, userID: user.id})
      res.status(204).end()
    } else {
      next(new Error('No user by that ID or not logged in'))
      res.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

recipesRouter.put('/:id&:userID&:loginKEY', async (req, res, next) => {
  const body = req.body
  try {
    const user = await User.findById(req.params.userID)
    if (user && user.loginKEY === req.params.loginKEY) {
      try{
        const recipe = {
          category: body.category,
          title: body.title,
          description: body.description,
          ingredients: body.ingredients,
          steps: body.steps,
          servings: body.servings,
          timeToMake: body.timeToMake,
        }

        Object.keys(recipe).forEach(key => {
          if(!recipe[key]) delete recipe[key]
        })
        
        const newRecipe = await Recipe.findByIdAndUpdate(req.params.id, recipe, { new: true})
        res.json(newRecipe.toJSON())
      } catch (exception) {
        next(exception)
      }
    } else {
      next(new Error('No user by that ID or not logged in'))
      res.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = recipesRouter