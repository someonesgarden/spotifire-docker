const state = {
    shows:null,
    show:{
        id:null
    },
    episodes:null,
    episode:{
        id:null
    }
}

const mutations = {
    setShows(state,val){
      state.shows = val;
    },
    setShow(state,val){
        state.show.id = val;
    },
    setEpisodes(state,val){
        state.episodes = val;
    },
    setEpisode(state,val){
        state.episode.id = val;
    }
}

export default {
    state,
    mutations
}
