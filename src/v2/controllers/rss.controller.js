const rssService = require("../services/rss.service");

class rssController {
    static getRss = async(req, res, next) => {
            res.send({
                message: 'success',
                metadata: await rssService.getRss()
            })
        }
}

module.exports = rssController;