import Vue  from 'vue';
import Vuex from 'vuex';
import * as getters from './getters'
import * as actions from './actions'
import { state, mutations } from './mutations';
import spotify from './modules/spotify/index';
import feed from './modules/feed/index';
import mapstore from './modules/mapstore/index';
import ws from './modules/ws/index';

Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    modules:{
        spotify,
        feed,
        mapstore,
        ws
    }
});

