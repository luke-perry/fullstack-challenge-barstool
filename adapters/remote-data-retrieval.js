const axios = require('axios')

const retrieveGameData = async (gameId) => {
    const requestOptions = {
        method: 'GET',
        url: `https://chumley.barstoolsports.com/dev/data/games/${gameId}.json`,
    }

    const response = await axios.request(requestOptions)
    return response.data
}

module.exports = {
    retrieveGameData,
}
