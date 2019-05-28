<template>
    <mu-flex justify-content="center" align-items="center">
        <mu-flex justify-content="center"  direction="column" class="inner">

            <mu-flex justify-content="center" class="param_area">
                <bottom-slider></bottom-slider>
            </mu-flex>
            <mu-flex justify-content="center" class="player_area" v-if="!!spotify.player.track">
                <mu-chip class="demo-chip" color="black">
                    <mu-avatar :size="32" v-if="spotify.player.track.album.images">
                        <img :src="spotify.player.track.album.images[0].url">
                    </mu-avatar>
                    <span class="status">{{spotify.player.playing ? "now playing" : "stopped"}}</span>
                    <div>
                        <span class="artist"><mu-icon value="mic"></mu-icon>{{spotify.player.track.artists[0].name}}</span>
                        <span class="track"><mu-icon value="music_note"></mu-icon>{{spotify.player.track.name}}</span>
                        <span class="album"><mu-icon value="album"></mu-icon>{{spotify.player.track.album.name}}</span>
                    </div>

                    <mu-icon value="pause_circle_outline" v-if="spotify.player.playing" @click="a_spotify(['player','stop',null])"></mu-icon>
                    <mu-icon value="play_circle_outline" v-else @click="a_spotify(['player','play',spotify.player.track.id])"></mu-icon>

                </mu-chip>
            </mu-flex>
        </mu-flex>
    </mu-flex>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex';
    import BottomSlider from './BottomSlider';
    export default {
        name: "BottomView",
        components:{
          BottomSlider
        },
        computed:mapGetters(['spotify']),
        methods:mapActions(['a_spotify'])
    }
</script>

<style scoped lang="scss">
</style>
