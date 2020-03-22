const superRequest = require('supertest')
const nock = require('nock')
const { FAILED_DEPENDENCY, OK, NOT_FOUND } = require('http-status-codes')
require('jest-extended')

const { app, server } = require('../server')
const sampleGameData = require('../__stubData__/SampleGame.json')

describe('/sample', () => {
    let expectedKeys
    let remoteDataNock

    beforeEach(() => {
        remoteDataNock = nock('https://chumley.barstoolsports.com').defaultReplyHeaders({ 'access-control-allow-origin': '*' })

        server.close()
    })

    afterEach(() => {
        server.close()
    })

    describe('/api/v1/games/data/:gameId', () => {
        it('should return the entire set of game data successfully', async () => {
            expectedKeys = ['league', 'away_team', 'home_team', 'away_period_scores', 'home_period_scores', 'away_stats',
                'home_stats', 'officials', 'event_information', 'away_totals', 'home_totals']

            remoteDataNock.get('/dev/data/games/fakeGameId.json').reply(200, sampleGameData)

            const response = await superRequest(app).get('/api/v1/games/data/fakeGameId')

            expect(response.status).toEqual(OK)
            expect(Object.keys(response.body)).toIncludeAllMembers(expectedKeys)
        })

        it('should return a "Failed Dependency" if it fails to retrieve remote game data', async () => {
            remoteDataNock.get('/dev/data/games/fakeGameId.json').reply(NOT_FOUND)

            const response = await superRequest(app).get('/api/v1/games/data/fakeGameId')

            expect(response.status).toEqual(FAILED_DEPENDENCY)
        })
    })

    describe('/api/v1/games/data/:gameId/details', () => {
        it('should return a details subset of game data successfully', async () => {
            expectedKeys = ['league', 'away_team', 'home_team', 'away_period_scores', 'home_period_scores', 'event_information', 'officials']

            remoteDataNock.get('/dev/data/games/fakeGameId.json').reply(200, sampleGameData)

            const response = await superRequest(app).get('/api/v1/games/data/fakeGameId/details')

            expect(response.status).toEqual(OK)
            expect(Object.keys(response.body).length).toEqual(expectedKeys.length)
            expect(Object.keys(response.body)).toIncludeAllMembers(expectedKeys)
        })
    })

    describe('/api/v1/games/data/:gameId/boxscore', () => {
        it('should return a boxscore subset of game data successfully', async () => {
            expectedKeys = ['away_totals', 'home_totals', 'home_stats', 'away_stats']

            remoteDataNock.get('/dev/data/games/fakeGameId.json').reply(200, sampleGameData)

            const response = await superRequest(app).get('/api/v1/games/data/fakeGameId/boxscore')

            expect(response.status).toEqual(OK)
            expect(Object.keys(response.body).length).toEqual(expectedKeys.length)
            expect(Object.keys(response.body)).toIncludeAllMembers(expectedKeys)
        })
    })
})
