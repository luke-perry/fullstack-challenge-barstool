const { MongoClient } = require('mongodb')

const logger = require('../utilties/logger')

const connectToDatastore = async () => {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_URL, MONGO_PORT } = process.env
    const connectionString = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}:${MONGO_PORT}`

    try {
        return MongoClient.connect(connectionString)
    } catch (error) {
        logger.error(`[adapter-data-store | #connectToDatastore] - the following error occured connecting to the datastore: ${error}`)
        throw new Error(error)
    }
}

const disconnectFromDatastore = async (client) => {
    try {
        await client.close()
    } catch (error) {
        logger.error(`[adapter-data-store | #closeConnectionToDatastore] - the following error occured closing the datastore client: ${error}`)
        throw new Error(error)
    }
}

const insertValueIntoDatastoreCollection = async (databaseName, collectionName, dataValue) => {
    const client = await connectToDatastore()

    try {
        await client.db(databaseName).collection(collectionName).insertOne(dataValue)
        await disconnectFromDatastore(client)
    } catch (error) {
        logger.error(`[adapter-data-store | #insertValueIntoDatastoreCollection] - the following error occured inserting into the datastore client: ${error}`)
        await disconnectFromDatastore(client)
        throw new Error(error)
    }
}

const findValueInDatastoreCollection = async (databaseName, collectionName, query) => {
    const client = await connectToDatastore()

    try {
        const searchResult = await client.db(databaseName).collection(collectionName).find(query)
        await disconnectFromDatastore(client)
        return searchResult
    } catch (error) {
        logger.error(`[adapter-data-store | #insertValueIntoDatastoreCollection] - the following error occured inserting into the datastore client: ${error}`)
        await disconnectFromDatastore(client)
        throw new Error(error)
    }
}

const updateValueInDatastoreCollection = async (databaseName, collectionName, filter, newDataValue) => {
    const client = await connectToDatastore()

    try {
        await client.db(databaseName).collection(collectionName).updateOne(filter, newDataValue)
        await disconnectFromDatastore(client)
    } catch (error) {
        logger.error(`[adapter-data-store | #insertValueIntoDatastoreCollection] - the following error occured inserting into the datastore client: ${error}`)
        await disconnectFromDatastore(client)
        throw new Error(error)
    }
}

module.exports = {
    connectToDatastore,
    disconnectFromDatastore,
    insertValueIntoDatastoreCollection,
    findValueInDatastoreCollection,
    updateValueInDatastoreCollection,
}
