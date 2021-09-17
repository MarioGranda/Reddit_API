var RedditApi = require('reddit-oauth');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

function getNewToken(path) {
    console.log('Solicitando un nuevo Token...');

    var appId = process.env.APP_ID;
    var appSecret = process.env.APP_SECRET;
    var redirectUri = process.env.REDIRECT_URI;

    var reddit = new RedditApi({
        app_id: appId,
        app_secret: appSecret,
        redirect_uri: redirectUri,
    });

    var username = process.env.USERNAME;
    var password = process.env.PASSWORD;

    // Authenticate with username/password
    reddit.passAuth(username, 'Young988', function (success) {
        if (success) {
            reddit['date'] = Date.now() / 1000;

            const data = JSON.stringify(reddit, null, '\t');

            process.env['TOKEN'] = reddit.access_token;

            fs.writeFile(`${path}/token.json`, data, (err) => {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });

            console.log(`Nuevo Token: ${reddit.access_token}`);
        }
    });
}

module.exports = { getNewToken };
