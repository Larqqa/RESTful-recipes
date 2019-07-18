const usersRouter = require('express').Router()
const User = require('../models/user')
const Hash = require('../utils/hash')

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

usersRouter.post('/', (req, res, next) => {
  const body = req.body
  Hash.hash(req.body.password,
    async (hashedPass) => {
      try { 
        const user = new User({
          username: body.username,
          password: hashedPass,
          email: body.email,
        })
        const saved = await user.save()
        res.json(saved.toJSON())
      } catch(exception) {
        next(exception)
      }
    }
  )
})

usersRouter.delete('/:username&:password&:loginKEY', async (req, res, next) => {
  try { 
    const user = await User.findOne({username: req.params.username})
    if(!user || !user.loginKEY) return res.status(404).end()

    Hash.verify(req.params.password, user.password,
      async (verify) => {
        if(verify && req.params.loginKEY === user.loginKEY) {
          try {
            await User.findByIdAndRemove(user.id)
            res.status(204).end()
          } catch (exception) {
            next(exception)
          }
        }
      }
    )
  } catch(exception) {
    next(exception)
  }
})

usersRouter.put('/:username&:password&:loginKEY', async (req, res, next) => {
  try { 
    const user = await User.findOne({username: req.params.username})
    if(!user || !user.loginKEY) return res.status(404).end()
    
    const body = req.body
    if(!body.password) {
      
      const userChange = {
        username: body.username,
        email: body.email
      }
      try{
        const newUser = await User.findByIdAndUpdate(user.id, userChange, { new: true, select: 'username email id' })
        res.json(newUser.toJSON())
        return res.status(204).end()
      } catch (exception) {
        next(exception)
        return
      }
    }

    Hash.verify(req.params.password, user.password,
      async (verify) => {
        if(verify && req.params.loginKEY === user.loginKEY) {
          try {
            Hash.hash(body.password,
              async (hashedPass) => {
                const userChange = {
                  username: body.username,
                  email: body.email,
                  passwod: hashedPass
                }
                try{
                  const newUser = await User.findByIdAndUpdate(user.id, userChange, { new: true, select: 'username email id' })
                  res.json(newUser.toJSON())
                  res.status(204).end()
                } catch (exception) {
                  next(exception)
                }
              }
            )
          } catch (exception) {
            next(exception)
          }
        }
      }
    )
  } catch(exception) {
    next(exception)
  }
})

module.exports = usersRouter