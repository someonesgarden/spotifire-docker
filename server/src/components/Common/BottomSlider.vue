<template>
    <div class="bookmark__container">
        <carousel :autoplay="false" :dots="false" :per-page="col" :col="col" :nav="false" v-if="spotify.bookmarks">

            <slide class="inner" v-for="(track,index) in spotify.bookmarks" :key="'mytrack'+index">
                    <img class="thumb" :src="track.album.images[0].url" @click="play(track)">
            </slide>
        </carousel>
    </div>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex';
    export default {
        name: "BottomSlider",

        computed:{
            ...mapGetters(['spotify']),

            col(){
                return Math.floor(window.innerWidth  / 100)-1;
            }
        },

        methods:{
            ...mapActions(['a_spotify']),

            play(track){
                console.log("play!",track.id);
                this.a_spotify(['player','track',track]);
                this.a_spotify(['player','play',track.id]);
            }
        }
    }
</script>

<style scoped lang="scss">

    .bookmark__container{
        width:100%;
        height:100px;

        .inner{
            height:100px;
            img.thumb{
                width:auto;
                height:100%;
            }
        }


    }


</style>
