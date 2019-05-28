import user from './user';
import playlist from './playlist';
import browse from './browse';
import artist from './artist';
import album from './album';
import podcast from './podcast';
import track from './track';
import player from './player';
import filter from './filter';
import graph from './graph';

const state = {
    ...filter.state,
    ...user.state,
    ...playlist.state,
    ...browse.state,
    ...album.state,
    ...artist.state,
    ...podcast.state,
    ...track.state,
    ...player.state,
    ...graph.state
}

const mutations = {
    ...filter.mutations,
    ...user.mutations,
    ...playlist.mutations,
    ...browse.mutations,
    ...album.mutations,
    ...artist.mutations,
    ...podcast.mutations,
    ...track.mutations,
    ...player.mutations,
    ...graph.mutations
}

export default {
    namespaced: true,
    state,
    mutations
}
