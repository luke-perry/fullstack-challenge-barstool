const winston = require('winston')

const transport1 = new winston.transports.Console({
    level: 'info',
    colorize: true,
    silent: process.env.NODE_ENV === 'test',
})

const logger = winston.createLogger({
    transports: [transport1],
})

module.exports = logger
