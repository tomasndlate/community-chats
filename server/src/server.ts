import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { connectMongoDB } from './configs/mongodb.config';
import { logger, expressLogger } from './configs/winston.config';
import { socketServer } from './sockets/socket'
import { authRouter } from './web/routes/auth.routes';
import { communitiesRouter } from './web/routes/communities.routes';
// const passportConfig = require('./configs/passportConfig');
// const { initOpenAPI } = require('./configs/openapi.config');

// Allow environment variables
dotenv.config()

// Instance of express application
const restfulApi = express();

// Configuration
restfulApi.use(cors());
restfulApi.use(express.json());
restfulApi.use(expressLogger);
connectMongoDB();
// passportConfig.initialize();

// Importing REST Routes and documentation
restfulApi.use('/auth', authRouter);
// expressApp.use('/users', require('./web/routes/users.routes'));
restfulApi.use('/communities', communitiesRouter);

// instance of restfull api
const server = createServer(restfulApi);
// socket within the server
socketServer(server);

const port = process.env.API_PORT;

server.listen(port, () => {
    // Open API Definition
    // initOpenAPI(expressApp, process.env.API_PORT);
    logger.info(`Express Server running on http://localhost:${port}`);
})
