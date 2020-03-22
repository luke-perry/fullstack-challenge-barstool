const express = require('express')

const gameData = require('./controllers/game-data.js')

const mainRouter = express.Router()

const sampleResourceRouter = express.Router()
mainRouter.use('/games/data', sampleResourceRouter)

sampleResourceRouter.get('/:gameId/details', gameData.getGameDetails)
sampleResourceRouter.get('/:gameId/boxscore', gameData.getGameBoxScore)
sampleResourceRouter.get('/:gameId', gameData.getGameFullData)

module.exports = mainRouter
