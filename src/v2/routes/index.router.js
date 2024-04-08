"use strict"

const express = require('express');
const router = express.Router();


router.use('/student', require('./student' ))
router.use('/book', require('./book' ))
router.use('/user', require('./user' ))
router.use('/permission', require('./permission'))
router.use('/', require('./auth'))
router.use('/rss', require('./rss'))

module.exports = router;