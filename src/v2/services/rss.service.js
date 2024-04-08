const Parser = require('rss-parser');
const rssUrl = 'https://vnexpress.net/rss/the-gioi.rss';
const rssModel = require('../model/thegioi_rss.model')
class rssService {
    static getRss = async () => {
    const parser = new Parser();
    const data = await parser.parseURL(rssUrl);
    // return data.items[0]
    for (const item of data.items) {
        await rssModel.create(item)
    }
    return 'success';
    }
}

module.exports = rssService;