"use strict"

const express = require('express');
const { asyncHandle } = require('../../utils/asyncHandle');
const rssController = require('../../controllers/rss.controller');
const router = express.Router();

router.get('/gold', asyncHandle(rssController.getGoldPrice))
router.get('/btc', asyncHandle(rssController.getBitcoinPrice))
router.get('/:slug', asyncHandle(rssController.getRssBySlug))

module.exports = router