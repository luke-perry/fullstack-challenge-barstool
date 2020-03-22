const { BAD_REQUEST, OK, FAILED_DEPENDENCY } = require('http-status-codes')

const gameDataService = require('../services/game-data')
const gameDataHelper = require('../helpers/game-data')

const _handleGameDataRequest = async (req, res, requestType) => {
    const { gameId } = req.params

    if (!gameId) {
        res.sendStatus(BAD_REQUEST)
    }

    let gameData
    try {
        gameData = await gameDataService.getCurrentGameData(gameId)
    } catch (error) {
        res.sendStatus(FAILED_DEPENDENCY)
        return
    }

    const formattedGameData = gameDataHelper.extractDataForEndpoint(gameData, requestType)

    res.status(OK).send(formattedGameData)
}

const getGameFullData = async (req, res) => {
    await _handleGameDataRequest(req, res)
}

const getGameDetails = async (req, res) => {
    await _handleGameDataRequest(req, res, gameDataHelper.TYPE_GAME_DETAILS)
}

const getGameBoxScore = async (req, res) => {
    await _handleGameDataRequest(req, res, gameDataHelper.TYPE_GAME_BOXSCORE)
}

module.exports = {
    getGameDetails,
    getGameBoxScore,
    getGameFullData,
}
