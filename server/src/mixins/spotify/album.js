import axios from 'axios';

export default{
    methods: {
        c_getAlbum:function(id,cb){
            let params =  {'albumid': id};
            let headers = {Authorization:this.spotify.credential.access_token};
            axios.get('/api/spotify/album/byid',{params:params, headers: headers}).then(
                res => {
                    cb(res);
            }).catch(error => {
                console.log(error);
            });
        },

        c_getAlbums:function(ids,cb){
            const params = {
                ids:ids,
                access_token:this.spotify.credential.access_token
            }
            axios.post('/api/spotify/album/ids',params)
                .then(res => {
                    cb(res);
                }).catch(error => {
                console.log(error);
            });
        },

        c_getAlbumsPromise:function(ids,cb){
            const params = {
                ids:ids,
                access_token:this.spotify.credential.access_token
            }
            return axios.post('/api/spotify/album/ids',params);
        },

    }
}
