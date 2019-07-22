const loginoutRouter = require('express').Router()
const User = require('../models/user')
const Hash = require('../utils/hash')

// Handle login
loginoutRouter.post('/login/:username&:password', async (req, res, next) => {
  const uName = req.params.username
  try { 
    const userArr = await User.find({username: uName})
    const user = userArr[0]
    if(!user) return res.status(404).send('Väärä käyttäjänimi').end()
    
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
          res.status(404).send('Väärä salasana').end()
        }
      }
    )
  } catch(exception) {
    next(exception)
  }
})

// Handle authentication
// Not used atm.
loginoutRouter.post('/auth/:username&:password&:loginKEY', async (req, res, next) => {
  try { 
    const userArr = await User.find({username: req.params.username})
    const user = userArr[0]
    if(!user.username || !user.loginKEY) return res.status(404).send('Väärä käyttäjänimi, tai ei sisäänkirjautumista').end()

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

// handle logout
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