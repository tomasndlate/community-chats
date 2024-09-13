// const express = require('express');
import express from "express";
// const http = require('http');
import http from "http";
// const cors = require('cors');
import cors from "cors";

// require('dotenv').config();
import dotenv from "dotenv";
dotenv.config()

import { connectMongoDB } from './configs/mongodb.config';
// const passportConfig = require('./configs/passportConfig');
import { logger, expressLogger } from './configs/winston.config';
// const { initOpenAPI } = require('./configs/openapi.config');

// Instance of express application
const expressApp = express();

// Configuration
expressApp.use(cors());
expressApp.use(express.json());
expressApp.use(expressLogger);
connectMongoDB();
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
    // initOpenAPI(expressApp, process.env.API_PORT);
    // Start the server
    // socket(restServer);

    logger.info(`Express Server running on http://localhost:${port}`);
})
