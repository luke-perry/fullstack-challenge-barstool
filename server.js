const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const router = require('./router')
const logger = require('./utilties/logger')

const app = express()
const port = 3001

app.use(cookieParser())
app.use(morgan('dev'))

const server = app.listen(port, () => logger.info(`Application listening on port ${port}!`))

app.use('/api/v1/', router)

module.exports = {
    app,
    server,
}
