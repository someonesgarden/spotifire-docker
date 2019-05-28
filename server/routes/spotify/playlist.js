let express = require('express');
let router = express.Router();
const keys = require('../../keys');
const spotifyApi = keys.spotifyApi;


router.get('/byid', (req,res)=>{
    const access_token = req.headers.authorization;
    const playlistid   = req.query.playlistid;

    spotifyApi.setAccessToken(access_token);
    spotifyApi.getPlaylist(playlistid).then(
        function(data) {
            res.send(data.body);
        },
        function(err) {
            console.log('Could not get playlist info!', err.message);
            res.send(null);
        }
    );
});

module.exports = router;
