const fs = require('node:fs')

const slugify = require('slugify');

const { AuthError } = require('../core/error.response')
const bookModel = require('../model/book.model'); 

class bookService {

   static getAllBook = async () => {
        return await bookModel.find({})        
    }

    static getBook = async ({id}) => {
        return await bookModel.findById(id)
    }

    static addBook = async (bookData) => {
        const newBookData = await bookModel.create(bookData)
        for (const i in bookData.author) {
            await bookModel.findByIdAndUpdate(bookData.book[i], { $push: { author: newBookData.id } })
        }
        return newStudent
    }

    static updateBook = async ({id}, newStudentInfo) => {
        return bookModel.findByIdAndUpdate(id, newStudentInfo, {new:true})
    }

    static deleteBook = async ({id}) => {
        return bookModel.findByIdAndDelete(id)
    }
}

module.exports = bookService;