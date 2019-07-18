const loginoutRouter = require('express').Router()
const User = require('../models/user')
const Hash = require('../utils/hash')

loginoutRouter.post('/login/:username&:password', async (req, res, next) => {
  const uName = req.params.username
  try { 
    const user = await User.findOne({username: new RegExp(uName, 'i')})
    if(!user) return res.status(404).end()
    
    Hash.verify(req.params.password, user.password,
      async (verify) => {
        if(verify) {
          try {
            User.findByIdAndUpdate(
              user.id,
              {loginKEY: Hash.TWENTY},
              { new: true, select: 'username email id loginKEY' })
              .then(newUser => {
                res.json(newUser.toJSON())
              })
          }
          catch(exception) {
            next(exception)
          }
        } else {
          next(new Error('wrong password was given'))
          res.status(404).end()
        }
      }
    )
  } catch(exception) {
    next(exception)
  }
})

loginoutRouter.post('/auth/:username&:password&:loginKEY', async (req, res, next) => {
  try { 
    const user = await User.findOne({username: new RegExp(req.params.username, 'i')})
    if(!user || !user.loginKEY) return res.status(404).end()

    Hash.verify(req.params.password, user.password,
      (verify) => {
        verify && req.params.loginKEY === user.loginKEY ?
          res.status(200).end() : res.status(400).end()
      }
    )
  } catch(exception) {
    next(exception)
  }
})

loginoutRouter.post('/logout/:id&:loginKEY', async (req, res, next) => {
  const id = req.params.id
  const loginKEY = req.params.loginKEY

  try { 
    const user = await User.findById(id, 'loginKEY')
    if(!user) res.status(404).end()
    
    if(loginKEY === user.loginKEY) {
      try {
        User.findByIdAndUpdate(
          id,
          {loginKEY: null})
          .then(() => {
            res.status(204).end()
          })
      }
      catch(exception){
        next(exception)
      }
    } else {
      res.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

module.exports = loginoutRouter