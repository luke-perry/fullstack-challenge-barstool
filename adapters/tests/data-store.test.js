/* eslint-disable jest/no-test-callback */
/* eslint-disable jest/no-try-expect */

const { MongoClient } = require('mongodb')
const mockedEnv = require('mocked-env')

const dataStore = require('../data-store')

describe('data-store-adapter', () => {
    const fakeEnv = { MONGO_USER: 'myUser', MONGO_PASSWORD: 'myPass', MONGO_URL: 'testMongoHost', MONGO_PORT: '999' }

    let mockCollection
    let mockDb
    let mockClient
    let mongoConnectionMock
    let restoreProcessEnvFromMockToOriginalValues

    beforeEach(() => {
        mockCollection = { insertOne: jest.fn(), findOne: jest.fn(), updateOne: jest.fn() }
        mockDb = { collection: jest.fn().mockReturnValue(mockCollection) }
        mockClient = { db: jest.fn().mockReturnValue(mockDb), close: jest.fn() }
        mongoConnectionMock = jest.spyOn(MongoClient, 'connect').mockResolvedValueOnce(mockClient)

        restoreProcessEnvFromMockToOriginalValues = mockedEnv(fakeEnv)
    })

    afterEach(() => {
        restoreProcessEnvFromMockToOriginalValues()
    })

    describe('#connectToDatastore', () => {
        it('should create a datastore connection and return the default database', async () => {
            const expectedConnectionString = `mongodb://${fakeEnv.MONGO_USER}:${fakeEnv.MONGO_PASSWORD}@${fakeEnv.MONGO_URL}:${fakeEnv.MONGO_PORT}`

            const connectionResult = await dataStore.connectToDatastore()

            expect(mongoConnectionMock).toHaveBeenCalledWith(expectedConnectionString, { useUnifiedTopology: true })
            expect(connectionResult).toEqual(mockClient)
        })

        it('should throw an error if the datastore connection calls fails', async () => {
            mongoConnectionMock.mockReset()
            mongoConnectionMock = jest.spyOn(MongoClient, 'connect').mockRejectedValue('error')

            await expect(dataStore.connectToDatastore()).rejects.toThrow('error')
        })
    })

    describe('#disconnectFromDatastore', () => {
        it('should close the connection on the provided client', async () => {
            await dataStore.disconnectFromDatastore(mockClient)

            expect(mockClient.close).toHaveBeenCalled()
        })

        it('should throw an error if the datastore close call fails', async () => {
            mockClient.close.mockImplementation(() => { throw new Error('error') })

            await expect(dataStore.disconnectFromDatastore(mockClient)).rejects.toThrow('error')
        })
    })

    describe('#insertValueIntoDatastoreCollection', () => {
        it('should write an object into the datastore specified collection', async () => {
            const sampleData = { myData: 'fancy' }

            await dataStore.insertValueIntoDatastoreCollection('sampleDb', 'sampleCollection', sampleData)

            expect(mongoConnectionMock).toHaveBeenCalled()
            expect(mockCollection.insertOne).toHaveBeenCalledWith(sampleData)
            expect(mockClient.close).toHaveBeenCalled()
        })

        describe('sad path', () => {
            it('should disconnect from the datastore even if there is an error in insert', async (done) => {
                mockClient.db = jest.fn().mockImplementation(() => { throw new Error() })

                try {
                    await dataStore.insertValueIntoDatastoreCollection('sampleDb', 'sampleCollection', {})
                    done.fail('expected an error to have been thrown')
                } catch (error) {
                    expect(mockClient.close).toHaveBeenCalled()
                }

                done()
            })
        })
    })

    describe('#findValueInDatastoreCollection', () => {
        it('should write an object into the datastore specified collection', async () => {
            const sampleQuery = { myData: 'newFancy' }

            await dataStore.findValueInDatastoreCollection('sampleDb', 'sampleCollection', sampleQuery)

            expect(mongoConnectionMock).toHaveBeenCalled()
            expect(mockCollection.findOne).toHaveBeenCalledWith(sampleQuery)
            expect(mockClient.close).toHaveBeenCalled()
        })

        describe('sad path', () => {
            it('should disconnect from the datastore even if there is an error', async (done) => {
                mockClient.db = jest.fn().mockImplementation(() => { throw new Error() })

                try {
                    await dataStore.findValueInDatastoreCollection('sampleDb', 'sampleCollection', {})
                    done.fail('expected an error to have been thrown')
                } catch (error) {
                    expect(mockClient.close).toHaveBeenCalled()
                }

                done()
            })
        })
    })

    describe('#updateValueInDatastoreCollection', () => {
        it('should update an object into the datastore specified collection', async () => {
            const sampleQuery = { myData: 'fancy' }
            const sampleDataForUpdate = { myData: 'myNewfancy' }

            await dataStore.updateValueInDatastoreCollection('sampleDb', 'sampleCollection', sampleQuery, sampleDataForUpdate)

            expect(mongoConnectionMock).toHaveBeenCalled()
            expect(mockCollection.updateOne).toHaveBeenCalledWith(sampleQuery, sampleDataForUpdate)
            expect(mockClient.close).toHaveBeenCalled()
        })

        describe('sad path', () => {
            it('should disconnect from the datastore even if there is an error in update', async (done) => {
                mockClient.db = jest.fn().mockImplementation(() => { throw new Error() })

                try {
                    await dataStore.updateValueInDatastoreCollection('sampleDb', 'sampleCollection', {}, {})
                    done.fail('expected an error to have been thrown')
                } catch (error) {
                    expect(mockClient.close).toHaveBeenCalled()
                }

                done()
            })
        })
    })
})
