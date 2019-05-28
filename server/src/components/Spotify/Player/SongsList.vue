<template>
    <div class="flex-item flex-1">
        <div class="push-bottom">
            <h5 class="fx fx-slide-left fx-delay-1">Recent Tracks</h5>
        </div>
        <div class="card push-bottom" v-if="!hasSongs">
            There are no songs loaded yet for this station.
        </div>
        <ul class="player-tracklist push-bottom" v-if="hasSongs">
            <li v-for="( s, i ) of songsList" :key="s.date" class="card fx" :class="'fx-slide-left fx-delay-' + ( i + 2 )">
                <div><span class="text-secondary">{{ s.title | toText( 'N/A' ) }}</span></div>
                <div><span class="text-faded">From:</span> <span class="text-bright">{{ s.album | toText( 'N/A' ) }}</span></div>
                <div><span class="text-faded">By:</span> <span class="text-default">{{ s.artist | toText( 'N/A' ) }}</span></div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "SongsList",
        props:['info'],
        computed:{
            ...mapGetters(['spotify']),

            hasSongs() {
                return this.spotify.players[this.info.id].songs.length ? true : false;
            },

            songsList() {
                let list = this.spotify.players[this.info.id].songs.slice();
                return list;
            }
        }
    }
</script>

<style scoped>

</style>
