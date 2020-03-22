const axios = require('axios')

const remoteData = require('../remote-data-retrieval')

describe('remote-data-retrevial-adapter', () => {
    describe('#retrieveGameData', () => {
        it('should retrieve game data from the remote source for a given game id', async () => {
            const sampleGameId = 'game123'
            const sampleGameData = { league: 'NBA' }
            const axiosMock = jest.spyOn(axios, 'request').mockResolvedValue({ data: sampleGameData })

            const result = await remoteData.retrieveGameData(sampleGameId)

            expect(axiosMock).toHaveBeenCalled()
            expect(result).toEqual(sampleGameData)
        })
    })
})
