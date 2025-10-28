/**
 * Loads environment variables and exposes a typed configuration object for the backend.
 */
const dotenv = require('dotenv');
dotenv.config();

// Centralized configuration getters to avoid touching process.env outside this module.
const config = {
    mongoURI: process.env.MONGO_URI,
    mongoUsername: process.env.MONGO_INITDB_ROOT_USERNAME,
    mongoPassword: process.env.MONGO_INITDB_ROOT_PASSWORD,
    port: process.env.PORT,
    frontendURL: process.env.FRONTEND_URL,
    jwtSecret: process.env.JWT_SECRET,
    vonageApiKey: process.env.VONAGE_API_KEY,
    vonageApiSecret: process.env.VONAGE_API_SECRET,
};

module.exports = config;
