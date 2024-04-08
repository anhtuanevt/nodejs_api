const { Schema, model, Types } = require('mongoose');

const COLLECTION_NAME = 'thegioi_rsses'

const enclosureSchema = new Schema({
    url: String,
    type: String,
    length: Number
});

const rssSchema = new Schema({
    title: String,
    link: String,
    content: String,
    pubDate: Date,
    guid: String,
    enclosure: enclosureSchema,
    contentSnippet: String,
    isoDate: Date
});

const RSS = model(COLLECTION_NAME, rssSchema);

module.exports = RSS;