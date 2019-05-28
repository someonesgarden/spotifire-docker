const loggedIn  = state => state.loggedIn
const rootAction= state => state.rootAction
const bottom    = state => state.bottom
const spotify = modules => modules.spotify
const feed = modules => modules.feed
const mapstore = modules => modules.mapstore
const ws  = modules => modules.ws
export {
    rootAction,
    loggedIn,
    bottom,
    spotify,
    feed,
    mapstore,
    ws
}
