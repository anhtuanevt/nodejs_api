const group_roleModel = require('../model/group_role');
const userModel = require('../model/user.model')
const bcrypt = require('bcrypt');
const { upload } = require('../utils/uploadHandle');
const saltRounds   = 10;

class UserService {
    static updateUser = async ({ id }, updateUser, userId) => {     
        const user = await userModel.findById(id)
        if(!user) throw new Error('User not found')

        // check permission
        const userRoleId = await userModel.findById(userId)
        const userRole = await group_roleModel.findById(userRoleId.role)

        if(userRole.name !== 'admin' && userId !== id) throw new Error('Can not update user')
        
        if(updateUser.password){
            updateUser.password = await bcrypt.hash(updateUser.password, saltRounds);
        }

        return await userModel.findByIdAndUpdate(id, updateUser, {new:true})
    }

    static deleteUser = async ({ id }, userId) => {
        const user = await userModel.findById(id)
        if(!user) throw new Error('User not found')

        // check admin permission
        const userRoleId = await userModel.findById(userId)
        const userRole = await group_roleModel.findById(userRoleId.role)
        if(userRole.name !== 'admin') throw new Error('User is not admin')

        await group_roleModel.findByIdAndUpdate(user.role, {$pull : {users : id}})

        return await userModel.findByIdAndDelete(id)
    }

    static uploadPhoto = async (userId, file) => {
        const user = await userModel.findById(userId)
        if(!user) throw new Error('User not found')

        return await userModel.findByIdAndUpdate(userId, {photos: file.filename}, {new:true})
    }

    static uploadPhotos = async (userId, files) => {
        const user = await userModel.findById(userId)
        if(!user) throw new Error('User not found')

        return await userModel.findByIdAndUpdate(userId, {photos: files.map(file => file.filename)}, {new:true})
    }
}

module.exports = UserService

