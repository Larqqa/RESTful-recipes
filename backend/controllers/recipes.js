const recipesRouter = require('express').Router()
const Recipe = require('../models/recipe')
const User = require('../models/user')

// Get all
recipesRouter.get('/', (req, res) => {
  Recipe.find({}).then(recipes => {
    res.json(recipes.map(recipe => recipe.toJSON()))
  })
})

// Get all from user
recipesRouter.get('/user/:id', (req, res) => {
  Recipe.find({userID: req.params.id}).then(recipes => {
    res.json(recipes.map(recipe => recipe.toJSON()))
  }).catch(err => res.status(404).send('Reseptiä ei löytynyt').end())
})

// Get all with group
recipesRouter.post('/group', (req, res) => {
  if(!req.body.group[0]) {
    Recipe.find({}).then(recipes => {
      res.json(recipes.map(recipe => recipe.toJSON()))
    }).catch(err => res.status(404).send('Reseptiä ei löytynyt').end())
  } else {
    Recipe.find({group : {$all: req.body.group}}).then(recipes => {
      res.json(recipes.map(recipe => recipe.toJSON()))
    }).catch(err => res.status(404).send('Reseptiä ei löytynyt').end())
  }
})

// Get all from user with group
recipesRouter.post('/group/:id', (req, res) => {
  if(!req.body.group[0]) {
    Recipe.find({userID: req.params.id}).then(recipes => {
      res.json(recipes.map(recipe => recipe.toJSON()))
    }).catch(err => res.status(404).send('Reseptiä ei löytynyt').end())
  } else {
    Recipe.find({$and: [
      {userID: req.params.id},
      {group : {$all: req.body.group}}
    ]}).then(recipes => {
      res.json(recipes.map(recipe => recipe.toJSON()))
    }).catch(err => res.status(404).send('Reseptiä ei löytynyt').end())
  }
})

// Get one with id
recipesRouter.get('/:id', async (req, res, next) => {
  try{
    const recipe = await Recipe.findById(req.params.id)
    if (recipe) {
      res.json(recipe.toJSON())
    } else {
      res.status(404).end()
    }
  } catch(exception) {
    //next(exception)
    res.status(404).send('Reseptiä ei löytynyt').end()
  }
})

// Get one with title
recipesRouter.get('/title/:title', async (req, res, next) => {
  try{
    const recipe = await Recipe.findOne({title: req.params.title})
    if (recipe) {
      res.json(recipe.toJSON())
    } else {
      res.status(404).end()
    }
  } catch(exception) {
    //next(exception)
    res.status(404).send('Reseptiä ei löytynyt').end()
  }
})

// Create new recipe
recipesRouter.post('/:loginKEY', async (req, res, next) => {
  const body = req.body

  const recipe = new Recipe({
    category: body.category,
    group: body.group,
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
      res.status(404).send('Käyttäjää ei löytynyt, tai ei sisäänkirjautumista').end()
    }

  } catch(exception) {
    //next(exception)
    res.status(400).send('Tapahtui virhe').end()
  }
})

// Delete recipe
recipesRouter.delete('/:id&:userID&:loginKEY', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userID)
    if (user && user.loginKEY === req.params.loginKEY) {
      await Recipe.findByIdAndRemove({_id: req.params.id, userID: user.id})
      res.status(204).end()
    } else {
      next(new Error('No user by that ID or not logged in'))
      res.status(404).send('Käyttäjää ei löytynyt, tai ei sisäänkirjautumista').end()
    }
  } catch (exception) {
    //next(exception)
    res.status(400).send('Tapahtui virhe').end()
  }
})

// Edit recipe
recipesRouter.put('/:id&:userID&:loginKEY', async (req, res, next) => {
  const body = req.body
  try {
    const user = await User.findById(req.params.userID)
    if (user && user.loginKEY === req.params.loginKEY) {
      try{
        const recipe = {
          category: body.category,
          group: body.group,
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
        //next(exception)
        res.status(400).send('Tapahtui virhe').end()
      }
    } else {
      next(new Error('No user by that ID or not logged in'))
      res.status(404).send('Käyttäjää ei löytynyt, tai ei sisäänkirjautumista').end()      
    }
  } catch (exception) {
    //next(exception)
    res.status(400).send('Tapahtui virhe').end()
  }
})

module.exports = recipesRouter