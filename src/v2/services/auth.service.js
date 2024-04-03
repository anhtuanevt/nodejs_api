const userModel = require("../model/user.model")
const { AuthError } = require('../core/error.response')
const bcrypt = require('bcrypt');
const crypto    = require('node:crypto')

const saltRounds = 10;
var jwt = require('jsonwebtoken');

const group_roleModel = require("../model/group_role");
const tokenModel = require("../model/token.model");
const sendEmail = require('../helper/nodemailer')

require('dotenv').config();

class authService {
 
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

    static resetPassword = async ({ username }) => {
        const findUser = await userModel.findOne({ username })
        if (!findUser) throw new AuthError('user not existed')

        let token = crypto.randomBytes(20).toString('hex');
        let expiresAt = Date.now() + 1 * 60 * 1000
        
        await userModel.findByIdAndUpdate(findUser.id, {$set: {resetPassword: token, resetPasswordExpired: expiresAt}})
        let link = `http://localhost:3000/reset-password/${token}`;
        
        sendEmail(link)

        return 'success'
    }

    static resetPasswordWithToken = async ({ token }, { newPassword }) => {
        const findUser = await userModel.findOne({
            resetPassword: token,
            resetPasswordExpired: {
                $gt: Date.now()
            }
        })
        if (!findUser) throw new AuthError('user not existed') 
        let hashPassword = bcrypt.hashSync(newPassword, saltRounds)
        await userModel.findByIdAndUpdate(
            findUser.id, {
                $set: {
                    password: hashPassword,
                    resetPassword: null,
                    resetPasswordExpired: null
                }
            },{new: true})
        return findUser
    }
}
module.exports = authService