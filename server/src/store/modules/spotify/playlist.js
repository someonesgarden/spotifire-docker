const state = {
    playlists:null,
    playlist:{
        id:null
    }
}

const mutations = {
    setPlaylistID(state,val){
        state.playlist.id = val;
    },

    setPlaylist(state,val){
      state.playlist = val;
    },

    setPlaylists(state,val){
        state.playlists = val;
    }
}

export default {
    state,
    mutations
}
