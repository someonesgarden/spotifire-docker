<template>
    <section class="player-channel flex-1" v-if="hasChannel && !hasErrors" :key="spotify.players[info.id].channel.id">
        <div class="flex-autorow flex-middle flex-stretch">
            <station-details :info="info"/>
            <songs-list :info="info"/>
        </div>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex';
    import stationDetails from './StationDetails';
    import songsList from './SongsList';

    export default {
        name: "SelectedChannelInfo",
        props:['info'],
        components:{
          stationDetails,
          songsList
        },
        computed:{
            ...mapGetters(['spotify']),

            hasChannel() {
                return this.spotify.players[this.info.id].channel.id ? true : false;
            },

            hasErrors() {
                return ( this.checkError( 'init' ) || this.checkError( 'stream' ) ) ? true : false;
            }
        },

        methods:{
            checkError( key ) {
                return ( key && this.spotify.players[this.info.id].errors.hasOwnProperty( key ) && this.spotify.players[this.info.id].errors[ key ] );
            },
        }
    }
</script>

<style scoped>

</style>
