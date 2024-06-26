const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'users'

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
         validate: {
            validator: function(email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
    avatar: {
        type: String
    },
    photos: {
        type: [String]
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'group_permissions'
    }, 
    resetPassword: {
        type: String
    },
    resetPasswordExpired: {
        type: Date
    },
}, { timestamps: true });

module.exports = model(COLLECTION_NAME, userSchema)
 

