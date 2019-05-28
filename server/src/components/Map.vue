<template>
    <mu-container class="reset">
        <mu-row gutter>
            <mu-col span="4" sm="3" md="3" lg="2" class="controlarea">

                    <div class="ui">
                        <h4 class="title">emory.</h4>
                    </div>

                    <mu-form :model="mapform" ref="mapform" label-position="left" label-width="0" class="userform">
                        <div class="ui">
                            <div class="sixteen wide">
                                <mu-button full-width color="cyan400" @click="trackToggle" v-if="mapstore.tracking">
                                    <mu-icon value="portable_wifi_off" style="width:20px;"></mu-icon>&nbsp;Stop
                                </mu-button>
                                <mu-button full-width color="pink500" @click="trackToggle" v-else>
                                    <mu-icon value="settings_input_antenna" style="width:20px;"></mu-icon>&nbsp;Start
                                </mu-button>
                            </div>
                        </div>

                        <mu-form-item prop="username" :rules="blankRules">
                            <mu-text-field color="primary" prop="username" placeholder="enter name." v-model="mapform.username"></mu-text-field>
                        </mu-form-item>
                        <div class="ui">
                            <div class="sixteen wide">
                                <mu-button full-width color="indigo500" @click="connectToSocket" v-if="!ws.you.connected">
                                    <mu-icon value="device_hub" style="width:20px;"></mu-icon>&nbsp;connect
                                </mu-button>
                                <mu-button full-width color="red500" @click="socketDisconnect" v-else>
                                    <mu-icon value="settings_input_composite" style="width:20px;"></mu-icon>&nbsp;disconnect
                                </mu-button>
                            </div>
                        </div>
                    </mu-form>

                <mu-list class="users_list">
                    <map-user-item :user="user" v-for="(user,key,index) in ws.users" :key="'user'+key+index" @mapPanTo="mapPanTo"/>
                </mu-list>
                <mu-divider></mu-divider>
            </mu-col>

            <mu-col span="8" sm="9" md="9" lg="10" class="maparea">
                <div class="grid-cell">
                    <map-view id="map" ref="mapref"></map-view>
                </div>
            </mu-col>
        </mu-row>
    </mu-container>
</template>
<script>

    import {mapGetters,mapActions} from 'vuex';
    import spotifyMixin from '../mixins/spotify/index';
    import mapMixin from '../mixins/map/index';
    import wsMixin from '../mixins/ws/index';
    import {ruleEmpty} from '../store/rules';

    import MapView from './Map/MapView';
    import MapUserItem from './Map/MapUserItem';
    export default {
        name: 'myfilters',
        mixins:[
            spotifyMixin,
            mapMixin,
            wsMixin
        ],
        components:{
            MapView,
            MapUserItem
        },

        data(){
          return{
              socket:null,
              blankRules: [ruleEmpty],
                mapform:{
                    username:''
                }
          }
        },
        computed:mapGetters(['spotify','mapstore','ws']),
        mounted(){
            this.filter = this.spotify.filter;
            this.socketInit();
        },

        beforeDestroy(){
            this.socketDisconnect();
        },

        methods: {
            ...mapActions([
                'a_spotify',
                'a_mapstore',
                'a_ws']),

            mapPanTo(lat,lng){
                console.log("setMapCenter",lat,lng);

                this.$refs.mapref.mapPanTo(lat,lng);
            },

            connectToSocket() {

                let your_pos_and_data = {
                    name:       this.mapform.username,
                    lat:        this.$refs.mapref.lat,
                    lng:        this.$refs.mapref.lng,
                    pid:        this.spotify.playlist ? this.spotify.playlist.id : null,
                    tid:        this.spotify.track ? this.spotify.track.id : null
                };

                this.$refs.mapform.validate().then(valid => {
                    if (valid) this.socketConnect(your_pos_and_data);
                })
            }
        }
    }
</script>


<style lang="scss">
    #map {
        height:calc(100%);
        width:100%;
        margin:0;
        padding:0;
    }

    .container.reset{
        width:100%;
        background-color:rgba(12,23,22,0.4);
        max-width:inherit;
        padding:0;
        margin: 54px 0 0 0;

        h4.title{
            font-family: 'Allerta Stencil' !important;
            font-weight:bold;
            padding-top:35px;
            padding-bottom:35px;
            color:white;
        }

        .col{
            &.controlarea{
                padding-right:0;
                text-align:center;
                background-color: #18212e;
            }

            &.maparea{
                padding-left:0;
                width:100%;
                height:100%;
            }

            .grid-cell{
                background-color:rgba(34,12,111,0.3);
                height:calc(100vh - 54px);
            }
        }
    }


</style>
