"use strict"

const express = require('express');
const { asyncHandle } = require('../../utils/asyncHandle');
const { authController } = require('../../controllers/auth.controller');
const router = express.Router();

router.post('/register', asyncHandle(authController.register))
router.post('/role', asyncHandle(authController.createRole))
router.post('/login', asyncHandle(authController.login))
router.post('/reset-password', asyncHandle(authController.resetPassword))
router.post('/reset-password/:token', asyncHandle(authController.resetPasswordWithToken))

module.exports = router