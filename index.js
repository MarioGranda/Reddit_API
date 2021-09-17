const datos_empresas = require('./data/empresas.json')
const datos_criptos = require('./data/criptomonedas.json')
const datos_commodities = require('./data/commodities.json')
const { getNewToken } = require('./src/token.js')
const { getAccessReddit, getAccessReddit2 } = require('./src/scrapeData.js')
const { scrapeSubredditCriptos, scrapeSubredditEmpresas, scrapeSubredditCommodities } = require('./src/dataCheck.js')
const tokenInfo = require('./data/token.json')

let posts;
let neednewToken;

async function getToken(path) {
	await getNewToken(path);
}

async function accessReddit(subreddit, _callback) {
	posts = await getAccessReddit(subreddit);
	_callback();
}

async function accessReddit2(subreddit, _callback) {
	posts = await getAccessReddit2(subreddit);
	_callback();
}


if (tokenInfo.date + 3600 >= (Date.now() / 1000)) {

	accessReddit2('wallstreetbets', () => {

	scrapeSubredditEmpresas(datos_empresas, posts, 'empresas');
	scrapeSubredditCriptos(datos_criptos, posts);
	scrapeSubredditCommodities(datos_commodities, posts);

	});

} else {

	getToken(__dirname + '/data').then(() => {
	setTimeout(function () {

	// console.log(process.env.TOKEN);

	accessReddit('wallstreetbets', () => {

	scrapeSubredditEmpresas(datos_empresas, posts, 'empresas');
	scrapeSubredditCriptos(datos_criptos, posts);
	scrapeSubredditCommodities(datos_commodities, posts);

	}); }, 2000);
	});
}
