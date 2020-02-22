const superRequest = require('supertest')
const nock = require('nock')
const { FAILED_DEPENDENCY } = require('http-status-codes')

const { app, server } = require('../server')

describe('/sample', () => {
    beforeEach(() => {
        server.close()
    })

    afterEach(() => {
        server.close()
    })


    describe('/hello', () => {
        it('should handle a failure from the Starwars API', async () => {
            nock('https://swapi.co')
                .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
                .get('/api/people/1')
                .reply(500)

            const response = await superRequest(app).get('/api/v1/sample/hello')

            expect(response.status).toEqual(FAILED_DEPENDENCY)
        })
    })
})
