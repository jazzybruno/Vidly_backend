const winston = require('winston')
// require('winston-mongodb')
const { level } = require('winston')

module.exports = function() {
    const  logger =   winston.createLogger ({
        transports: [new winston.transports.File({filename: 'logfile.log', level: 'error',    }),
                     new winston.transports.Console({ colorize: true , prettyPrint: true , level: 'error'}),]
    })
    winston.add(logger) 
    // winston.add(new winston.transports.MongoDB({db : 'mongodb://localhost/Vidly'  , level: 'info' }))
    winston.exceptions.handle(new winston.transports.File({ filename: 'logger.log' , level: 'info'}))
     winston.add( new winston.transports.Console({ colorize: true , prettyPrint: true , level: 'error'})),
    process.on('unhandledRejection' , (ex)=>{
      throw ex
      process.exit(1)
    })
    
}