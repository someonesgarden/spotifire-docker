<template>
    <div class="aside">
        <h3><strong><mu-icon value="search" size="10"></mu-icon>&nbsp;SEARCH</strong></h3>
        <mu-container v-if="gen">
            <mu-form :model="gen" label-position="left" label-width="32">
                <mu-row gutter>
                    <mu-col span="1" sm="1" md="1" lg="1" xl="1">
                        <mu-radio v-model="id_or_term" value="id"></mu-radio>
                    </mu-col>

                    <mu-col span="8" sm="8" md="8" lg="8" xl="8">
                        <mu-form-item prop="textarea" label="ID" class="range">
                            <mu-text-field :value="spotify.searchQuery.id" :disabled="id_or_term==='term'" @change="(val)=> a_spotify(['set','searchQuery',{key:'id',val:val}])"></mu-text-field>
                        </mu-form-item>
                    </mu-col>
                    <mu-col span="3" sm="3" md="3" lg="3" xl="3" style="text-align:right;">

                        <mu-button fab small color="grey500" @click="a_index(['bottom','open'])" range style="width:26px;height:26px;">
                            <mu-icon value="border_bottom" :size="18"></mu-icon>
                        </mu-button>

                        <mu-button fab small color="black" @click="$emit('rightopen')" range style="width:26px;height:26px;">
                            <mu-icon value="border_right" :size="18"></mu-icon>
                        </mu-button>

                    </mu-col>
                </mu-row>
                <mu-row gutter>

                    <mu-col span="1" sm="1" md="1" lg="1" xl="1">
                        <mu-radio v-model="id_or_term" value="term"></mu-radio>
                    </mu-col>

                    <mu-col span="11" sm="11" md="11" lg="11" xl="11">
                        <mu-form-item prop="textarea" label="search" class="range">
                            <mu-text-field multi-line :rows="1" :rows-max="2" :value="spotify.searchQuery.term" :disabled="id_or_term==='id'"
                                           @change="(val)=> a_spotify(['set','searchQuery',{key:'term',val:val}])"></mu-text-field>
                        </mu-form-item>
                    </mu-col>
                </mu-row>

                <mu-form-item prop="checkbox" label="Types" class="range">
                    <mu-checkbox v-model="spotify.searchQuery.datatypes" value="album" label="Album" @change="changeAction"></mu-checkbox>
                    <mu-checkbox v-model="spotify.searchQuery.datatypes" value="artist" label="Artist" @change="changeAction"></mu-checkbox>
                    <mu-checkbox v-model="spotify.searchQuery.datatypes" value="playlist" label="Playlist" @change="changeAction"></mu-checkbox>
                    <mu-checkbox v-model="spotify.searchQuery.datatypes" value="track" label="Track" @change="changeAction"></mu-checkbox>
                    <mu-checkbox v-model="spotify.searchQuery.datatypes" value="episode" label="Episode" @change="changeAction"></mu-checkbox>
                    <mu-checkbox v-model="spotify.searchQuery.datatypes" value="show" label="Show" @change="changeAction"></mu-checkbox>
                </mu-form-item>

                <mu-row gutter>
                    <mu-col span="4" sm="4" md="4" lg="4" xl="4">
                        <mu-form-item prop="textarea" label="offset" class="range">
                            <mu-text-field  :value="spotify.searchQuery.offset" @change="(val)=> a_spotify(['set','searchQuery',{key:'offset',val:val}])"></mu-text-field>
                        </mu-form-item>
                    </mu-col>
                    <mu-col span="8" sm="8" md="8" lg="8" xl="8">
                        <mu-form-item prop="limit" label="limit" class="range">
                            <mu-slider :min="1" :max="50" :step="1" :value="spotify.searchQuery.limit"
                                       @change="(val)=> a_spotify(['set','searchQuery',{key:'limit',val:val}])"></mu-slider>
                        </mu-form-item>
                    </mu-col>
                </mu-row>

                <hr>
                <div class="row" v-if="spotify.searchResNum>0">
                    <search-res-list type="album"></search-res-list>
                    <search-res-list type="playlist"></search-res-list>
                    <search-res-list type="artist"></search-res-list>
                    <search-res-list type="track"></search-res-list>
                    <search-res-list type="show"></search-res-list>
                    <search-res-list type="episode"></search-res-list>
                </div>

                <br>
                <mu-row gutter>
                    <mu-col span="12" sm="12" md="12" lg="12" xl="12">
                        <div class="grid-cell">
                            <mu-button color="primary" class="smallbtn" full-width @click="c_getCredential" v-if="!spotify.credential.expires_in">LOGIN</mu-button>
                            <mu-button color="secondary" class="smallbtn" full-width @click="c_search(id_or_term==='term')" v-else>SEARCH</mu-button>
                        </div>
                    </mu-col>
                </mu-row>

                <hr>
                <br>
                <h3><strong><mu-icon value="games" size="10"></mu-icon>&nbsp;RECOMMENDATIONS</strong></h3>

                <mu-row gutter>
                    <mu-col span="10" sm="10" md="10" lg="10">
                        <mu-form-item label="limit"><mu-slider v-model="gen.limit" :min="0" :max="100" :step="1"></mu-slider></mu-form-item>
                    </mu-col>
                    <mu-col span="2" sm="2" md="2" lg="2">
                        <mu-text-field :value="gen.limit" class="range" @change="(val)=> gen.limit=parseInt(val)"></mu-text-field>
                    </mu-col>
                </mu-row>

                <mu-row gutter>
                    <mu-col span="6" sm="6" md="7" lg="7">
                        <mu-form-item label="key"><mu-slider v-model="gen.val.key" :min="0" :max="12" :step="1"></mu-slider></mu-form-item>
                    </mu-col>
                    <mu-col span="2" sm="2" md="2" lg="2">
                        <mu-text-field :value="gen.val.key" class="range" @change="(val)=> gen.val.key=parseInt(val)"></mu-text-field>
                    </mu-col>
                    <mu-col span="4" sm="4" md="3" lg="3">
                        <mu-select v-model="gen.range.key" class="range">
                            <mu-option v-for="(type,index) in gen.range_types" :key="'range_key'+index" :label="type.text" :value="type.value"></mu-option>
                        </mu-select>
                    </mu-col>
                </mu-row>

                <mu-row gutter>
                    <mu-col span="6" sm="6" md="7" lg="7">
                        <mu-form-item label="tempo">
                            <mu-slider v-model="gen.val.tempo" :min="0" :max="300" :step="1"></mu-slider>
                        </mu-form-item>
                    </mu-col>
                    <mu-col span="2" sm="2" md="2" lg="2">
                        <mu-text-field :value="gen.val.tempo" class="range" @change="(val)=> gen.val.tempo=parseInt(val)"></mu-text-field>
                    </mu-col>
                    <mu-col span="4" sm="4" md="3" lg="3">
                        <mu-select v-model="gen.range.tempo" class="range">
                            <mu-option v-for="(type,index) in gen.range_types" :key="'range_tempo'+index" :label="type.text" :value="type.value"></mu-option>
                        </mu-select>
                    </mu-col>
                </mu-row>

                <mu-row gutter>
                    <mu-col span="6" sm="6" md="7" lg="7">
                        <mu-form-item label="acoustic">
                            <mu-slider v-model="gen.val.acousticness" :min="0" :max="1" :step="0.0001"></mu-slider>
                        </mu-form-item>
                    </mu-col>
                    <mu-col span="2" sm="2" md="2" lg="2">
                        <mu-text-field :value="gen.val.acousticness" class="range" @change="(val)=> gen.val.acousticness=parseFloat(val)"></mu-text-field>
                    </mu-col>
                    <mu-col span="4" sm="4" md="3" lg="3">
                        <mu-select v-model="gen.range.acousticness" class="range">
                            <mu-option v-for="(type,index) in gen.range_types" :key="'range_acou'+index" :label="type.text" :value="type.value"></mu-option>
                        </mu-select>
                    </mu-col>
                </mu-row>

                <mu-row gutter>
                    <mu-col span="6" sm="6" md="7" lg="7">
                        <mu-form-item label="dance">
                            <mu-slider v-model="gen.val.danceability" :min="0" :max="1" :step="0.0001"></mu-slider>
                        </mu-form-item>
                    </mu-col>
                    <mu-col span="2" sm="2" md="2" lg="2">
                        <mu-text-field :value="gen.val.danceability" class="range" @change="(val)=> gen.val.danceability=parseFloat(val)"></mu-text-field>
                    </mu-col>
                    <mu-col span="4" sm="4" md="3" lg="3">
                        <mu-select v-model="gen.range.danceability" class="range">
                            <mu-option v-for="(type,index) in gen.range_types" :key="'range_dance'+index" :label="type.text" :value="type.value"></mu-option>
                        </mu-select>
                    </mu-col>
                </mu-row>

                <mu-row gutter>
                    <mu-col span="6" sm="6" md="7" lg="7">
                        <mu-form-item label="energy">
                            <mu-slider v-model="gen.val.energy" :min="0" :max="1" :step="0.0001"></mu-slider>
                        </mu-form-item>
                    </mu-col>
                    <mu-col span="2" sm="2" md="2" lg="2">
                        <mu-text-field :value="gen.val.energy" class="range" @change="(val)=> gen.val.energy=parseFloat(val)"></mu-text-field>
                    </mu-col>
                    <mu-col span="4" sm="4" md="3" lg="3">
                        <mu-select v-model="gen.range.energy" class="range">
                            <mu-option v-for="(type,index) in gen.range_types" :key="'range_ene'+index" :label="type.text" :value="type.value"></mu-option>
                        </mu-select>
                    </mu-col>
                </mu-row>

                <mu-row gutter>
                    <mu-col span="6" sm="6" md="7" lg="7">
                        <mu-form-item label="instru">
                            <mu-slider v-model="gen.val.instrumentalness" :min="0" :max="1" :step="0.0001"></mu-slider>
                        </mu-form-item>
                    </mu-col>
                    <mu-col span="2" sm="2" md="2" lg="2">
                        <mu-text-field :value="gen.val.instrumentalness" class="range" @change="(val)=> gen.val.instrumentalness=parseFloat(val)"></mu-text-field>
                    </mu-col>
                    <mu-col span="4" sm="4" md="3" lg="3">
                        <mu-select v-model="gen.range.instrumentalness" class="range">
                            <mu-option v-for="(type,index) in gen.range_types" :key="'range_inst'+index" :label="type.text" :value="type.value"></mu-option>
                        </mu-select>
                    </mu-col>
                </mu-row>

                <mu-row gutter>
                    <mu-col span="6" sm="6" md="7" lg="7">
                        <mu-form-item label="liveness">
                            <mu-slider v-model="gen.val.liveness" :min="0" :max="1" :step="0.0001"></mu-slider>
                        </mu-form-item>
                    </mu-col>
                    <mu-col span="2" sm="2" md="2" lg="2">
                        <mu-text-field :value="gen.val.liveness" class="range" @change="(val)=> gen.val.liveness=parseFloat(val)"></mu-text-field>
                    </mu-col>
                    <mu-col span="4" sm="4" md="3" lg="3">
                        <mu-select v-model="gen.range.liveness" class="range">
                            <mu-option v-for="(type,index) in gen.range_types" :key="'range_live'+index" :label="type.text" :value="type.value"></mu-option>
                        </mu-select>
                    </mu-col>
                </mu-row>

                <mu-row gutter>
                    <mu-col span="6" sm="6" md="7" lg="7">
                        <mu-form-item label="speech">
                            <mu-slider v-model="gen.val.speechiness" :min="0" :max="1" :step="0.0001"></mu-slider>
                        </mu-form-item>
                    </mu-col>
                    <mu-col span="2" sm="2" md="2" lg="2">
                        <mu-text-field :value="gen.val.speechiness" class="range" @change="(val)=> gen.val.speechiness=parseFloat(val)"></mu-text-field>
                    </mu-col>
                    <mu-col span="4" sm="4" md="3" lg="3">
                        <mu-select v-model="gen.range.speechiness" class="range">
                            <mu-option v-for="(type,index) in gen.range_types" :key="'range_spee'+index" :label="type.text" :value="type.value"></mu-option>
                        </mu-select>
                    </mu-col>
                </mu-row>

                <mu-row gutter>
                    <mu-col span="6" sm="6" md="7" lg="7">
                        <mu-form-item label="valence">
                            <mu-slider v-model="gen.val.valence" :min="0" :max="1" :step="0.0001"></mu-slider>
                        </mu-form-item>
                    </mu-col>
                    <mu-col span="2" sm="2" md="2" lg="2">
                        <mu-text-field :value="gen.val.valence" class="range" @change="(val)=> gen.val.valence=parseFloat(val)"></mu-text-field>
                    </mu-col>
                    <mu-col span="4" sm="4" md="3" lg="3">
                        <mu-select v-model="gen.range.valence" class="range">
                            <mu-option v-for="(type,index) in gen.range_types" :key="'range_vale'+index" :label="type.text" :value="type.value"></mu-option>
                        </mu-select>
                    </mu-col>
                </mu-row>

                <mu-row gutter>
                    <mu-col span="6" sm="6" md="7" lg="7">
                        <mu-form-item label="popular">
                            <mu-slider v-model="gen.popularity" :min="0" :max="100" :step="1"></mu-slider>
                        </mu-form-item>
                    </mu-col>
                    <mu-col span="2" sm="2" md="2" lg="2">
                        <mu-text-field :value="gen.popularity" class="range" @change="(val)=> gen.popularity=parseInt(val)"></mu-text-field>
                    </mu-col>
                    <mu-col span="4" sm="4" md="3" lg="3">
                        <mu-select v-model="gen.range.popularity" class="range">
                            <mu-option v-for="(type,index) in gen.range_types" :key="'range_popu'+index" :label="type.text" :value="type.value"></mu-option>
                        </mu-select>
                    </mu-col>
                </mu-row>

                <mu-row gutter>
                    <mu-col span="12">
                        <mu-form-item label="mode" class="range">
                            <mu-radio v-model="gen.val.mode" :value="0" label="minor"></mu-radio>
                            <mu-radio v-model="gen.val.mode" :value="1" label="major"></mu-radio>
                        </mu-form-item>
                    </mu-col>
                </mu-row>

                <mu-row gutter>
                    <mu-col span="5" sm="6" md="8" lg="8">
                        <mu-form-item label="market">
                        <mu-select v-model="gen.val.market" class="range">
                            <mu-option label="JP" value="JP"></mu-option>
                        </mu-select>
                        </mu-form-item>
                    </mu-col>

                    <mu-col span="7" sm="6" md="4" lg="4">
                        <mu-form-item class="range">
                         <mu-switch v-model="gen.range.market"></mu-switch>
                        </mu-form-item>
                    </mu-col>
                </mu-row>
                <mu-divider></mu-divider>

                <mu-row gutter v-for="(seed,index) in gen.seeds" :key="'seed'+index">
                    <mu-col span="6" sm="6" md="5" lg="5">
                        <mu-form-item :label="(index===0) ? 'Seeds' : ''">

                            <mu-select v-model="seed.type" class="range">
                                <mu-option label="GENRE" value="GENRE"></mu-option>
                                <mu-option label="TRACK" value="TRACK"></mu-option>
                                <mu-option label="ARTIST" value="ARTIST"></mu-option>
                            </mu-select>

                        </mu-form-item>
                    </mu-col>
                    <mu-col span="6" sm="6" md="7" lg="7">
                        <mu-select v-model="seed.id" class="range" v-if="seed.type==='GENRE'">
                            <mu-option v-for="(genre,index) in spotify.genres" :key="'genres'+index" :label="genre" :value="genre"></mu-option>
                        </mu-select>
                        <mu-text-field v-model="seed.id" class="range" v-else></mu-text-field>
                    </mu-col>
                </mu-row>

                <mu-row gutter class="range">

                    <mu-col span="2" sm="2" md="2" lg="2">
                        <mu-button full-width color="indigo400" @click="orderChange">
                            <mu-icon value="low_priority"></mu-icon>
                        </mu-button>
                    </mu-col>

                    <mu-col span="6" sm="6" md="6" lg="6">
                        <mu-button color="primary" class="smallbtn" full-width @click="c_getCredential" v-if="!spotify.credential.expires_in">LOGIN</mu-button>
                        <mu-button full-width color="pink500" @click="generate" v-else>Generate</mu-button>
                    </mu-col>
                    <mu-col span="4" sm="4" md="4" lg="4">
                        <mu-button full-width color="secondary" @click="c_gen_condition_csv(gen)">CSV</mu-button>
                    </mu-col>
                </mu-row>
                <mu-divider></mu-divider>
            </mu-form>
        </mu-container>
        <br>
    </div>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex';
    import spotifyMixin from '../../mixins/spotify/index';

    import searchResList from '../List/SearchResList';
    export default {
        name: "AsideView",
        mixins:[spotifyMixin],
        components:{
          searchResList
        },
        computed:mapGetters(['spotify']),
        created(){
            this.gen = this.spotify.gen
        },
        mounted(){
            //this.generate();
        },
        data () {
            return {
                id_or_term:'term',
                gen:null
            }
        },
        methods:{
            ...mapActions(['a_index']),

            changeAction:function(val){
                this.a_spotify(['set','searchQuery',{key:'datatypes',val:val}]);
            },

            orderChange(){
                this.a_spotify(['reorder','seeds']);
            },

            generate(){
                    //パラメータをStoreに保存する
                    this.gen.val.popularity = this.gen.popularity;
                    this.a_spotify(['set','gen',this.gen]);

                    //レコメンデーションの取得を呼び出す
                    this.c_reco();
                },
            },
        watch:{
            'spotify.credential':{
                handler(){
                    if(!!this.spotify.credential.expires_in){
                        console.log("c_getMe call");
                        this.c_getMe();
                        console.log("c_getMyTopTracks call");
                        this.c_getMyTopTracks();
                    }
                },
                deep:true
            }
        }
    }
</script>

<style scoped lang="scss">
</style>
