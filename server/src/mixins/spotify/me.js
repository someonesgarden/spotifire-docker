import axios from 'axios';

export default{
    methods: {
        c_getMe:function(){
            axios.get('/api/spotify/me/get_me/'+this.spotify.credential.access_token)
                .then(res => {
                    if(!!res.data) this.a_spotify(['set','me',res.data]);
                }).catch(error => {
                console.log(error);
            });
        },
        c_getMyPlaylists:function(){
            axios.get('/api/spotify/me/get_user_playlists/'+this.spotify.credential.access_token+'/'+this.spotify.me.id)
                .then(res => {
                    if(!!res.data){
                        this.a_spotify(['set','playlists',res.data.items]);
                        this.a_spotify(['set','playlistID',res.data.items[0].id]);
                    }
                }).catch(error => {
                console.log(error);
            });
        },

        c_getMyTopTracks:function(){
            axios.get('/api/spotify/me/get_my_toptracks/'+this.spotify.credential.access_token)
                .then(res => {
                    if(!!res.data){
                       console.log("getMyTopTracks success!");
                       if(res.data.items){
                           console.log(res.data.items);
                           this.a_spotify(['set','track',res.data.items[0]]);
                           this.a_spotify(['set','bookmarks',res.data.items]);
                       }

                    }
                }).catch(error => {
                console.log(error);
            });
        }
    }
}
