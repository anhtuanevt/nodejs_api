"use strict"

const express = require('express');
const { asyncHandle } = require('../../utils/asyncHandle');
const rssController = require('../../controllers/rss.controller');
const router = express.Router();

router.get('/', asyncHandle(rssController.getRss))

module.exports = router