const fs = require('node:fs')

const slugify = require('slugify');

const { AuthError } = require('../core/error.response')
const SubjectModel = require('../databases/subject.model'); 

class SubjectService {

    static addSubject = async (subjectData) => {
        return await SubjectModel.create(subjectData);
    }
}

module.exports = SubjectService;