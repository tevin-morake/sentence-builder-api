'use-strict';
const mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
    Type: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model('Type', TypeSchema);