const express = require('express')
const router = express.Router()
const { asyncHandle } = require('../../utils/asyncHandle');
const userController = require('../../controllers/user.controller');
const validateUser = require('../../middleware/validate.user')
const {upload} = require('../../utils/uploadHandle')

router.use(validateUser)
router.get('/:id', asyncHandle(userController.updateUser))
router.get('/', asyncHandle(userController.updateUser))
router.put('/:id', asyncHandle(userController.updateUser))
router.delete('/:id', asyncHandle(userController.deleteUser))

router.post('/upload-photo', upload.single('file'), asyncHandle(userController.uploadPhoto))
router.post('/upload-photos', upload.array('file'), asyncHandle(userController.uploadPhotos))

module.exports = router

