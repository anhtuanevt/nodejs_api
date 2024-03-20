const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'students'

const studentSchema = new Schema({
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
    major: {
        type: String,
    },
    title: {
        type: String,
        enum: ['quan li', 'hoc sinh'],
        default: 'hoc sinh',
    },
    number_of_reports: {
        type: Number,  
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'subjects'
    }
    
}, { timestamps: true });

module.exports = model(COLLECTION_NAME, studentSchema)
 

