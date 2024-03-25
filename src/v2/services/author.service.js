const fs = require('node:fs')
const { AuthError } = require('../core/error.response')
const AuthorModel = require('../model/author.model'); 
const bookModel = require('../model/book.model'); 

class AuthorService {
    static getAllAuthor = async () => {
        return await AuthorModel.find({})
    }

    static getAuthor = async ({id}) => {
        return await AuthorModel.findById(id)
    }

    
    static addAuthor = async (AuthorData) => {
        return newAuthor = await AuthorModel.create(AuthorData)
    }

    static updateAuthor = async ({id}, newAuthorInfo) => {
        return AuthorModel.findByIdAndUpdate(id, newAuthorInfo, {new:true})
    }

    static deleteAuthor = async ({id}) => {
        const Author = await AuthorModel.findById(id);
        if (!Author) {
            throw new Error('Author not found');
        }

        const books = Author.book; 

        await AuthorModel.findByIdAndDelete(id);

        if (books && books.length > 0) {
            for (const bookId of books) {
                await bookModel.findByIdAndUpdate(bookId, {
                    $pull: { Authors: id }
                });
            }
        }
}
}

module.exports = AuthorService;