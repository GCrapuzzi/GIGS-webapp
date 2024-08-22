const dotenv = require('dotenv');
dotenv.config();

// Configurazione delle variabili d'ambiente
const config = {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    mongoUsername: process.env.MONGO_INITDB_ROOT_USERNAME,
    mongoPassword: process.env.MONGO_INITDB_ROOT_PASSWORD,
    jwtSecret: process.env.JWT_SECRET,
    frontendURL: process.env.FRONTEND_URL,
    vonageApiKey: process.env.VONAGE_API_KEY,
    vonageApiSecret: process.env.VONAGE_API_SECRET,
};

module.exports = config;
