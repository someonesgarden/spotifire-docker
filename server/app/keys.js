const scopes = [
    'streaming',
    'user-read-birthdate',
    'user-read-email',
    'user-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-library-read',
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-top-read'
];
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
    scope:scopes.join(' '),
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    redirectUri: process.env.SPOTIFY_CALLBACK
});

module.exports = {
    spotifyClientId: process.env.SPOTIFY_ID,
    spotifyClientSecret: process.env.SPOTIFY_SECRET,
    spotifyRedirectUri: process.env.SPOTIFY_CALLBACK,
    spotifyScopes: scopes,
    spotifyApi:spotifyApi,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    twitterConsumerKey:process.env.TWITTER_CONSUMER_KEY,
    twitterConsumerSecret:process.env.TWITTER_CONSUMER_SECRET,
    twitterAccessTokenKey:process.env.TWITTER_ACCESS_TOKEN_KEY,
    twitterAccessTokenSecret:process.env.TWITTER_ACCESS_TOKEN_SECRET,
    // pgUser: process.env.PGUSER,
    // pgHost: process.env.PGHOST,
    // pgDatabase: process.env.PGDATABASE,
    // pgPassword: process.env.PGPASSWORD,
    // pgPort: process.env.PGPORT
    mysqlHost:process.env.MYSQL_HOST,
    mysqlPort:process.env.MYSQL_PORT,
    mysqlDatabase:process.env.MYSQL_DB,
    mysqlUser:process.env.MYSQL_USER,
    mysqlPassword:process.env.MYSQL_PW
};
