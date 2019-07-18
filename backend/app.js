const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const userRouter = require('./controllers/users')
const loginoutRouter = require('./controllers/loginouts')
const recipesRouter = require('./controllers/recipes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
require('./utils/dbconnect')

logger.info('connecting to', config.USERS_URI)
logger.info('connecting to', config.RECIPES_URI)

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/users', userRouter)
app.use('/api/user', loginoutRouter)
app.use('/api/recipes', recipesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app