const dataStoreAdapter = require('../../adapters/data-store')
const remoteDataRetrievalAdapter = require('../../adapters/remote-data-retrieval')
const gameDataHelper = require('../../helpers/game-data')

const gameDataService = require('../game-data')

describe('game-data-service', () => {
    describe('#getCurrentGameData', () => {
        let mockFindValueInDatastoreCollection
        let mockInsertValueIntoDatastoreCollection
        let mockUpdateValueInDatastoreCollection
        let mockRetrieveGameData
        let mockCalculateAgeOfMongoDocument

        const sampleGameId = 'id123'
        const oneSecond = 1000
        const sixteenSeconds = 16000

        it('should return the cache data if the cache is present and in date', async () => {
            const mockCachedData = { data: 'stuff' }
            mockFindValueInDatastoreCollection = jest.spyOn(dataStoreAdapter, 'findValueInDatastoreCollection').mockResolvedValue(mockCachedData)
            mockCalculateAgeOfMongoDocument = jest.spyOn(gameDataHelper, 'calculateAgeOfMongoDocument').mockReturnValue(oneSecond)

            const resultData = await gameDataService.getCurrentGameData(sampleGameId)

            expect(mockFindValueInDatastoreCollection).toHaveBeenCalled()
            expect(mockCalculateAgeOfMongoDocument).toHaveBeenCalled()
            expect(resultData).toEqual(mockCachedData)
        })

        it('should retrieve the game data and updated the cache if the cache data is old', async () => {
            const mockUpdatedData = { data: 'stuff' }

            mockFindValueInDatastoreCollection = jest.spyOn(dataStoreAdapter, 'findValueInDatastoreCollection').mockResolvedValue({ data: 'old' })
            mockCalculateAgeOfMongoDocument = jest.spyOn(gameDataHelper, 'calculateAgeOfMongoDocument').mockReturnValue(sixteenSeconds)
            mockRetrieveGameData = jest.spyOn(remoteDataRetrievalAdapter, 'retrieveGameData').mockResolvedValue(mockUpdatedData)
            mockUpdateValueInDatastoreCollection = jest.spyOn(dataStoreAdapter, 'updateValueInDatastoreCollection').mockResolvedValue()

            const resultData = await gameDataService.getCurrentGameData(sampleGameId)

            expect(mockFindValueInDatastoreCollection).toHaveBeenCalled()
            expect(mockCalculateAgeOfMongoDocument).toHaveBeenCalled()
            expect(mockRetrieveGameData).toHaveBeenCalled()
            expect(mockUpdateValueInDatastoreCollection).toHaveBeenCalled()
            expect(resultData).toEqual(mockUpdatedData)
        })

        it('should retrieve the game data and cache it if it has never been cached', async () => {
            const mockInsertedData = { data: 'stuff' }

            mockFindValueInDatastoreCollection = jest.spyOn(dataStoreAdapter, 'findValueInDatastoreCollection').mockResolvedValue(null)
            mockCalculateAgeOfMongoDocument = jest.spyOn(gameDataHelper, 'calculateAgeOfMongoDocument').mockReturnValue(null)
            mockRetrieveGameData = jest.spyOn(remoteDataRetrievalAdapter, 'retrieveGameData').mockResolvedValue(mockInsertedData)
            mockInsertValueIntoDatastoreCollection = jest.spyOn(dataStoreAdapter, 'insertValueIntoDatastoreCollection').mockResolvedValue()

            const resultData = await gameDataService.getCurrentGameData(sampleGameId)

            expect(mockFindValueInDatastoreCollection).toHaveBeenCalled()
            expect(mockCalculateAgeOfMongoDocument).toHaveBeenCalled()
            expect(mockRetrieveGameData).toHaveBeenCalled()
            expect(mockInsertValueIntoDatastoreCollection).toHaveBeenCalled()
            expect(resultData).toEqual(mockInsertedData)
        })
    })
})
