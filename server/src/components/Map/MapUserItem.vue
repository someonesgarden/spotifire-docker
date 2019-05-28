<template>
    <mu-list-item avatar button :ripple="false" class="range user" v-if="user" :class="{disconnected:!ws.you.connected, you:user.name===ws.you.name}" @click="userItemClick">
        <mu-list-item-title>{{user.name}}</mu-list-item-title>
    </mu-list-item>
</template>


<script>
    import {mapGetters,mapActions} from 'vuex';
    import mapMixin from '../../mixins/map/index';
    import spotifyMixin from '../../mixins/spotify/index';
    export default {
        name: "MapUserItem",
        props:['user'],
        mixins:[mapMixin,spotifyMixin],
        computed:mapGetters(['ws','spotify',]),
        methods:{
            ...mapActions(['a_mapstore','a_spotify','a_index']),

            userItemClick(){
               this.a_mapstore(['set','tracking',false]);

               this.$emit('mapPanTo',this.user.lat,this.user.lng);

               this.play();
            },

            play(){
                let tid = this.user.tid ? this.user.tid : '62LJFaYihsdVrrkgUOJC05';
                this.a_spotify(['player','play',tid]);
                this.c_getTrack(tid,(res)=>{
                    if(!!res.data){
                        this.a_spotify(['player','track',res.data]);
                        this.a_index(['bottom','open']);
                    }
                },false);
            }

        }

    }
</script>

<style scoped lang="scss">


    li.user{

        &.disconnected{
            opacity:0.3;
            pointer-events: none;
        }

        &.you{
            background-color: #e6004c;
            color:white;
            font-weight:bold;
            margin:3px;
            border-radius:3px;
        }
    }



</style>
