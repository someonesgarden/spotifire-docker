let express = require('express');
let router = express.Router();
const keys = require('../../keys');
const spotifyApi = keys.spotifyApi;


router.get('/idcheck', (req,res)=>{

    console.log("here is /idcheck");
    const access_token = req.headers.authorization;
    const anyid   = req.query.anyid;
    spotifyApi.setAccessToken(access_token);
    let p1 = spotifyApi.getAlbum(anyid);
    let p2 = spotifyApi.getPlaylist(anyid);

    spotifyApi.getPlaylist(anyid).then((ok1)=>{ res.send(ok1)},
        (no1)=>{
            spotifyApi.getTrack(anyid).then((ok2)=>{res.send(ok2)},
                (no2)=>{
                    spotifyApi.getAlbum(anyid).then((ok3)=>{res.send(ok3)},
                        (no3)=>{
                            spotifyApi.getArtist(anyid).then((ok4)=>{res.send(ok4)},
                                (no4)=>{
                                    res.send('');
                                })
                        })
                })
        })
});

router.post('/search', (req,res)=>{
    const data = req.body;
    const access_token = data.access_token;
    const conditions   = data.conditions;

    spotifyApi.setAccessToken(access_token);
    spotifyApi.search(conditions.term, conditions.datatypes, { limit : conditions.limit, offset : conditions.offset }).then(
        function(data) {
            res.send(data.body);
        },
        function(err) {
            console.log('Could not refresh the token!', err.message);
            res.send(null);
        }
    );
});


router.post('/recommendations', (req,res)=>{
    const data = req.body;
    const access_token = data.access_token;
    const queries   = data.queries ? data.queries : { min_energy: 0.4, seed_artists: ['4og9jrin5xH5JiFPbeGUPb', '6l3HvQ5sa6mXTsMTB19rO5'], min_popularity: 10 };

    console.log(queries);

    spotifyApi.setAccessToken(access_token);
    spotifyApi.getRecommendations(queries).then(
        function(data) {
            res.send(data.body);
        },
        function(err) {
            console.log(err.message);
            res.send(null);
        }
    );
});


module.exports = router;
