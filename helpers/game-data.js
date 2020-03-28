const mongodb = require('mongodb')

const { commonSportDetailsKeys, allSportsStatsKeys } = require('../config/game-constants')

const TYPE_GAME_DETAILS = 'gamed-details'
const TYPE_GAME_BOXSCORE = 'gamed-box-score'

const calculateAgeOfMongoDocument = (objectWithMongoId) => {
    if (!objectWithMongoId) return null

    const currentTime = new Date(Date.now())

    const dataInsertedTime = new Date(mongodb.ObjectId(objectWithMongoId._id).getTimestamp())

    return currentTime - dataInsertedTime
}

const extractDataForEndpoint = (gameData, type) => {
    const typeMap = { [TYPE_GAME_DETAILS]: commonSportDetailsKeys, [TYPE_GAME_BOXSCORE]: allSportsStatsKeys }

    if (!type) return gameData

    const keysToUse = typeMap[type]

    const gameDataSubset = keysToUse.reduce((acc, keyName) => {
        acc[keyName] = gameData[keyName]
        return acc
    }, {})

    return gameDataSubset
}

module.exports = {
    TYPE_GAME_DETAILS,
    TYPE_GAME_BOXSCORE,
    calculateAgeOfMongoDocument,
    extractDataForEndpoint,
}
