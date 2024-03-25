const AuthorService = require("../services/author.service")

class StudentController {
    static getAllAuthor = async(req, res, next) => {
        res.send({
            message: 'success',
            metadata: await AuthorService.getAllStudent(req.query)
        })
    }

    static getAuthor = async(req, res, next) => {
        res.send({
            message: 'success',
            metadata: await AuthorService.getStudent(req.params)
        })
    }

    static addStudent = async(req, res, next) => {
        res.send({
            message: 'success',
            metadata: await AuthorService.addStudent(req.body)
        })
    }

    static updateStudent = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await AuthorService.updateStudent(req.params, req.body)
        })
    }

    static deleteStudent = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await AuthorService.deleteStudent(req.params)
        })
    }
}

module.exports = AuthorController