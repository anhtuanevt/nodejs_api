"use strict"

const express = require('express');
const { asyncHandle } = require('../../ultils/asyncHandle');
const StudentController = require('../../controllers/student.controller');
const router = express.Router();

router.get('/', asyncHandle(StudentController.getAllStudent))
router.get('/:id', asyncHandle(StudentController.getStudent))
router.post('/', asyncHandle(StudentController.addStudent))
router.put('/:id', asyncHandle(StudentController.updateStudent))
router.delete('/:id', asyncHandle(StudentController.deleteStudent))

module.exports = router