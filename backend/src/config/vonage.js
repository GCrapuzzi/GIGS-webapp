/**
 * Configures the Vonage SDK used to deliver OTP codes via SMS.
 */
const config = require('./config');
const { Vonage } = require('@vonage/server-sdk');

const vonage = new Vonage({
  apiKey: config.vonageApiKey,
  apiSecret: config.vonageApiSecret,
});

module.exports = vonage;