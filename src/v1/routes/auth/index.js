"use strict"

const express = require('express');
const AuthController = require('../../controllers/auth.controller');
const { asyncHandle } = require('../../utils/asyncHandle');
const router = express.Router();

router.get('/login', asyncHandle(AuthController.login))
router.post('/register', asyncHandle(AuthController.register))

module.exports = router;