const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'group_role'

const roleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
}, { timestamps: true },)
    
module.exports = model(COLLECTION_NAME, roleSchema)