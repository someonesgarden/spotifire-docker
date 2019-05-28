let express = require('express');
let router = express.Router();
const keys = require('../../keys');
const spotifyApi = keys.spotifyApi;

// -------------- AUTHENTICATIONS
router.get('/grant', (req,res)=>{
    // one time granting
      spotifyApi.clientCredentialsGrant().then(
        function(data) {
            //console.log(data.body);
          let result = {
              expires_in:data.body['expires_in'],
              access_token:data.body['access_token'],
              refresh_token:data.body['refresh_token']
          };
          // access_tokenはサーバー側ではなくクライアント側で保存すること！
          // そのためREDISに保存する以下の二行は使わない
          // redisClient.hset("spotify",'access_token', data.body['access_token']);
          // redisClient.hset("spotify",'expires_in', data.body['expires_in']);
          res.send(result);
        },
        function(err) {
          res.send("error;"+err.message);
        }
    );
});


router.post('/get_credential', (req,res)=>{
    const data = req.body.data;
    //console.log(req);

    let state = '';
    let length = 40;
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        state += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    let authorizeURL = spotifyApi.createAuthorizeURL(keys.spotifyScopes, state);
    res.send(authorizeURL);
});


router.post('/refresh_credential', (req,res)=>{
    spotifyApi.setAccessToken(req.body['access_token']);
    spotifyApi.setRefreshToken(req.body['refresh_token']);
    spotifyApi.refreshAccessToken().then(
        function(data) {
            res.send({...data.body, refresh_token: req.body['refresh_token']});
        },
        function(err) {
            console.log('Could not refresh the token!', err.message);
            res.redirect('/get_credential');
            res.send(null);
        }
    );
});


module.exports = router;
