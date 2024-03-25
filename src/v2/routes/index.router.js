"use strict"

const express = require('express');
const router = express.Router();

router.use('/student', require('./student' ))
router.use('/book', require('./book' ))

module.exports = router;