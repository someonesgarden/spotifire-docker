let express = require('express');
let router = express.Router();
const keys = require('../../keys');
const spotifyApi = keys.spotifyApi;

router.get('/devices', (req,res)=>{
    const access_token = req.headers.authorization;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.getMyDevices().then(
        function(data) {
            res.send(data.body);
        },
        function(err) {
            console.log('Could not get playlist info!', err.message);
            res.send(null);
        }
    );
});


router.post('/play', (req,res)=>{
    const data = req.body;
    const access_token = data.access_token;
    const device_id = data.device_id;
    const trackid = data.trackid;

    spotifyApi.setAccessToken(access_token);
    spotifyApi.play({device_id:device_id, uris:["spotify:track:"+trackid]}).then(
        function(data) {
            res.send(data);
        },
        function(err) {
            console.log('player error', err.message);
            res.send(null);
        }
    );
});

router.get('/pause', (req,res)=>{
    const access_token = req.headers.authorization;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.pause().then(
        function(data) {
            res.send(data.body);
        },
        function(err) {
            console.log('Could not stop player!', err.message);
            res.send(null);
        }
    );
});

module.exports = router;
