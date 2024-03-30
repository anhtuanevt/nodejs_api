const { Schema, model } = require('mongoose')

const COLLECTION_NAME = 'tokens'

const tokenSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        required: true, 
        ref: 'users' },
    token: { 
        type: String, 
        required: true },
    expiresAt: { type: Date, required: true }
}, { timestamps: true })

module.exports = model(COLLECTION_NAME, tokenSchema)
