const config = require('config')
module.exports = function () {
    if(!config.get('digitalsign')){
        console.error("FATAL ERROR : The configuration settings are not set")
        process.exit(1)
       }
}