"use strict"

const express = require('express');
const router = express.Router();

router.use('/student', require('./student' ))
router.use('/book', require('./book' ))
router.use('/user', require('./user' ))
router.use('/', require('./auth'))

module.exports = router;