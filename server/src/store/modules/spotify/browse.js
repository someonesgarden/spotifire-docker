const state = {
    searchResNum:0,
    searchQuery:{
        term: 'Prince',
        datatypes: ['playlist'],
        limit: 30,
        offset:0,
        id:'2oKgQmWLlAgCqw0YD8SvEg'
    },

    gen:{
        limit:100,
        num: 0,
        isActive: true,
        popularity: 35,
        country: 'US',

        val: {
            acousticness: 0.123,
            danceability: 0.234,
            energy: 1.0,
            instrumentalness: 0.456,
            liveness: 0.567,
            speechiness: 0.843,
            valence: 0.222,
            key: 1,
            loudness: -1,
            mode: 0,
            tempo: 123,
            popularity:null,
            market:'JP'
        },

        seeds: [
            {
                type: 'ARTIST',
                id: '4og9jrin5xH5JiFPbeGUPb'
            },
            {
                type: 'ARTIST',
                id: '6l3HvQ5sa6mXTsMTB19rO5'
            },
            {
                type: 'GENRE',
                id: 'dance'
            },
            {
                type: 'GENRE',
                id: 'disco'
            },
            {
                type: 'GENRE',
                id: 'club'
            }
        ],

        range: {
            acousticness: 'target',
            danceability: 'target',
            energy: 'target',
            instrumentalness: 'target',
            liveness: '',
            speechiness: '',
            valence: 'target',
            key: '',
            loudness: 'target',
            mode: 'target',
            tempo: 'target',
            popularity: 'min',
            market: true
        },

        range_types:[
            { value: 'target', text: 'target' },
            { value: 'min', text: 'min' },
            { value: 'max',text: 'max' },
            { value: 'gp001',text: '±0.01' },
            { value: 'gp005',text: '±0.05' },
            { value: 'gp010',text: '±0.10' },
            { value: 'gp100',text: '±1' },
            { value: 'gp200',text: '±2' },
            { value: 'gp500',text: '±5' },
            { value: 'gp800',text: '±8' },
            { value: '',text: '' }
        ],
    },
    genres: [
        "",
        "acoustic",
        "afrobeat",
        "alt-rock",
        "alternative",
        "ambient",
        "anime",
        "black-metal",
        "bluegrass",
        "blues",
        "bossanova",
        "brazil",
        "breakbeat",
        "british",
        "cantopop",
        "chicago-house",
        "children",
        "chill",
        "classical",
        "club",
        "comedy",
        "country",
        "dance",
        "dancehall",
        "death-metal",
        "deep-house",
        "detroit-techno",
        "disco",
        "disney",
        "drum-and-bass",
        "dub",
        "dubstep",
        "edm",
        "electro",
        "electronic",
        "emo",
        "folk",
        "forro",
        "french",
        "funk",
        "garage",
        "german",
        "gospel",
        "goth",
        "grindcore",
        "groove",
        "grunge",
        "guitar",
        "happy",
        "hard-rock",
        "hardcore",
        "hardstyle",
        "heavy-metal",
        "hip-hop",
        "holidays",
        "honky-tonk",
        "house",
        "idm",
        "indian",
        "indie",
        "indie-pop",
        "industrial",
        "iranian",
        "j-dance",
        "j-idol",
        "j-pop",
        "j-rock",
        "jazz",
        "k-pop",
        "kids",
        "latin",
        "latino",
        "malay",
        "mandopop",
        "metal",
        "metal-misc",
        "metalcore",
        "minimal-techno",
        "movies",
        "mpb",
        "new-age",
        "new-release",
        "opera",
        "pagode",
        "party",
        "philippines-opm",
        "piano",
        "pop",
        "pop-film",
        "post-dubstep",
        "power-pop",
        "progressive-house",
        "psych-rock",
        "punk",
        "punk-rock",
        "r-n-b",
        "rainy-day",
        "reggae",
        "reggaeton",
        "road-trip",
        "rock",
        "rock-n-roll",
        "rockabilly",
        "romance",
        "sad",
        "salsa",
        "samba",
        "sertanejo",
        "show-tunes",
        "singer-songwriter",
        "ska",
        "sleep",
        "songwriter",
        "soul",
        "soundtracks",
        "spanish",
        "study",
        "summer",
        "swedish",
        "synth-pop",
        "tango",
        "techno",
        "trance",
        "trip-hop",
        "turkish",
        "work-out",
        "world-music",
        ""
    ],
    generated:null
}


const mutations = {
    setSearchResNum(state,val){
      state.searchResNum = val;
    },

    setSearchQuery(state,val){
        state.searchQuery[val.key] = val.val;
    },

    setGen(state,data){
      state.gen[data.key] = data.val;
    },

    setGenFeatures(state,data){
      state.gen.popularity = data.popularity;
      state.gen.val = data.val;
    },

    setGenSeeds(state,data){
        state.gen.seeds = data;
    },

    setGenerated(state,data){
        state.generated = data;
    },

    reorderSeeds(state){
        let e0 = state.gen.seeds[0];
        let e1 = state.gen.seeds[1];
        let e2 = state.gen.seeds[2];
        let e3 = state.gen.seeds[3];
        let e4 = state.gen.seeds[4];
        state.gen.seeds = [e1,e2,e3,e4,e0];
    }
}

export default {
    state,
    mutations
}
