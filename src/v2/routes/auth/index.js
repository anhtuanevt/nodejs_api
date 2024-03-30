"use strict"

const express = require('express');
const { asyncHandle } = require('../../ultils/asyncHandle');
const { authController } = require('../../controllers/auth.controller');
const router = express.Router();

router.post('/register', asyncHandle(authController.register))
router.post('/role', asyncHandle(authController.createRole))
router.post('/login', asyncHandle(authController.login))

module.exports = router