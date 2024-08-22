const config = require('../config/config')
const Vonage = require('@vonage/server-sdk')

// Inizializzazione del client Vonage
const vonage = new Vonage({
  apiKey: config.vonageApiKey,
  apiSecret: config.vonageApiSecret,
})

module.exports = vonage