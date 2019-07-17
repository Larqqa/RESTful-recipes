const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', (req, res) => {
  User.find({}).then(users => {
    res.json(users.map(user => user.toJSON()))
  })
})

usersRouter.get('/:id', async (req, res, next) => {
  try{
    const user = await User.findById(req.params.id, 'username email id')
    if (user) {
      res.json(user.toJSON())
    } else {
      res.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

usersRouter.post('/', async (req, res, next) => {
  const body = req.body

  const user = new User({
    username: body.username,
    password: body.password,
    email: body.email,
  })

  try { 
    const saved = await user.save()
    res.json(saved.toJSON())
  } catch(exception) {
    next(exception)
  }
})


usersRouter.post('/login/:username&:password', async (req, res, next) => {
  const name = req.params.username
  const pass = req.params.password

  try { 
    const user = await User.findOne({username: new RegExp(name, 'i')})
    if(!user) res.status(404).end()
    
    pass === user.password ? res.json(user.toJSON()) : res.status(404).end()
  } catch(exception) {
    next(exception)
  }
})


usersRouter.delete('/:id', async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

usersRouter.put('/:id', (req, res, next) => {
  const body = req.body

  const user = {
    username: body.username,
    email: body.email,
  }

  User.findByIdAndUpdate(req.params.id, user, { new: true, select: 'username email id' })
    .then(newUser => {
      res.json(newUser.toJSON())
    })
    .catch(error => next(error))
})


module.exports = usersRouter