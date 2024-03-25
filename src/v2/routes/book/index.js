"use strict"

const express = require('express');
const { asyncHandle } = require('../../ultils/asyncHandle');
const bookController = require('../../controllers/book.controller');
const router = express.Router();

router.get('/', asyncHandle(bookController.getAllBook))
router.get('/:id', asyncHandle(bookController.getBook))
router.post('/', asyncHandle(bookController.addBook))
router.put('/:id', asyncHandle(bookController.updateBook))
router.delete('/:id', asyncHandle(bookController.deleteBook))


module.exports = router