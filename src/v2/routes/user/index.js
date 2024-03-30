const express = require('express')
const router = express.Router()
const { asyncHandle } = require('../../ultils/asyncHandle');
const userController = require('../../controllers/user.controller');
const validateUser = require('../../middleware/validate.user')

router.use(validateUser)
router.post('/:id', asyncHandle(userController.updateUser))
router.delete('/:id', asyncHandle(userController.deleteUser))

module.exports = router

