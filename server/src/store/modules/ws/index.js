import socket from './socket';

const state = {
    ...socket.state
}

const mutations = {
    ...socket.mutations
}

export default {
    namespaced: true,
    state,
    mutations
}
