<template>

        <!-- app player container -->
        <main class="player-wrap fx fx-fade-in player" ref="playerWrap" style="opacity: 0">
            <figure class="player-bg" ref="playerBg" :style="{backgroundImage:'url('+info.bg+')'}"></figure>
            <canvas class="player-canvas" ref="playerCanvas"></canvas>

            <section class="player-layout">

                <header class="player-header flex-row flex-middle flex-stretch">
                    <h2 class="text-clip flex-1"></h2>
                    <button class="text-nowrap common-btn" @click="toggleSidebar( true )"><i class="fa fa-bars"></i></button>
                </header>

                <!-- player middle content area -->
                <main class="player-content flex-row">
                    <!-- default greet message -->
                    <section class="player-greet" v-if="!hasChannel && !hasErrors">
                        <div class="fx fx-slide-left push-bottom">
                            <h1>
                                <span>
                                      <mu-icon value="format_quote" size="65"/>
                                </span>

                                {{info.subtitle}}</h1>
                        </div>
                        <div class="fx fx-slide-left fx-delay-1 push-bottom">{{info.description}}</div>
                        <div class="fx fx-slide-up fx-delay-2 pad-top">
                            <button class="cta-btn" @click="toggleSidebar( true )" :style="{backgroundColor:info.btncolor}"><i class="fa fa-headphones">&nbsp;</i> {{info.btn1label}}</button>
                        </div>
                    </section>
                    <selected-channel-info :info="info"/>
                    <selected-tracks-info @tryAgain="tryAgain" :info="info"/>
                </main>

                <!-- player footer with controls -->
                <footer class="player-footer flex-row flex-middle flex-space">
                    <!-- player controls -->
                    <section class="player-controls flex-row flex-middle push-right" :class="{ 'disabled': !canPlay }">
                        <button class="common-btn" @click="togglePlay()">
                            <i v-if="playing" class="fa fa-stop fx fx-drop-in" key="stop"></i>
                            <i v-else class="fa fa-play fx fx-drop-in" key="play"></i>
                        </button>
                        <div class="form-slider push-left">
                            <i class="fa fa-volume-down"></i>
                            <input class="common-slider" type="range" min="0.0" max="1.0" step="0.1" value="0.5" v-model="volume" />
                            <i class="fa fa-volume-up"></i>
                        </div>
                        <div class="text-clip push-left">
                            <span>{{ timeDisplay }}</span>
                            <span class="fx fx-fade-in fx-delay-1" v-if="hasChannel" :key="spotify.players[info.id].channel.id">&nbsp;|&nbsp;{{ spotify.players[info.id].channel.title }}</span>
                        </div>
                    </section>
                    <!-- player links -->
                    <section class="player-links text-nowrap">
                        <a class="common-btn text-faded" href="http://spotify.com" title="Spotify" target="_blank">
                            <i class="fa fa-spotify"></i>
                        </a>
                    </section>
                </footer>

            </section> <!-- layout wrapper -->
            <!-- player stations overlay + sidebar -->
            <section class="player-stations" :class="{ 'visible': sidebar }" @click="toggleSidebar( false )">
                <aside class="player-stations-sidebar" @click.stop>
                    <!-- sidebar search -->
                    <header class="player-stations-header flex-row flex-middle flex-stretch">
                        <div class="form-input push-right">
                            <i class="fa fa-search"></i>
                            <input type="text" placeholder="Search station..." v-model="spotify.players[info.id].searchText" @change="(val)=> a_spotify(['player','setsearchtext',val])" />
                        </div>
                        <button class="common-btn" @click="toggleSidebar( false )"><i class="fa fa-times-circle"></i></button>
                    </header>
                    <!-- sidebar stations list -->
                    <ul class="player-stations-list">
                        <li class="player-stations-list-item flex-row flex-top flex-stretch" v-for="c of channelsList" :key="c.id" @click="selectChannel( c )" :class="{ 'active': c.active }">
                            <figure class="push-right if-small">
                                <img class="img-round" width="70" height="70" :src="c.largeimage" :alt="c.title" />
                            </figure>
                            <aside class="flex-1">
                                <div class="flex-row flex-middle flex-space">
                                    <h6 class="text-bright text-clip">{{ c.title }}</h6>
                                    <div class="text-secondary"><i class="fa fa-headphones"></i> {{ c.listeners | toCommas( 0 ) }}</div>
                                </div>
                                <div class="text-small">
                                    <span class="text-faded text-uppercase text-small">{{ c.genre | toSpaces }}</span> <br />
                                    {{ c.description }}
                                </div>
                            </aside>
                        </li>
                    </ul>
                    <!-- sidebar sort options -->
                    <footer class="player-stations-footer flex-row flex-middle flex-stretch">
                        <div class="flex-1 push-right">
                            <span @click="toggleSortOrder()" class="fa clickable" :class="{ 'fa-sort-amount-desc': spotify.players[info.id].sortOrder === 'desc', 'fa-sort-amount-asc': spotify.players[info.id].sortOrder === 'asc' }">&nbsp;</span>
                            <span class="text-faded">Sort: &nbsp;</span>
                            <span class="text-secondary popover">
                              <span class="clickable">{{ sortLabel }}</span>
                              <span class="popover-box popover-top">
                                <button @click="sortBy( 'title', 'asc' )">Station Name</button>
                                <button @click="sortBy( 'listeners', 'desc' )">Listeners Count</button>
                                <button @click="sortBy( 'genre', 'asc' )">Music Genre</button>
                              </span>
                            </span>
                        </div>
                        <div>&nbsp;</div>
                    </footer>
                </aside>
            </section>
        </main> <!-- player -->
