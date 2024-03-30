const UserService = require('../services/user.service')

class UserController {
    static updateUser = async (req, res) => {
        res.send({
            message :'success',
            metadata : await UserService.updateUser(req.params, req.body, req.userId)
        })
    }
    static deleteUser = async (req, res) => {
        res.send({
            message :'success',
            metadata : await UserService.deleteUser(req.params, req.userId)
        })
    }
}

module.exports = UserController
