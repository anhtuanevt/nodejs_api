const fs = require('node:fs')
const { AuthError } = require('../core/error.response')
const studentModel = require('../databases/student.model'); 
const subjectModel = require('../databases/subject.model'); 

class StudentService {
    static getAllStudent = async ({ page, age, sortOrder, minAge, maxAge, email}) => {
        const pageSize = 5; 
        let queryCondition = {};
        let sortOption = sortOrder === 'desc' ? { number_of_reports: -1 } : { number_of_reports: 1 };

        if (age) {
            queryCondition.age = { $gt: age };
        }
        if (minAge !== undefined && maxAge !== undefined) {
            queryCondition.age = { $gte: parseInt(minAge), $lte: parseInt(maxAge, 10) };
        }
        if (email) {
            queryCondition.email = email;
        }

        return await studentModel.find(queryCondition)
        .sort(sortOption)
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    }

    
    static addStudent = async (studentData) => {
        const subject = await subjectModel.findOne({ name: studentData.subject });

        if (!subject) {
            throw new Error('Subject not found');
        }

        studentData.subject = subject._id;
        return await studentModel.create(studentData);
    }

    static updateStudent = async ({ id, newNumberReports }) => {
        
        return studentModel.findByIdAndUpdate(
            id,
            { $set: { number_of_reports: newNumberReports } }, 
            { new: true } )
    }
}

module.exports = StudentService;