'use-strict';

const mongoose = require('mongoose');

const sentenceSchema = new mongoose.Schema({
    Sentence: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Sentence', sentenceSchema);