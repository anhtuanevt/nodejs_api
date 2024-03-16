const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Available', 'Unavailable'],
        default: 'Available',
    },
    slug: {
        type: String,
        unique: true,
    },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
 