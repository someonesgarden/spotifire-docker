<template>

    <mu-list-item-action @click="play">
        <mu-icon value="pause_circle_outline" v-if="spotify.player.playing && spotify.player.nowid === id"></mu-icon>
        <mu-icon value="play_circle_outline" v-else></mu-icon>
    </mu-list-item-action>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex';
    import spotifyMixin from '../../mixins/spotify/index';
    export default {
        name: "PlayBtn",
        mixins:[spotifyMixin],
        props:['id'],
        computed:mapGetters(['spotify']),
        methods:{
            ...mapActions(['a_spotify','a_index']),
            play(){
                if(this.spotify.player.playing && this.spotify.player.nowid === this.id){
                    //STOP
                    this.a_spotify(['player','stop',null]);
                }else{
                    //PLAY
                    this.a_spotify(['player','play',this.id]);

                    this.c_getTrack(this.id,(res)=>{
                        if(!!res.data){
                            this.a_spotify(['player','track',res.data]);
                            this.a_spotify(['set','track',　res.data]);
                            this.a_index(['bottom','open']);
                        }
                    },false);
                }
            }
        }
    }
</script>

<style scoped>

</style>
