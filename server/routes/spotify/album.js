let express = require('express');
let router = express.Router();
const keys = require('../../keys');
const spotifyApi = keys.spotifyApi;

router.get('/byid', (req,res)=>{
    const access_token = req.headers.authorization;
    const albumid   = req.query.albumid;

    spotifyApi.setAccessToken(access_token);
    spotifyApi.getAlbum(albumid).then(
        function(data) {
            res.send(data.body);
        },
        function(err) {
            console.log('Could not get album info!', err.message);
            res.send(null);
        }
    );
});


router.post('/ids', (req,res)=>{
    const data = req.body;
    const access_token = data.access_token;
    const ids   = data.ids;

    spotifyApi.setAccessToken(access_token);

    spotifyApi.getAlbums(ids).then(
        function(data) {
            res.send(data.body);
        },
        function(err) {
            console.log('Could not get Albums!', err.message);
            res.send(null);
        }
    );
});

module.exports = router;
