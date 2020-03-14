const { MongoClient } = require('mongodb')
const mockedEnv = require('mocked-env')

const dataStore = require('../data-store')

describe('data-store-adapter', () => {
    const mockCollection = { insertOne: jest.fn(), find: jest.fn(), updateOne: jest.fn() }
    const mockDb = { collection: jest.fn().mockReturnValue(mockCollection) }
    const mockClient = { db: jest.fn().mockReturnValue(mockDb), close: jest.fn() }
    const fakeEnv = { MONGO_USER: 'myUser', MONGO_PASSWORD: 'myPass', MONGO_URL: 'testMongoHost', MONGO_PORT: '999' }

    let mongoConnectionMock
    let restoreProcessEnv

    beforeEach(() => {
        mongoConnectionMock = jest.spyOn(MongoClient, 'connect').mockResolvedValueOnce(mockClient)
        restoreProcessEnv = mockedEnv(fakeEnv)
    })

    afterEach(() => {
        restoreProcessEnv()
    })

    describe('#connectToDatastore', () => {
        it('should create a datastore connection and return the default database', async () => {
            const expectedConnectionString = `mongodb://${fakeEnv.MONGO_USER}:${fakeEnv.MONGO_PASSWORD}@${fakeEnv.MONGO_URL}:${fakeEnv.MONGO_PORT}`

            const connectionResult = await dataStore.connectToDatastore()

            expect(mongoConnectionMock).toHaveBeenCalledWith(expectedConnectionString)
            expect(connectionResult).toEqual(mockClient)
        })
    })

    describe('#disconnectFromDatastore', () => {
        it('should close the connection on the provided client', async () => {
            await dataStore.disconnectFromDatastore(mockClient)

            expect(mockClient.close).toHaveBeenCalled()
        })
    })

    describe('#insertValueIntoDatastoreCollection', () => {
        it('should write an object into the datastore specified collection', async () => {
            const sampleData = { myData: 'fancy' }

            await dataStore.insertValueIntoDatastoreCollection('sampleDb', 'sampleCollection', sampleData)

            expect(mongoConnectionMock).toHaveBeenCalled()
            expect(mockCollection.insertOne).toHaveBeenCalledWith(sampleData)
        })
    })

    describe('#findValueInDatastoreCollection', () => {
        it('should write an object into the datastore specified collection', async () => {
            const sampleQuery = { myData: 'newFancy' }

            await dataStore.findValueInDatastoreCollection('sampleDb', 'sampleCollection', sampleQuery)

            expect(mongoConnectionMock).toHaveBeenCalled()
            expect(mockCollection.find).toHaveBeenCalledWith(sampleQuery)
        })
    })

    describe('#updateValueInDatastoreCollection', () => {
        it('should write an object into the datastore specified collection', async () => {
            const sampleQuery = { myData: 'fancy' }
            const sampleDataForUpdate = { myData: 'myNewfancy' }

            await dataStore.updateValueInDatastoreCollection('sampleDb', 'sampleCollection', sampleQuery, sampleDataForUpdate)

            expect(mongoConnectionMock).toHaveBeenCalled()
            expect(mockCollection.updateOne).toHaveBeenCalledWith(sampleQuery, sampleDataForUpdate)
        })
    })
})

// TODO: thoughts sad path, logs stuff, closing connection
