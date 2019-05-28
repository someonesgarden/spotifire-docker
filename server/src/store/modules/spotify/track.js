const state = {
    tracks:null,
    track:{
        id:null
    }
}

const mutations = {

    setTrackID(state,val){
        state.track.id = val;
    },

    setTrack(state,val){
      state.track = val;
    },
    setTracks(state,val){
        state.tracks = val;
    }
}

export default {
    state,
    mutations
}
