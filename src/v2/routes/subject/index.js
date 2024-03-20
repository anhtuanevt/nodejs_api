"use strict"

const express = require('express');
const { asyncHandle } = require('../../ultils/asyncHandle');
const SubjectController = require('../../controllers/subject.controller');
const router = express.Router();


router.post('/add', asyncHandle(SubjectController.addSubject))


module.exports = router