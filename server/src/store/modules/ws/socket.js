const state = {
    you:{
        name:null,
        socketid:null,
        connected:false,
        lat:null,
        lng:null,
        pid:null,
        tid:null
    },
    users:[],
    rooms:{}
}

const mutations = {

    setYouName(state,data){
        state.you.name = data;
    },

    setSocketID(state,data){
        state.you.socketid = data;
    },

    setConnect(state,data){
        state.you.connected = data;
    },

    resetYou(state) {
        state.you = {
            name: null,
            socketid: null,
            connected: false,
            lat: null,
            lng: null,
            pid: null,
            tid: null
        }
    },

    setUsers(state,data){
      state.users = data;
    },

    addUser(state,data){
        state.users.push(data);
    },

    popUser(state,data){
      state.users = state.users.map(user=> user.socketid!==data.socketid)
    },

    setRoom(state,data){
        state.rooms[data.key] = data.val;
    },

}

export default {
    state,
    mutations
}
