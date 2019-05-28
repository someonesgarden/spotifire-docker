import axios from 'axios';

export default{

    methods: {
        c_getArtist:function(artistid,cb){
            let params =  {'artistid': artistid};
            let headers = {Authorization:this.spotify.credential.access_token};
            axios.get('/api/spotify/artist/byid',{params:params, headers: headers}).then(
                res => {
                    cb(res);
            }).catch(error => {
                console.log(error);
            });
        },

    }
}
