const state = {
    tracking:false,
    trackDuration:  2000,
}

const mutations = {
    setTracking(state,val){
        state.tracking = val;
    },

    toggleTracking(state){
        console.log("toggleTracking!");
        state.tracking = !state.tracking;
    },

    setLocations(state,val){
        state.locations = val;
    }
}

export default {
    state,
    mutations
}
