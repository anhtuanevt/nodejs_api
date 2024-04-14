const Parser = require('rss-parser');
const axios = require('axios')
const fs = require('fs')
const xml2js = require('xml2js');

const rssUrl = 'https://vnexpress.net/rss/';
const goldPriceUrl = "https://sjc.com.vn/xml/tygiavang.xml";
const bitcoinPriceUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json'
let expired_time = 6 * 1000


class rssService {

    static getRssBySlug = async ({ slug }) => {
        let newData = JSON.parse(fs.readFileSync("data.txt"))
        const data_time = newData.time;
        const timeNow = new Date()
        if (timeNow - new Date(data_time) > expired_time) {
            const parser = new Parser();
            const data = await parser.parseURL(`${rssUrl}${slug}`);
            newData = {
                time: new Date(),
                item: data.items
            }
            fs.writeFileSync("data.txt", JSON.stringify(newData))
        }
        return newData;
     }
    
    static getGoldPrice = async () => {
        let newData = JSON.parse(fs.readFileSync("gold.txt"))
        const data_time = newData.time;
        const timeNow = new Date()
        let items 
        if (timeNow - new Date(data_time) > expired_time) {
            const response = await axios.get(goldPriceUrl)
            xml2js.parseString(response.data, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    items = result.root.ratelist[0].city[0].item;
                }
            });
            newData = {
                time: new Date(),
                item: items
            }
            fs.writeFileSync("gold.txt", JSON.stringify(newData))
        }
        return newData;

    }
    
    static getBitcoinPrice = async () => {
        let newData = JSON.parse(fs.readFileSync("gold.txt"))
        const data_time = newData.time;
        const timeNow = new Date()
        let items 
        if (timeNow - new Date(data_time) > expired_time) { 
            const response = await axios.get(bitcoinPriceUrl);
            items = response.data.bpi.USD;
            
            newData = {
                time: new Date(),
                item: items
            }
            fs.writeFileSync("btc.txt", JSON.stringify(newData))
        }
        
       return newData;
    }
}

module.exports = rssService;