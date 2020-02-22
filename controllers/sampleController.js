const axios = require('axios')
const { FAILED_DEPENDENCY } = require('http-status-codes')

const hello = async (req, res) => {
    try {
        const starwarsResponse = await axios.request({ method: 'get', url: 'https://swapi.co/api/people/1' })

        const { name } = starwarsResponse.data

        res.send({ message: `Hello, ${name}` })
    } catch (error) {
        res.sendStatus(FAILED_DEPENDENCY)
    }
}

module.exports = {
    hello,
}
