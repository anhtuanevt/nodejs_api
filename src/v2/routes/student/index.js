"use strict"

const express = require('express');
const { asyncHandle } = require('../../ultils/asyncHandle');
const StudentController = require('../../controllers/student.controller');
const router = express.Router();

router.get('/', asyncHandle(StudentController.getAllStudent))
router.post('/add', asyncHandle(StudentController.addStudent))
router.patch('/update', asyncHandle(StudentController.updateStudent))

module.exports = router