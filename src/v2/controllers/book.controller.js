const bookService = require("../services/book.service")

class bookController {

   
    static addBook = async(req, res, next) => {
        res.send({
            message: 'success',
            metadata: await bookService.addBook(req.body)
        })
    }

    static getAllBook = async(req, res, next) => {
        res.send({
            message: 'success',
            metadata: await bookService.getAllBook()
        })
    }

    static getBook = async(req, res, next) => {
        res.send({
            message: 'success',
            metadata: await bookService.getBook(req.params)
        })
    }

    static updateBook = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await bookService.updateBook(req.params, req.body)
        })
    }

    static deleteBook = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await bookService.deleteBook(req.params)
        })
    }
}

module.exports = bookController