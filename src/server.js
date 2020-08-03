const routes = require('./routes/routes');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();


// //Middleware required for us to work with the request body
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const server = config => {
    mongoose.connect(
        config.mongo.connectionString,
        { useNewUrlParser: true },
        (err) => {
            if (err) {
                console.log('error connecting to the database : ' + err.message);
                return;
            }
            console.log('connection to Mongodb established');
            app.listen(config.serverport);
            routes.init(app);
        }
    );
};

module.exports = {
    run: server,
};


