const SubjectService = require("../services/subject.service")

class SubjectController {

   
    static addSubject = async(req, res, next) => {
        res.send({
            message: 'success',
            metadata: await SubjectService.addSubject(req.body)
        })
    }

    
}

module.exports = SubjectController