</template>

<script>
    import {mapGetters,mapActions} from 'vuex';
    import axios from 'axios';
    import * as THREE from 'three';
    import playerMixin from '../../../mixins/player/index';

    import {Sphere} from '../../../three/Sphere';
    import selectedChannelInfo from './SelectedChannelInfo';
    import selectedTracksInfo from './SelectedTracksInfo';

    export default {
        name: "Player.vue",
        mixins:[playerMixin],
        props:['info'],
        components:{
            selectedChannelInfo,
            selectedTracksInfo
        },
        data:function() {
           return{
               sidebar:true,
               init:false,
               playing:false,
               loading:false,
               //INFO

               // ANIMATION
               fxBox: null,
               fxRenderer: null,
               fxScene: null,
               fxColor: null,
               fxLight: null,
               fxCamera: null,
               fxMouse: { x: 0, y: 0 },
               fxObjects: [],

               // AUDIO
               audio: new Audio(),
               context: new AudioContext(),
               freqData: new Uint8Array(),
               audioSrc: null,
               audioGain: null,
               analyser: null,
               volume: 0.5,

               // timer stuff
               timeStart: 0,
               timeDisplay: '00:00:00',
               timeItv: null,
               anf: null,
               sto: null,
               itv: null,
           }
        },

        // watch methods
        watch: {
            'init':{
              handler(){
                  setTimeout( this.setupCanvas, 100 );
                  setTimeout( this.initSidebar, 500 );
              }
            },

            'playing':{
                handler(newVal){
                    if ( newVal ) { this.startClock(); }
                    else { this.stopClock(); }
                }
            },

            volume() {
                this.setVolume( this.volume);
            }
        },

        // computed methods
        computed: {
            ...mapGetters(['spotify']),

            channelsList() {
                let list = this.spotify.players[this.info.id].channels.slice();
                let searchText = this.spotify.players[this.info.id].searchText;
                if(!this.isString(searchText)) searchText = "";
                let search = searchText.replace( /[^\w\s\-]+/g, '' ).replace( /[\r\s\t\n]+/g, ' ' ).trim();

                if ( search && search.length > 1 ) {
                    let reg = new RegExp( '^('+ search +')', 'i' );
                    list = list.filter( i => reg.test( i.title +' '+ i.description ) );
                }
                if ( this.spotify.players[this.info.id].sortParam ) {
                    list = this.sortList( list, this.spotify.players[this.info.id].sortParam, this.spotify.players[this.info.id].sortOrder );
                }
                if ( this.spotify.players[this.info.id].channel.id ) {
                    list = list.map( i => {
                        i.active = ( this.spotify.players[this.info.id].channel.id === i.id ) ? true : false;
                        return i;
                    });
                }

                return list;
            },

            // sort-by label for buttons, etc
            sortLabel() {
                switch ( this.spotify.players[this.info.id].sortParam ) {
                    case 'title'     : return 'Station Name';
                    case 'listeners' : return 'Listeners Count';
                    case 'genre'     : return 'Music Genre';
                }
            },

            // check if audio can be played
            canPlay() {
                return ( this.spotify.players[this.info.id].channel.id && !this.loading ) ? true : false;
            },

            // check if a channel is selected
            hasChannel() {
                return this.spotify.players[this.info.id].channel.id ? true : false;
            },

            // check if there are errors to show
            hasErrors() {
                return ( this.checkError( 'init' ) || this.checkError( 'stream' ) ) ? true : false;
            }
        },

        // custom methods
        methods: {
            ...mapActions(['a_spotify']),

            checkError( key ) {
                return ( key && this.spotify.players[this.info.id].errors.hasOwnProperty( key ) && this.spotify.players[this.info.id].errors[ key ] );
            },

            clearErrors() {
                this.a_spotify(['player','seterrors',{}]);
            },

            resetPlayer() {
                this.a_spotify(['player','setchannel',{}]);
                this.a_spotify(['player','setsongs',[]]);

                this.clearErrors();
                this.getChannels( true );
            },

            // try resuming stream problem if possible
            tryAgain() {
                if ( this.checkError( 'init' ) ) return this.resetPlayer();
                if ( this.spotify.players[this.info.id].channel.id ) return this.playChannel( this.spotify.players[this.info.id].channel );
            },


            // show sidebar at startup if there are no errors
            initSidebar() {
                if ( this.checkError( 'init' ) ) return;
                this.toggleSidebar( true );
            },

            // get channels data from api
            getChannels( sidebar ) {
                let endpoint = 'https://somafm.com/channels.json';
                let emsg = [ 'There was a problem trying to load the list of available channels from SomaFM.' ];

                axios.get( endpoint ).then( res => {
                    if ( !res || !res.data || !res.data.channels ) {
                        emsg.push( 'The API response did not have any channels data available at this time.' );
                        emsg.push( 'Status: Channels API Error.' );
                        return this.setError( 'channels', emsg.join( ' ' ) );
                    }
                    for ( let c of res.data.channels ) {
                        if ( !Array.isArray( c.playlists ) ) continue;
                        // filter and sanitize list of channels
                        c.twitter   = c.twitter ? 'https://twitter.com/@'+ c.twitter : ''; // full twitter url
                        c.plsfile   = c.playlists.filter( p => ( p.format === 'mp3' && /^(highest|high)$/.test( p.quality ) ) ).shift().url || '';
                        c.mp3file   = 'http://ice1.somafm.com/'+ c.id +'-128-mp3'; // assumed stream url
                        c.songsurl  = 'https://somafm.com/songs/'+ c.id +'.json'; // songs data url
                        c.infourl   = 'https://somafm.com/'+ c.id +'/'; // channel page url
                        c.listeners = c.listeners | 0; // force numeric
                        c.updated   = c.updated | 0; // force numeric
                        c.active    = false; // select state
                        // update selected channel
                        if ( this.isCurrentChannel( c ) ) {
                            c.active = true;
                            let channel = Object.assign( this.spotify.players[this.info.id].channel, c );
                            this.a_spotify(['player','setchennel',channel]);
                        }
                    }

                    let channels_ = res.data.channels.slice();

                    this.a_spotify(['player','setchannels',channels_]);

                    if ( sidebar ) this.toggleSidebar( true );
                    this.setError( 'init', '' );
                    this.setError( 'channels', '' );
                })
                    .catch( e => {
                        emsg.push( 'Try again, or check your internet connection.' );
                        emsg.push( 'Status: '+ String( e.message || 'Channels API Error' ) +'.' );
                        let errstr = emsg.join( ' ' );
                        if ( !this.spotify.players[this.info.id].channels.length ) this.setError( 'init', errstr );
                        this.setError( 'channels', errstr );
                    });
            },

            // fetch songs for a channel
            fetchSongs( channel, cb ) {
                if ( !channel || !channel.id || !channel.songsurl ) return;
                if ( !this.isCurrentChannel( channel ) ) {


                    this.a_spotify(['player','setsongs',[]]);

                    this.a_spotify(['player','settrack',{}]);

                }
                let emsg = [ 'There was a problem trying to load the list of songs for channel '+ channel.title +' from SomaFM.' ];

                axios.get( channel.songsurl ).then( res => {
                    if ( !res || !res.data || !res.data.songs ) {
                        emsg.push( 'The API response did not have any songs data available at this time.' );
                        emsg.push( 'Status: Songs API Error.' );
                        return this.setError( 'songs', emsg.join( ' ' ) );
                    }
                    let songs  = res.data.songs.slice();
                    let track_ = songs.shift();
                    this.a_spotify(['player','settrack',track_]);

                    let songs_ = songs.slice( 0, 3 );
                    this.a_spotify(['player','setsongs', songs_]);

                    this.setError( 'songs', '' );
                    if ( typeof cb === 'function' ) cb( songs );
                })
                    .catch( e => {
                        emsg.push( 'Try again, or check your internet connection.' );
                        emsg.push( 'Status: '+ String( e.message || 'Songs API Error' ) +'.' );
                        this.setError( 'songs', emsg.join( ' ' ) );
                    });
            },

            // toggle stream playback for current selected channel
            togglePlay() {
                if ( this.loading ) return;
                if ( this.playing ) return this.closeAudio();
                if ( this.spotify.players[this.info.id].channel.id ) return this.playChannel( this.spotify.players[this.info.id].channel );
            },

            // toggle sort order
            toggleSortOrder() {
                let sortOrder_ = ( this.spotify.players[this.info.id].sortOrder === 'asc' ) ? 'desc' : 'asc';
                this.a_spotify(['player','setsortorder',sortOrder_]);
            },

            // apply sorting and toggle order
            sortBy( param, order ) {
                if ( this.spotify.players[this.info.id].sortParam === param ) { this.toggleSortOrder(); }
                else {
                    let sortOrder_ = order || 'asc';
                    this.a_spotify(['player','setsortorder',sortOrder_]);
                }
                this.a_spotify(['player','setsortparam', param]);
            },

            isCurrentChannel( channel ) {
                if ( !channel || !channel.id || !this.spotify.players[this.info.id].channel.id ) return false;
                if ( this.spotify.players[this.info.id].channel.id !== channel.id ) return false;
                return true;
            },


            // set an erro message
            setError( key, err ) {
                let errors = Object.assign( {}, this.spotify.players[this.info.id].errors );
                errors[ key ] = String( err || '' ).trim();
                if ( err ) console.warn( 'ERROR('+ key +'):', err );

                this.a_spotify(['player','seterrors',errors]);
                this.init = true;
            },


            // show/hide the sidebar
            toggleSidebar( toggle ) {
                let status = ( typeof toggle === 'boolean' ) ? toggle : false;
                this.sidebar = status;
            },

            // THREE.JS
            setupCanvas() {

                let Sphere_ = Object.assign({}, Sphere);

                if ( !this.$refs.playerWrap ) return;
                if ( !this.$refs.playerCanvas ) return;
                // default canvas and player dimensions
                const player = this.$refs.playerWrap;
                const canvas = this.$refs.playerCanvas;
                // setup THREE renderer and replace default canvas
                this.fxBox = player.getBoundingClientRect();
                this.fxScene = new THREE.Scene();
                this.fxRenderer = new THREE.WebGLRenderer( { alpha: true, antialias: true, precision: 'highp' } );
                this.fxRenderer.setClearColor( 0x000000, 0 );
                this.fxRenderer.setPixelRatio( window.devicePixelRatio );
                this.fxRenderer.domElement.className = canvas.className;
                // setup camera
                this.fxCamera = new THREE.PerspectiveCamera( 60, ( this.fxBox.width / this.fxBox.height ), 0.1, 20000 );
                this.fxCamera.lookAt( this.fxScene.position );
                this.fxCamera.position.set( 0, 0, 300 );
                this.fxCamera.rotation.set( 0, 0, 0 );
                // light color
                this.fxColor = new THREE.Color();
                this.fxColor.setHSL( this.fxHue, 1, .5 );
                // setup light source
                this.fxLight = new THREE.PointLight( 0xffffff, 4, 400 );
                this.fxLight.position.set( 0, 0, 420 );
                this.fxLight.castShadow = false;
                this.fxLight.target = this.fxScene;
                this.fxLight.color = this.fxColor;
                this.fxScene.add( this.fxLight );
                // setup canvas and events
                canvas.parentNode.replaceChild( this.fxRenderer.domElement, canvas );
                window.addEventListener( 'mousemove', this.updateMousePosition );
                window.addEventListener( 'resize', this.updateStageSize );
                // add objects
                this.fxObjects.push( Sphere_ );
                // setup objects and start animation
                for ( let o of this.fxObjects ) o.create( this.fxBox, this.fxScene );
                this.updateStageSize();
                this.updateAnimations();
            },

            updateMousePosition( e ) {
                if ( !this.fxBox || !e ) return;
                this.fxMouse.x = Math.max( 0, e.pageX || e.clientX || 0 ) - ( this.fxBox.left + ( this.fxBox.width / 2 ) );
                this.fxMouse.y = Math.max( 0, e.pageY || e.clientY || 0 ) - ( this.fxBox.top + ( this.fxBox.height / 2 ) );
            },

            updateStageSize() {
                if ( !this.$refs.playerWrap || !this.fxRenderer ) return;
                this.fxBox = this.$refs.playerWrap.getBoundingClientRect();
                this.fxCamera.aspect = ( this.fxBox.width / this.fxBox.height );
                this.fxCamera.updateProjectionMatrix();
                this.fxRenderer.setSize( this.fxBox.width, this.fxBox.height );
            },

            updateStageLight() {
                let dist  = Math.floor( this.freqData[ 1 ] | 0 ) / 255;
                let color = Math.floor( this.freqData[ 16 ] | 0 ) / 255;
                this.fxLight.distance = 360 + ( 140 * dist );
                this.fxColor.setHSL( color, .5, .5 );
            },

            updateSceneObjects() {
                for ( let o of this.fxObjects ) {
                    o.update( this.fxBox, this.fxMouse, this.freqData );
                }
            },

            // AUDIO
            // audio visualizer animation loop
            updateAnimations() {
                this.anf = requestAnimationFrame( this.updateAnimations );
                if ( !this.fxRenderer || !this.fxCamera || !this.analyser || !this.freqData ) return;
                this.analyser.getByteFrequencyData( this.freqData );
                this.updateSceneObjects();
                this.updateStageLight();
                this.fxRenderer.render( this.fxScene, this.fxCamera );
            },

            setupAudio() {
                // setup audio sources
                this.audioSrc  = this.context.createMediaElementSource( this.audio );
                this.audioGain = this.context.createGain();
                this.analyser  = this.context.createAnalyser();
                // connect sources
                this.audioSrc.connect( this.audioGain );
                this.audioSrc.connect( this.analyser );
                this.audioGain.connect( this.context.destination );
                this.setVolume( this.volume );
                // check when stream can start playing
                this.audio.addEventListener( 'canplay', e => {
                    this.audio.play();
                    this.freqData = new Uint8Array( this.analyser.frequencyBinCount );
                });
                // check if stream is buffering
                this.audio.addEventListener( 'waiting', e => {
                    this.playing = false;

                    this.loading = true;
                    //this.a_spotify(['player','loading',true]);
                });
                // check if stream is done buffering
                this.audio.addEventListener( 'playing', e => {
                    this.setError( 'stream', '' );
                    this.playing = true;

                    this.loading = false;
                   // this.a_spotify(['player','loading',false]);
                });
                // check if stream has ended
                this.audio.addEventListener( 'ended', e => {

                    this.playing = false;

                    this.loading = false;

                   // this.a_spotify(['player','loading',false]);
                });
                // check for steam error
                this.audio.addEventListener( 'error', e => {
                    let emsg = [];
                    emsg.push( 'The selected audio stream could not load, or has stopped loading.' );
                    emsg.push( 'Try again, or check your internet connection.' );
                    emsg.push( 'Status: '+ String( e.message || 'Stream URL Error' ) +'.' );
                    this.setError( 'stream', emsg.join( ' ' ) );

                    this.playing = false;
                    this.loading = false;
                    //this.a_spotify(['player','loading',false]);
                });
            },

            setVolume( volume ) {
                if ( !this.audioGain ) return;
                volume = parseFloat( volume ) || 0;
                volume = ( volume < 0 ) ? 0 : volume;
                volume = ( volume > 1 ) ? 1 : volume;
                this.audioGain.gain.value = volume;
            },

            playChannel( channel ) {
                if ( this.playing ) return;
                this.clearErrors();
                this.audio.src = channel.mp3file +'/?x='+ Date.now();
                this.audio.crossOrigin = 'anonymous';
                this.audio.load();
            },

            selectChannel( channel ) {
                if ( !channel || !channel.id ) return;
                if ( this.isCurrentChannel( channel ) ) return;
                this.closeAudio();
                this.toggleSidebar( false );
                this.playChannel( channel );
                this.fetchSongs( channel );

                this.a_spotify(['player','setchannel',channel]);
            },

            closeAudio() {
                this.setError( 'stream', '' );
                try { this.audio.pause(); } catch ( e ) {}
                try { this.audio.stop(); } catch ( e ) {}
                try { this.audio.close(); } catch ( e ) {}

                this.playing = false;
            },

            // run maintenance tasks on a timer
            setupMaintenance() {
                this.itv = setInterval( () => {
                    this.getChannels(); // update channels
                    this.fetchSongs( this.spotify.players[this.info.id].channel ); // update channel tracks
                    // ...
                }, 1000 * 30 );
            },

            //tracking playback
            startClock() {
                this.stopClock();
                this.timeStart = Date.now();
                this.timeItv = setInterval( this.updateClock, 1000 );
                this.updateClock();
            },

            updateClock() {
                let p = n => ( n < 10 ) ? '0'+n : ''+n;
                let elapsed = ( Date.now() - this.timeStart ) / 1000;
                let seconds = Math.floor( elapsed % 60 );
                let minutes = Math.floor( elapsed / 60 % 60 );
                let hours   = Math.floor( elapsed / 3600 );
                this.timeDisplay = p( hours ) +':'+ p( minutes ) +':'+ p( seconds );
            },

            stopClock() {
                if ( this.timeItv ) clearInterval( this.timeItv );
                this.timeItv = null;
            },

            clearTimers() {
                if ( this.sto ) clearTimeout( this.sto );
                if ( this.itv ) clearInterval( this.itv );
                if ( this.anf ) cancelAnimationFrame( this.anf );
            },
        },

        // on app mounted
        mounted() {
            this.getChannels();
            this.setupAudio();
            this.setupMaintenance();
        },

        // on app destroyed
        destroyed() {
            this.closeAudio();
            this.clearTimers();
        }
    }
</script>
