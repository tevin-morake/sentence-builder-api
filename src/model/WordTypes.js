'use-strict';

const mongoose = require('mongoose');

const WordTypesSchema = new mongoose.Schema({
  WordTypeID: {
    type: String,
    required: true
  },
  Word: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('WordTypes', WordTypesSchema);