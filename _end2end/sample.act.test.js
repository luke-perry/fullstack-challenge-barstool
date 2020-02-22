const superRequest = require('supertest')

const { app, server } = require('../server')

describe('/sample', () => {
    beforeEach(() => {
        server.close()
    })

    afterEach(() => {
        server.close()
    })

    describe('/hello', () => {
        it('should return the text body "hello"', async () => {
            jest.setTimeout(10000)

            const response = await superRequest(app).get('/api/v1/sample/hello')

            expect(response.body).toEqual({ message: 'Hello, Luke Skywalker' })
        })
    })
})
