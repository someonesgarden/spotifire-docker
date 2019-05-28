import feed from './feed';
import analyzer from './analyzer';

const state = {
    ...feed.state,
    ...analyzer.state
}

const mutations = {
    ...feed.mutations,
    ...analyzer.mutations
}

export default {
    namespaced: true,
    state,
    mutations
}
