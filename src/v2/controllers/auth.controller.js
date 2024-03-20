const authSevice = require("../services/auth.service")

class AuthController {
    static login = (req, res, next) => {
        res.send({
            message: 'login'
        })
    }

     static  register = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await authSevice.register(req.body)
        })
       
    }
}

module.exports = AuthController