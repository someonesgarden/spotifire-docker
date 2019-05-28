import axios from 'axios';

export default{



    methods: {
        c_devices: function (cb) {
            let headers = {Authorization:this.spotify.credential.access_token};
            axios.get('/api/spotify/player/devices',{params:{}, headers: headers})
                .then(res => {
                    cb(res);
                }).catch(error => {
                console.log(error);
            });
        },

        c_pause: function (cb) {
            let headers = {Authorization:this.spotify.credential.access_token};
            axios.get('/api/spotify/player/pause',{params:{}, headers: headers})
                .then(res => {
                    cb(res);
                }).catch(error => {
                console.log(error);
            });
        },

        c_play: function (device_id, id) {
            const params = {
                trackid:id,
                access_token:this.spotify.credential.access_token,
                device_id:device_id
            };
            axios.post('/api/spotify/player/play',params)
                .then(res => {
                    console.log(res);
                }).catch(error => {
                console.log(error);
            });
        },

        c_initplayer: function () {
            console.log("c_initplayer");
            window.onSpotifyWebPlaybackSDKReady = () => {

                //window.alert("onSpotifyWebPlaybackSDKReady!");

                const token = this.spotify.credential.access_token;
                console.log(token);

                const player = new Spotify.Player({
                    name: 'Web Playback SDK Quick Start Player',
                    getOAuthToken: cb => { cb(token); }
                });

                // Error handling
                player.addListener('initialization_error', ({ message }) => {
                    //window.alert(message);
                    console.error(message);
                });
                player.addListener('authentication_error', ({ message }) => {
                    //window.alert(message);
                    console.error(message);
                });
                player.addListener('account_error', ({ message }) => {
                    //window.alert(message);
                    console.error(message);
                });
                player.addListener('playback_error', ({ message }) => {
                    //window.alert(message);
                    console.error(message);
                });

                // Playback status updates
                player.addListener('player_state_changed', state => {

                    //window.alert("paused?:"+state.paused);
                    console.log(state);

                    //Paused
                    console.log("paused:"+state.paused);
                    this.a_spotify(['player','playing',!state.paused]);

                });

                // Ready
                player.addListener('ready', ({ device_id }) => {
                    //window.alert("ready with: "+device_id);
                    console.log('Ready with Device ID', device_id);
                });

                // Not Ready
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                // Connect to the player!
                player.connect();
            };

            window.onSpotifyWebPlaybackSDKReady();
        },
    }
}
