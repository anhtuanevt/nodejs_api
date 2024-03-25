const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'author'

const authorSchema = new Schema({
    name: {
        type: String
    },
    age: {
        type: Number,
        integer: true,
    },
    email: {
        type: String,
        validate: {
            validator: function(email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
    book: [
            {
            type: Schema.Types.ObjectId,
            ref: 'books'
        } ]
}, { timestamps: true });

module.exports = model(COLLECTION_NAME, authorSchema)
 

