<template>
    <mu-container class="flex_v">
        <div class="base">
            <h1>
                <mu-icon value="search"></mu-icon>&nbsp;SEARCH
            </h1>
            <mu-form :model="spotify.searchQuery" class="mu-demo-form" label-position="left" label-width="100">

                <div v-if="spotify.credential.expires_in">

                    <mu-form-item prop="textarea" label="Word">
                        <mu-text-field multi-line :rows="1" :rows-max="2" :value="spotify.searchQuery.term"
                                       @change="(val)=> a_spotify(['set','searchQuery',{key:'term',val:val}])"></mu-text-field>
                    </mu-form-item>

                    <hr>
                    <br>
                    <mu-form-item prop="checkbox" label="Types">
                        <mu-checkbox v-model="spotify.searchQuery.datatypes" value="album" label="Album" @change="changeAction"></mu-checkbox>
                        <mu-checkbox v-model="spotify.searchQuery.datatypes" value="artist" label="Artist" @change="changeAction"></mu-checkbox>
                        <mu-checkbox v-model="spotify.searchQuery.datatypes" value="playlist" label="Playlist" @change="changeAction"></mu-checkbox>
                        <mu-checkbox v-model="spotify.searchQuery.datatypes" value="track" label="Track" @change="changeAction"></mu-checkbox>
                        <mu-checkbox v-model="spotify.searchQuery.datatypes" value="episode" label="Episode" @change="changeAction"></mu-checkbox>
                        <mu-checkbox v-model="spotify.searchQuery.datatypes" value="show" label="Show" @change="changeAction"></mu-checkbox>
                    </mu-form-item>



                    <mu-row gutter>

                        <mu-col span="12" sm="12" md="3" lg="3" xl="2">
                            <mu-form-item prop="textarea" label="Offset">
                                <mu-text-field  :value="spotify.searchQuery.offset" @change="(val)=> a_spotify(['set','searchQuery',{key:'offset',val:val}])"></mu-text-field>
                            </mu-form-item>
                        </mu-col>

                        <mu-col span="12" sm="12" md="9" lg="9" xl="10">
                            <mu-form-item prop="limit" label="Limit">
                                <mu-slider :min="1" :max="50" :step="1" :value="spotify.searchQuery.limit"
                                           @change="(val)=> a_spotify(['set','searchQuery',{key:'limit',val:val}])"></mu-slider>
                            </mu-form-item>
                        </mu-col>
                    </mu-row>


                </div>
                <div style="height:50px;" v-else></div>
                <mu-row gutter>
                    <mu-col span="12" sm="12" md="12" lg="12" xl="12">
                        <div class="grid-cell">
                            <mu-button color="primary" class="smallbtn" full-width @click="c_getCredential" v-if="!spotify.credential.expires_in">LOGIN</mu-button>
                            <mu-button color="secondary" class="smallbtn" full-width @click="c_search" v-else>SEARCH</mu-button>
                        </div>
                    </mu-col>
                </mu-row>
                <div v-if="spotify.searchResNum>0">
                    <mu-row>
                        <search-res-list type="artist"></search-res-list>
                        <search-res-list type="track"></search-res-list>
                        <search-res-list type="album"></search-res-list>
                        <search-res-list type="episode"></search-res-list>
                        <search-res-list type="show"></search-res-list>
                    </mu-row>
                </div>
            </mu-form>
        </div>
    </mu-container>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex';
    import spotifyMixin from '../mixins/spotify/index';
    import searchResList from './List/SearchResList';
    export default {
        name: 'mysearch',
        mixins:[spotifyMixin],
        components:{'search-res-list':searchResList},
        methods:{
            ...mapActions(['a_spotify']),
            changeAction:function(val){
                this.a_spotify(['set','searchQuery',{key:'datatypes',val:val}]);
            }
        },
        computed:mapGetters(['spotify'])
    }
</script>
