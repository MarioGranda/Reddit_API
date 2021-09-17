const { scrapeCoinMarketCap } = require("./scrapeData.js");

const method = 'GET';
const uri = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map';
const qs = {
  'start': '1',
  'limit': '5000'
};
const headers = {
  'X-CMC_PRO_API_KEY': 'd8b776b0-1cf7-4f3d-a847-a1c2171ac4f2'
};
const json = true;

scrapeCoinMarketCap(method, uri, qs, headers, json);