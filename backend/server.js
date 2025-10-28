/**
 * HTTP server entry point.
 * Loads the configured Express app and starts listening on the configured port.
 */
const app = require('./app');
const http = require('http');
const config = require('./src/config/config');

// Create a simple Node.js HTTP server so we can attach sockets in the future if needed.
const server = http.createServer(app);
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
