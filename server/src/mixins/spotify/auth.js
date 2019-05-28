import axios from 'axios';

export default{

    methods: {
        c_getCredential: function () {
            let isvalid = false;
            if(!!this.spotify.credential.expire_date){
                let now = new Date();
                if(this.spotify.credential.expire_date > now.getTime()) isvalid = true;
            }
            if(!isvalid){
                axios.post('/api/spotify/auth/get_credential', {})
                    .then(res => {
                        window.open(res.data, null, 'width=350,height=580,toolbar=no,menubar=no,scrollbars=no');
                    }).catch(error => {
                        console.log(error);
                        alert("エラーが発生しました");
                    });
            }
        },

        c_refreshCredential: function () {
            if(!!this.spotify.credential.expire_date){
                let now = new Date();
                if(this.spotify.credential.expire_date < now.getTime()){
                    console.log("NEED TO REFRESH CREDENTIAL");

                    axios.post('/api/spotify/auth/refresh_credential',this.spotify.credential)
                        .then(res => {
                            console.log("REFRESH DONE!");
                            if(!!res.data) this.a_spotify(['credential','set',res.data]);
                        }).catch(error => {
                        console.log(error);
                    });
                }else{
                    console.log("CREDENTIAL IS VALID");
                }
            }
        }
    }
}
