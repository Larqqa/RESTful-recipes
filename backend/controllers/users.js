const usersRouter = require('express').Router()
const User = require('../models/user')
const Hash = require('../utils/hash')

// Get all users
usersRouter.get('/', (req, res) => {
  User.find({},'username id').then(users => {
    res.json(users.map(user => user.toJSON()))
  })
})

// Get user by id
usersRouter.get('/:id', async (req, res, next) => {
  try{
    const user = await User.findById(req.params.id, 'username email id')
    if (user) {
      res.json(user.toJSON())
    } else {
      res.status(404).send(`ID: ${req.params.id} | Ei löytynyt käyttäjää ID:llä`).end()
    }
  } catch(exception) {
    next(exception)
  }
})


// Create new user
// Email is not used atm.
usersRouter.post('/', (req, res, next) => {
  const body = req.body
  Hash.hash(req.body.password,
    async (hashedPass) => {
      try { 
        const user = new User({
          username: body.username,
          email: body.username,
          password: hashedPass,
          loginKEY: Hash.TWENTY,
        })
        const saved = await user.save()
        res.json(saved.toJSON())
      } catch(exception) {
        //next(exception)
        if(exception.errors.username.kind === 'minlength') return res.status(400).send(`Käyttäjänimi ${body.username} on liian lyhyt`).end()
        res.status(400).send(`Käyttäjänimi ${body.username} on jo käytössä`).end()
      }
    }
  )
})

// Delete user
usersRouter.delete('/:username&:password&:loginKEY', async (req, res, next) => {
  try { 
    const userArr = await User.find({username: req.params.username})
    const user = userArr[0]
    if(!user || !user.loginKEY) return res.status(404).end()

    Hash.verify(req.params.password, user.password,
      async (verify) => {
        if(verify && req.params.loginKEY === user.loginKEY) {
          try {
            await User.findByIdAndRemove(user.id)
            res.status(204).send('Käyttäjä poistettu').end()
          } catch (exception) {
            next(exception)
          }
        } else {
          res.status(400).send('Väärä salasana').end()
        }
      }
    )
  } catch(exception) {
    next(exception)
  }
})

// Edit user
usersRouter.put('/:username&:password&:loginKEY', async (req, res, next) => {
  try {
    const userArr = await User.find({username: req.params.username})
    const user = userArr[0]
    if(!user || !user.loginKEY) return res.status(404).send('Väärä käyttäjänimi, tai ei sisäänkirjautumista').end()
    const body = req.body

    // If no password, no need to verify user
    if(req.params.password === '0') {
      const userChange = {
        username: body.username,
        email: body.email
      }

      Object.keys(userChange).forEach(key => {
        if(!userChange[key]) delete userChange[key]
      })
      
      try{
        const newUser = await User.findByIdAndUpdate(user.id, userChange, { new: true, select: 'username email id  loginKEY' })
        res.json(newUser.toJSON())
        return res.status(204).end()
      } catch (exception) {
        //next(exception)
        if(exception.errors.username.kind === 'minlength') return res.status(400).send(`Käyttäjänimi ${body.username} on liian lyhyt`).end()
        res.status(400).send(`Käyttäjänimi ${body.username} on jo käytössä`).end()
      }
    }

    // with password verify user
    Hash.verify(req.params.password, user.password,
      async (verify) => {
        if(verify && req.params.loginKEY === user.loginKEY) {
          try {
            Hash.hash(body.password,
              async (hashedPass) => {
                const userChange = {
                  username: body.username,
                  email: body.email,
                  password: hashedPass
                }

                Object.keys(userChange).forEach(key => {
                  if(!userChange[key]) delete userChange[key]
                })

                try{
                  const newUser = await User.findByIdAndUpdate(user.id, userChange, { new: true, select: 'username email id loginKEY' })
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
        } else {
          res.status(404).send('Väärä salasana').end()
        }
      }
    )
  } catch(exception) {
    next(exception)
  }
})

module.exports = usersRouter