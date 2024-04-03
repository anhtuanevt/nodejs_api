"use strict"

const express = require('express');
const { asyncHandle } = require('../../utils/asyncHandle');
const ItemController = require('../../controllers/item.controller');
const router = express.Router();

router.get('(/:id)?', asyncHandle(ItemController.getItem))

router.post('/', asyncHandle(ItemController.addItem))

router.put('/', asyncHandle(ItemController.updateItem))

router.put('/updateStatus', asyncHandle(ItemController.updateStatus))

router.delete('/delete', asyncHandle(ItemController.deleteItems))

module.exports = router