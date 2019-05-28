<template>
    <section class="player-errors flex-1 text-center" v-if="hasErrors" key="errors">
        <div class="push-bottom fx fx-drop-in fx-delay-1">
            <i class="fa fa-plug text-huge text-faded"></i>
        </div>
        <div class="push-bottom fx fx-slide-up fx-delay-2">
            <h3>Oops, there's a problem!</h3>
        </div>
        <hr />
        <div class="text-primary push-bottom fx fx-slide-up fx-delay-3" v-if="spotify.players[info.id].errors.init" v-text="spotify.players[info.id].errors.init"></div>
        <div class="text-primary push-bottom fx fx-slide-up fx-delay-4" v-if="spotify.players[info.id].errors.stream" v-text="spotify.players[info.id].errors.stream"></div>
        <hr />
        <button class="cta-btn text-nowrap fx fx-slide-up fx-delay-5" @click="$emit('tryAgain')">
            <i class="fa fa-refresh"></i> Try again
        </button>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "SelectedTracksInfo",
        props:['info'],
        components:{
        },
        computed:{
            ...mapGetters(['spotify']),
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
