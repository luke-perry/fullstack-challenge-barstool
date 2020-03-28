const dataStoreAdapter = require('../adapters/data-store')
const remoteDataRetrievalAdapter = require('../adapters/remote-data-retrieval')
const gameDataHelper = require('../helpers/game-data')

const DATABASE_NAME = 'scoreboard-db'
const COLLECTION_NAME = 'game-data'
const FIFTEEN_SECONDS = 15000

const getCurrentGameData = async (gameId) => {
    const gameData = await dataStoreAdapter.findValueInDatastoreCollection(DATABASE_NAME, COLLECTION_NAME, { gameId })
    const gameDataAge = gameDataHelper.calculateAgeOfMongoDocument(gameData)


    if (gameDataAge !== null && gameDataAge < FIFTEEN_SECONDS) {
        return gameData
    }

    const newestData = await remoteDataRetrievalAdapter.retrieveGameData(gameId)

    if (gameDataAge > FIFTEEN_SECONDS) {
        await dataStoreAdapter.updateValueInDatastoreCollection(DATABASE_NAME, COLLECTION_NAME, { gameId }, { $set: { ...newestData, gameId } })
    } else if (gameDataAge === null) {
        await dataStoreAdapter.insertValueIntoDatastoreCollection(DATABASE_NAME, COLLECTION_NAME, { ...newestData, gameId })
    }

    return newestData
}

module.exports = {
    getCurrentGameData,
}
