import tracking from './tracking';
import mapbase from './mapbase';

const state = {
    ...mapbase.state,
    ...tracking.state
}

const mutations = {
    ...tracking.mutations
}

export default {
    namespaced: true,
    state,
    mutations
}
