'use strict';

const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/../.env'});// when working locally, add {path: __dirname: }

const {
    MONGO_USER,
    MONGO_PWD,
    MONGO_DBNAME,
    MONGO_HOST,
    MONGO_CONN_STRING,
    PORT,
} = process.env;

module.exports = {
    mongo: {
        connectionString: MONGO_CONN_STRING || `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_HOST}/${MONGO_DBNAME}?retryWrites=true&w=majority`
    },
    serverport: PORT || 3003
};