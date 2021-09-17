const snoowrap = require('snoowrap');
const dotenv = require('dotenv');
dotenv.config();
const rp = require('request-promise');
const fs = require('fs');
const tokenInfo = require('../data/token.json');

let r;

async function getAccessReddit(subreddit) {
	var token = process.env.TOKEN;

	r = new snoowrap({
		accessToken: `${token}`,
		userAgent: 'process.env.USER_AGENT',
		clientId: 'process.env.CLIENT_ID',
		clientSecret: 'process.env.CLIENT_SECRET',
	});

	console.log(`Obteniendo datos del subreddit ${subreddit}...`);

	var posts = await r.getSubreddit(subreddit).getNew().fetchAll({});

	return posts;
}

async function getAccessReddit2(subreddit) {
	var token = process.env.TOKEN;

	r = new snoowrap({
		accessToken: `${tokenInfo.access_token}`,
		userAgent: 'process.env.USER_AGENT',
		clientId: 'process.env.CLIENT_ID',
		clientSecret: 'process.env.CLIENT_SECRET',
	});

	console.log(`Obteniendo datos del subreddit ${subreddit}...`);

	var posts = await r.getSubreddit(subreddit).getNew().fetchAll({});

	return posts;
}

function scrapeCoinMarketCap(method, uri, qs, headers, json) {
	const requestOptions = {
		method: method,
		uri: uri,
		qs: qs,
		headers: headers,
		json: json,
	};

	rp(requestOptions).then((response) => {
		const data = JSON.stringify(response.data, null, '\t');

		fs.writeFile('../data/coinMarketCap.json', data, (err) => {
			if (err) {
				console.log('Error Found:', err);
			}
		});
	});
}

module.exports = { scrapeCoinMarketCap, getAccessReddit, getAccessReddit2 };
