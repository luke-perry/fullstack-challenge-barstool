const mongodb = require('mongodb')

const { calculateAgeOfMongoDocument, extractDataForEndpoint, TYPE_GAME_DETAILS } = require('../game-data')

describe('game-data-helper', () => {
    describe('#calculateAgeOfMongoDocument', () => {
        it('should return "null" if there is no document object provided', () => {
            const ageResult = calculateAgeOfMongoDocument()

            expect(ageResult).toEqual(null)
        })

        it('should return the amount of time (in milli-seconds) since the mongo document was created', () => {
            const now = new Date()
            jest.spyOn(Date, 'now').mockReturnValue(now)

            jest.spyOn(mongodb, 'ObjectId').mockReturnValueOnce({ getTimestamp: () => new Date(now - 60000) })
            const fakeMongoDocumentObject = { _id: '5e6d6fdf88535bf358020833' }

            const expectedAmoutofTimeDifference = 60000

            const ageResult = calculateAgeOfMongoDocument(fakeMongoDocumentObject)

            expect(ageResult).toEqual(expectedAmoutofTimeDifference)
        })
    })

    describe('#extractDataForEndpoint', () => {
        const someData = {
            league: 'data',
            away_team: 'data',
            home_team: 'data',
            away_period_scores: 'data',
            home_period_scores: 'data',
            event_information: 'data',
            officials: 'data',
            away_totals: 'data',
            home_totals: 'data',
            home_stats: 'data',
            away_stats: 'data',
        }

        it('should return the entire game data if no filtering type is provided', () => {
            const formattedData = extractDataForEndpoint(someData)

            expect(formattedData).toEqual(someData)
        })

        it('should return filter the game data if a filtering type is provided', () => {
            const formattedData = extractDataForEndpoint(someData, TYPE_GAME_DETAILS)

            const expectedKeys = ['league', 'away_team', 'home_team', 'away_period_scores', 'home_period_scores', 'event_information', 'officials']
            expect(Object.keys(formattedData)).toEqual(expectedKeys)
        })
    })
})
