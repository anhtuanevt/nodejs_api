const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'subjects'

const subjectSchema = new Schema({
    name: {
        type: String,
        enum: ['toan', 'ly', 'hoa', 'sinh'],
    }
}, { timestamps: true });

module.exports = model(COLLECTION_NAME, subjectSchema)
 

