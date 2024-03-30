const userModel = require("../model/user.model")
const { AuthError } = require('../core/error.response')
const bcrypt = require('bcrypt');

const saltRounds = 10;
var jwt = require('jsonwebtoken');

const group_roleModel = require("../model/group_role");
const tokenModel = require("../model/token.model");

require('dotenv').config();

class authService {
    static createRole = async ({ name, users = []}) => {
        return await group_roleModel.create({name, users})
    }

    static register = async ({ username, password, email, role }) => {
        const findUser = await userModel.findOne({ username })
        if (findUser) throw new AuthError('user existed')
        let hashPassword = bcrypt.hashSync(password, saltRounds)
        
        const newUser = await userModel.create({ username, password: hashPassword, email, role })
        await group_roleModel.findByIdAndUpdate(role, {$push: {users: newUser.id }})
        return newUser;
    };

    static login = async ({ username, password }) => {
        const findUser = await userModel.findOne({ username })
        if (!findUser) throw new AuthError('user not existed')

        let compare = bcrypt.compareSync(password, findUser.password)   
        if (!compare) throw new AuthError('wrong password')
        
        let token = jwt.sign({ userId: findUser.id }, process.env.PRIVATE_KEY , { expiresIn: '1h' });
        await tokenModel.create({token, userId: findUser.id, expiresAt: new Date(Date.now() + 3600000)})
        return {token}
    };

    
}
module.exports = authService