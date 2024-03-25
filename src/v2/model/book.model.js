const { Schema, model, Types } = require('mongoose');

const COLLECTION_NAME = 'books'

const bookSchema = new Schema({
    name: String,
    student: [
        {
            type: Types.ObjectId,
            ref: "students"
        }],
    author: {
       type: Types.ObjectId,
        ref: "books"
    }
},
    { timestamps: true });

module.exports = model(COLLECTION_NAME, bookSchema)
 

