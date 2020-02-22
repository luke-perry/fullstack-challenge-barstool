const axios = require('axios')
const { FAILED_DEPENDENCY } = require('http-status-codes')

const sampleController = require('../sampleController')

describe('sampleController', () => {
    const axiosRequestMock = jest.spyOn(axios, 'request')
    const sampleRes = { send: jest.fn(), sendStatus: jest.fn() }

    describe('hello', () => {
        it('sends a response with text body "hello"', async () => {
            axiosRequestMock.mockResolvedValueOnce({ data: { name: 'Darth Vader' } })

            await sampleController.hello({}, sampleRes)

            expect(axiosRequestMock).toHaveBeenCalledWith({ method: 'get', url: 'https://swapi.co/api/people/1' })
            expect(sampleRes.send).toHaveBeenCalledWith({ message: 'Hello, Darth Vader' })
        })

        it('should handle an error from starwars API', async () => {
            axiosRequestMock.mockRejectedValue()

            await sampleController.hello({}, sampleRes)

            expect(sampleRes.sendStatus).toHaveBeenCalledWith(FAILED_DEPENDENCY)
        })
    })
})
