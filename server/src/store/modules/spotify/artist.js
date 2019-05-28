const state = {
    artists:null,
    artist:{
        id:null
    }
}

const mutations = {
    setArtists(state,val){
      state.artists = val;
    },
    setArtist(state,val){
        state.artist.id = val;
    }
}

export default {
    state,
    mutations
}
