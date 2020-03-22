const { BAD_REQUEST, OK } = require('http-status-codes')

const gameDataService = require('../../services/game-data')
const gameDataHelper = require('../../helpers/game-data')
const gameDataController = require('../game-data')

describe('sampleController', () => {
    const sampleGoodReq = { params: { gameId: 'g123' } }
    const mockData = { data: 'rawData' }
    const mockFormattedData = { data: 'Fancy Formatted Data' }

    let mockStatusSend
    let sampleRes

    let mockGetCurrentGameData
    let mockExtractDataForEndpoint

    beforeEach(() => {
        mockStatusSend = { send: jest.fn() }
        sampleRes = { send: jest.fn(), sendStatus: jest.fn(), status: jest.fn().mockReturnValue(mockStatusSend) }

        mockGetCurrentGameData = jest.spyOn(gameDataService, 'getCurrentGameData').mockResolvedValue(mockData)
        mockExtractDataForEndpoint = jest.spyOn(gameDataHelper, 'extractDataForEndpoint').mockReturnValue(mockFormattedData)
    })

    describe('#getGameFullData', () => {
        it('should ', async () => {
            await gameDataController.getGameFullData(sampleGoodReq, sampleRes)

            expect(mockGetCurrentGameData).toHaveBeenCalledWith(sampleGoodReq.params.gameId)
            expect(mockExtractDataForEndpoint).toHaveBeenCalledWith(mockData, undefined)
            expect(sampleRes.status).toHaveBeenCalledWith(OK)
            expect(mockStatusSend.send).toHaveBeenCalledWith(mockFormattedData)
        })

        it('should return a bad request if no gameId is provided', async () => {
            const sampleBadReq = { params: {} }

            await gameDataController.getGameFullData(sampleBadReq, sampleRes)

            expect(sampleRes.sendStatus).toHaveBeenCalledWith(BAD_REQUEST)
        })
    })

    describe('#getGameDetails', () => {
        it('should ', async () => {
            await gameDataController.getGameDetails(sampleGoodReq, sampleRes)

            expect(mockGetCurrentGameData).toHaveBeenCalledWith(sampleGoodReq.params.gameId)
            expect(mockExtractDataForEndpoint).toHaveBeenCalledWith(mockData, gameDataHelper.TYPE_GAME_DETAILS)
            expect(sampleRes.status).toHaveBeenCalledWith(OK)
            expect(mockStatusSend.send).toHaveBeenCalledWith(mockFormattedData)
        })

        it('should return a bad request if no gameId is provided', async () => {
            const sampleBadReq = { params: {} }

            await gameDataController.getGameDetails(sampleBadReq, sampleRes)

            expect(sampleRes.sendStatus).toHaveBeenCalledWith(BAD_REQUEST)
        })
    })

    describe('#getGameBoxScore', () => {
        it('should ', async () => {
            await gameDataController.getGameBoxScore(sampleGoodReq, sampleRes)

            expect(mockGetCurrentGameData).toHaveBeenCalledWith(sampleGoodReq.params.gameId)
            expect(mockExtractDataForEndpoint).toHaveBeenCalledWith(mockData, gameDataHelper.TYPE_GAME_BOXSCORE)
            expect(sampleRes.status).toHaveBeenCalledWith(OK)
            expect(mockStatusSend.send).toHaveBeenCalledWith(mockFormattedData)
        })

        it('should return a bad request if no gameId is provided', async () => {
            const sampleBadReq = { params: {} }

            await gameDataController.getGameBoxScore(sampleBadReq, sampleRes)

            expect(sampleRes.sendStatus).toHaveBeenCalledWith(BAD_REQUEST)
        })
    })
})
