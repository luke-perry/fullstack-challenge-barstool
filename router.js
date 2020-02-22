const express = require('express')

const sampleController = require('./controllers/sampleController.js')

const mainRouter = express.Router()

const sampleResourceRouter = express.Router()
mainRouter.use('/sample', sampleResourceRouter)

sampleResourceRouter.get('/hello', sampleController.hello)

module.exports = mainRouter
