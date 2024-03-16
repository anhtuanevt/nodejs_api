"use strict"

const express = require('express');
const { asyncHandle } = require('../../ultils/asyncHandle');
const UserController = require('../../controllers/user.controller');
const router = express.Router();

router.get('/', asyncHandle(UserController.getAllUsers))

module.exports = router