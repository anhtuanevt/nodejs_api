const UserService = require("../services/user.service")

class UserController {
    static getAllUser = async(req, res, next) => {
        res.send({
            message: 'success',
            metadata: UserService.getAllUser
()
        })
    }
}

module.exports = UserController