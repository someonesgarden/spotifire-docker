const state = {
    labels:     ['Acousticness', 'Dance', 'Energy', 'Instrumental', 'Liveness', 'Speechiness', 'Valence'],
    music_keys: ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
    backgroundColors: [
        [
            'rgba(219,128,115,0.78)',
            'rgba(240,69,37,0.81)',
            'rgba(212,26,114,0.82)',
            'rgba(237,14,230,0.8)',
            'rgba(121,31,205,0.82)',
            'rgba(92,68,219,0.84)',
            'rgba(52,115,240,0.84)',
            'rgba(112,212,191,0.87)',
            'rgba(89,237,110,0.86)',
            'rgba(195,205,56,0.9)'
        ]
    ],
    pichart:{
        options: {
            segmentShowStroke: false
        }
    },
    dummy_feature:{
        acousticness:0.0353,
        danceability:0.367,
        duration_ms:520787,
        energy:0.452,
        id:"54X78diSLoUDI3joC2bjMz",
        instrumentalness:0.00228,
        key:10,
        liveness:0.689,
        loudness:-10.422,
        mode:1,
        speechiness:0.0307,
        tempo:113.066,
        time_signature:4,
        valence:0.189
    },

    dummy_artists:[
        '5a2EaR3hamoenG9rDuVn8j',
        '1JWciWrGdCTOWeycrjFWpS',
        '1tHvPvP6tKa8f5pqFGZlwc',
        '1u1NJZJgYCF6BVsjSYf2BM',
        '0LA2C0Cbh1jk7lDtQiTehi',
        '46njgd2Rq9tZc4ZjeQMgbh',
        '14pIl60LfvAB2XMdsDEaqj',
        '2DWQX92uew7DlsgN0yD775',
        '23lU8pO25FzfMgbRBycuvX',
        '0hirZ8kPPdM9pzXpoagB4w',
        '3fMbdgg4jU18AjLCKBhRSm'
    ]
    ,

    dummy_tracks:[
        '1kiNatIrwDusOZfR29W0LJ',
        '0iXYLrcgvd9u6ATFMIHMpD',
        '6KUQAS2Yt1aox87ShO9AEF',
        '37BTh5g05cxBIRYMbw8g2T',
        '0JkIKoYQxceiRZFtKg5IfE',
        '3ucjvgYOugg2lkWkMPO30K',
        '0DEwNI2DgasX1eprqCivJk',
        '31eRoXycToZ14VRwnmCQBJ',
        '0wFgASSasKTBiKbvGuHVVC',
        '5IuHbX6e1Uk2hrOqFKRM7D'
    ],

    dummy_genres:[
        "alternative",
        "bossanova",
        "brazil",
        "dance",
        "disco",
        "electro",
        "electronic",
        "funk",
        "hip-hop",
        "house",
        "indie",
        "indie-pop",
        "j-dance",
        "j-idol",
        "j-pop",
        "j-rock",
        "jazz",
        "pop",
        "punk",
        "rock",
        "ska",
        "soul",
        "tango",
        "techno",
        "world-music"
    ]
}


const mutations = {
}

export default {
    state,
    mutations
}
