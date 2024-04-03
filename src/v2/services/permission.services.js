const group_roleModel = require("../model/group_role")

class PermissionService {
    static getAllRole = async () => {
        return await group_roleModel.findAll()
    }

    static createRole = async ({role}) => {
        return await group_roleModel.create({role})
    }

    static updateRole = async(id, updateRole) => {
        return await group_roleModel.findByIdAndUpdate(id, updateRole)
    }

    static deleteRole = async (id) => {
        return await group_roleModel.findByIdAndDelete(id)  
    }
}

module.exports = PermissionService
