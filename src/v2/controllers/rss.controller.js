const rssService = require("../services/rss.service");

class rssController {
    static getRss = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await rssService.getRss()
        })
    }

    static getRssBySlug = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await rssService.getRssBySlug(req.params)
        })
    }
    
    static getGoldPrice = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await rssService.getGoldPrice()
        })
    }

    static getBitcoinPrice = async (req, res, next) => {
        res.send({
            message: 'success',
            metadata: await rssService.getBitcoinPrice()
        })
    }
}
module.exports = rssController;