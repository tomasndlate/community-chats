const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv').config();
const mongodbConfig = require('./configs/mongodbConfig');
// const passportConfig = require('./configs/passportConfig');
const { logger, expressLogger } = require('./configs/winstonConfig');
const { initOpenAPI } = require('./configs/openapi.config');

// Instance of express application
const expressApp = express();

// Configuration
expressApp.use(cors());
expressApp.use(express.json());
expressApp.use(expressLogger);
mongodbConfig.connect();
// passportConfig.initialize();

// Importing REST Routes and documentation
expressApp.use('/auth', require('./web/routes/auth.routes'));
// expressApp.use('/users', require('./web/routes/users.routes'));
// expressApp.use('/communities', require('./web/routes/communities.routes'));

// Instance of server using express application
const restServer = http.createServer(expressApp);
// const socket = require('./sockets/socket');

const port = process.env.API_PORT;
restServer.listen(port, () => {
    // Open API Definition
    initOpenAPI(expressApp, process.env.API_PORT);
    // Start the server
    // socket(restServer);

    logger.info(`Express Server running on http://localhost:${port}`);
})
