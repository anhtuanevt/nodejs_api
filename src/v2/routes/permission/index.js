const express = require('express');
const router = express.Router();

const { asyncHandle } = require('../../utils/asyncHandle');
const permissionController = require('../../controllers/permission.controller');

router.get('/', asyncHandle(permissionController.getAllRole))
router.post('/', asyncHandle(permissionController.createRole))
router.put('/:id', asyncHandle(permissionController.updateRole))
router.delete('/:id', asyncHandle(permissionController.deleteRole))

module.exports = router;

