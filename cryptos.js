const data = require('./data/coinMarketCap.json');
const { scrapeSubredditEmpresas } = require('./src/dataCheck.js');
const { getAccessReddit, getAccessReddit2 } = require('./src/scrapeData.js');
const { getNewToken } = require('./src/token.js');
const { subreddits } = require('./subreddit/crypto.js');
const tokenInfo = require('./data/token.json');

let i;

async function getToken(path) {
    await getNewToken(path);
}

async function firstFunction(_callback) {
    if (i == null) {
        i = 0;
    }

    var posts = await getAccessReddit(subreddits[i]);

    await scrapeSubredditEmpresas(data, posts, 'criptomonedas');

    _callback();
}

async function firstFunction2(_callback) {
    if (i == null) {
        i = 0;
    }

    var posts = await getAccessReddit2(subreddits[i]);

    await scrapeSubredditEmpresas(data, posts, 'criptomonedas');

    _callback();
}

function secondFunction() {
    if (i < subreddits.length || i == null) {
        firstFunction(function () {
            i++;
            secondFunction();
        });
    }
}

function secondFunction2() {
    if (i < subreddits.length || i == null) {
        firstFunction2(function () {
            i++;
            secondFunction2();
        });
    }
}

if (tokenInfo.date + 3600 >= Date.now() / 1000) {
    secondFunction2();
} else {
    getToken(__dirname + '/data').then(() => {
        setTimeout(function () {
            secondFunction();
        }, 2000);
    });
}
