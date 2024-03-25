const fs = require('node:fs')
const { AuthError } = require('../core/error.response')
const studentModel = require('../model/student.model'); 
const bookModel = require('../model/book.model'); 

class StudentService {
    static getAllStudent = async ({ page = 1, pageSize = 5, age, sortOrder, minAge, maxAge, email, sortField = 'number_of_reports'}) => {
        let queryCondition = {};
        let sortOption = sortOrder === 'desc' ? { [sortField]: -1 } : { [sortField]: 1 };

        if (age) queryCondition.age = { $gt: age };
        if (minAge !== undefined && maxAge !== undefined) {
            queryCondition.age = { $gte: parseInt(minAge), $lte: parseInt(maxAge, 10) };
        }
        if (email) queryCondition.email = email;

        return await studentModel.find(queryCondition)
            .sort(sortOption)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .select()
            .lean()
        
    }

    static getStudent = async ({id}) => {
        return await studentModel.findById(id)
    }

    
    static addStudent = async (studentData) => {
        const newStudent = await studentModel.create(studentData)
        for (const i in studentData.book) {
            await bookModel.findByIdAndUpdate(studentData.book[i], { $push: { student: newStudent.id } })
        }
        return newStudent
    }

    static updateStudent = async ({id}, newStudentInfo) => {
        return studentModel.findByIdAndUpdate(id, newStudentInfo, {new:true})
    }

    static deleteStudent = async ({id}) => {
        const student = await studentModel.findById(id);
        if (!student) {
            throw new Error('Student not found');
        }

        const books = student.book; 

        await studentModel.findByIdAndDelete(id);

        if (books && books.length > 0) {
            for (const bookId of books) {
                await bookModel.findByIdAndUpdate(bookId, {
                    $pull: { student: id }
                });
            }
        }
}
}

module.exports = StudentService;