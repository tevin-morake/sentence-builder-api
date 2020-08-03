'use strict';

const express = require('express');
const router = express.Router();

const { PostWordType, PostWordTypes } = require('./../controllers/wordTypesController');
const { PostType, PostTypes } = require('./../controllers/typesController');
const { PostSentence } = require('./../controllers/sentenceController');

router.post('/wordtype', PostWordType);
router.post('/wordtypes', PostWordTypes);
router.post('/type', PostType);
router.post('/types', PostTypes);
router.post('/sentence', PostSentence);

module.exports = router;