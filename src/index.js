"use-strict";

const config = require('./config/config');
const server = require('./server');

const startServer = async () => {
    try {
        await server.run(config);
        console.log(`sentence builder running on ${config.mongo.connectionString} port ${config.serverport}`)
    } catch (exception) {
        console.log("Error starting server :", exception.message);
    }
};
startServer();