import axios from 'axios';

export default{

    methods: {
        c_getTrack:function(trackid,cb,feature=true){
            let params =  {'trackid': trackid};
            let headers = {Authorization:this.spotify.credential.access_token};
            axios.get('/api/spotify/track/byid',{params:params, headers: headers}).then(
                res => {
                    if(feature){
                        let track = res.data;
                        axios.get('/api/spotify/track/features',{params:params, headers: headers}).then(
                            res => {
                                if(track) res.data = {...track,features:res.data}
                                cb(res);
                            }).catch(error => {
                            console.log(error);
                        });
                    }else{
                        cb(res);
                    }
            }).catch(error => {
                console.log(error);
            });
        },

        c_getTrackFeatures:function(trackid, cb){
            let params =  {'trackid': trackid};
            let headers = {Authorization:this.spotify.credential.access_token};

            axios.get('/api/spotify/track/features',{params:params, headers: headers}).then(
                res => {
                    cb(res);
                }).catch(error => {
                console.log(error);
            });
        }
    }
}
