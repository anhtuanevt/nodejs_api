const authService = require("../services/auth.service")

class authController {
    static createRole = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await authService.createRole(req.body)
        })
    }

    static register = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await authService.register(req.body)
        })
    }

    static login = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await authService.login(req.body)
        })
    }
}
module.exports = {
    authController
}