const state = {

    player:{
        playing: false,
        nowid:null,
        previd:null,
        track:null
    }
}

const mutations = {
    setPlayerPlay(state,data){
      state.player.playing = true;
      state.player.nowid = data;
    },

    setPlayerPlaying(state,data){
      state.player.playing = data;
    },

    setPlayerTrack(state,data){
        state.player.track = data;
    },

    setPlayerStop(state) {
        state.player.playing = false;
        state.player.previd = state.player.nowid;
        state.player.nowid = null;
    }
}

export default {
    state,
    mutations
}
