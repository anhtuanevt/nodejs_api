const authService = require("../services/auth.service")

class authController {

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

    static resetPassword = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await authService.resetPassword(req.body)
        })
    }

    static resetPasswordWithToken = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await authService.resetPasswordWithToken(req.params, req.body)
        })
    }
    
}
module.exports = {
    authController
}