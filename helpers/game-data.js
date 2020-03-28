const mongodb = require('mongodb')

const TYPE_GAME_DETAILS = 'gamed-details'
const TYPE_GAME_BOXSCORE = 'gamed-box-score'

const calculateAgeOfMongoDocument = (objectWithMongoId) => {
    if (!objectWithMongoId) return null

    const currentTime = new Date(Date.now())

    const dataInsertedTime = new Date(mongodb.ObjectId(objectWithMongoId._id).getTimestamp())

    return currentTime - dataInsertedTime
}

const extractDataForEndpoint = (gameData, type) => {
    const gameDetailsKeys = ['league', 'away_team', 'home_team', 'away_period_scores', 'home_period_scores', 'event_information', 'officials']
    const gameBoxScoreKeys = ['away_totals', 'home_totals', 'home_stats', 'away_stats', 'home_batter_totals', 'away_batter_totals', 'home_fielding', 'away_fielding', 'home_pitchers', 'away_pitchers', 'home_batters', 'away_batters']
    const typeMap = { [TYPE_GAME_DETAILS]: gameDetailsKeys, [TYPE_GAME_BOXSCORE]: gameBoxScoreKeys }

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
