let express = require('express');
let router = express.Router();
const keys = require('../../keys');
const spotifyApi = keys.spotifyApi;


router.get('/byid', (req,res)=>{
    const access_token = req.headers.authorization;
    const artistid   = req.query.artistid;

    spotifyApi.setAccessToken(access_token);
    spotifyApi.getArtist(artistid).then(
        function(data) {
            res.send(data.body);
        },
        function(err) {
            console.log('Could not get artist info!', err.message);
            res.send(null);
        }
    );
});

module.exports = router;
