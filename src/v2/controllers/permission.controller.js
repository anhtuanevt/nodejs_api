const permissionService = require("../services/permission.services")

class permissionController {
    static createRole = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await permissionService.createRole(req.body)
        })
    }

    
    static getAllRole = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await permissionService.getAllRole()
        })
    }

    static updateRole = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await permissionService.updateRole(req.params.id, req.body)
        })
    }

    static deleteRole = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await permissionService.deleteRole(req.params.id)
        })
    }
    
}
module.exports = permissionController;