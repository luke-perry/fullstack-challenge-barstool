// most mongo mocking requires too much overhead for the lightweight testing needed here
// fine for this simple implementation, but not really a scalable mocking solution

const simulateNetworkDelay = () => new Promise((resolve) => setTimeout(resolve, 75))

const fakeDataStore = {}

const mockCollection = {
    insertOne: async () => { await simulateNetworkDelay() },
    findOne: async (lookupId) => { await simulateNetworkDelay(); return fakeDataStore[lookupId] },
    updateOne: async () => { await simulateNetworkDelay() },
}

const mockDb = {
    collection: () => (mockCollection),
}

const mockClient = {
    db: () => (mockDb),
    close: async () => ({}),
}

const stupidlySimpleMongoMock = {
    MongoClient: {
        connect: async () => (mockClient),
    },
    ObjectId: () => ({
        getTimestamp: () => (new Date().toISOString()),
    }),
    mockSeed: (seedData, seedDataId) => { fakeDataStore[seedDataId] = seedData },
}

module.exports = stupidlySimpleMongoMock
