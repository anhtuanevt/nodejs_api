const StudentService = require("../services/student.service")

class StudentController {
    static getAllStudent = async(req, res, next) => {
        res.send({
            message: 'success',
            metadata: await StudentService.getAllStudent(req.query)
        })
    }

    static addStudent = async(req, res, next) => {
        res.send({
            message: 'success',
            metadata: await StudentService.addStudent(req.body)
        })
    }

    static updateStudent = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await StudentService.updateStudent(req.params)
        })
    }
}

module.exports = StudentController