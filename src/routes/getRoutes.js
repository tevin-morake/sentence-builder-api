'use-strict';

const express = require('express');
const router = express.Router();

const { GetWordTypes } = require('./../controllers/wordTypesController');
const { GetTypes } = require('./../controllers/typesController');
const { GetSentences } = require('./../controllers/sentenceController');

router.get('/wordtypes/:wordtypeid', GetWordTypes);
router.get('/types', GetTypes);
router.get('/sentences', GetSentences);

module.exports = router;