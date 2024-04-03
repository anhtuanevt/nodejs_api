"use strict"

const express = require('express');
const { asyncHandle } = require('../../utils/asyncHandle');
const AuthorController = require('../../controllers/author.controller');
const router = express.Router();

router.get('/', asyncHandle(AuthorController.getAllAuthor))
router.get('/:id', asyncHandle(AuthorController.getAuthor))
router.post('/', asyncHandle(AuthorController.addSAuthor))
router.put('/:id', asyncHandle(AuthorController.updateAuthor))
router.delete('/:id', asyncHandle(AuthorController.deleteAuthor))

module.exports = router