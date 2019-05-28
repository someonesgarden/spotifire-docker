const state = {

    filter:{
        proxy:'https://spotifire.work/api/rssproxy?url=',
        url:null,
        blacklist:null,
        date: new Date()
    },
    filters:[
        {
            name:'web-api-label-blacklist.appspot.com/blacklist.json',
            url:'http://storage.googleapis.com/web-api-label-blacklist.appspot.com/blacklist.json'
        }
    ]
}

const mutations = {
    setFilterURL(state,val){
      state.filter.url = val;
      state.filter.date = new Date();
    },

    setFilterBlacklist(state,val){
        state.filter.blacklist = val;
        state.filter.date = new Date();
    }
}

export default {
    state,
    mutations
}
