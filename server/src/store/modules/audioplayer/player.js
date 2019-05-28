const state = {

    players:{
      no1:{
          loading: false,

          // channels stuff
          channels: [], // all channels
          channel: {},  // selected channel
          songs: [],    // recent tracks
          track: {},    // current track
          errors: {},   // error messages

          // sorting stuff
          searchText: '',
          sortParam: 'listeners',
          sortOrder: 'desc'
      }
    },

    player:{
        init:false,
        playing: false,
        loading: false,

        // channels stuff
        channels: [], // all channels
        channel: {},  // selected channel
        songs: [],    // recent tracks
        track: {},    // current track
        errors: {},   // error messages

        // sorting stuff
        searchText: '',
        sortParam: 'listeners',
        sortOrder: 'desc'
    }
}

const mutations = {
    setPlayerVal(state,data){
        state.players[data.id][data.key] = data.val;
        state.player[data.key] = data.val;
    }
}

export default {
    state,
    mutations
}
