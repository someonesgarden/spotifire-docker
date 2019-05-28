<template>
    <div class="flex-item flex-1">
        <!-- station -->
        <div class="push-bottom pad-bottom border-bottom">
            <div class="flex-row flex-middle">
                <img class="img-round fx fx-drop-in fx-delay-1" :src="spotify.players[info.id].channel.largeimage" width="80" height="80" :alt="spotify.players[info.id].channel.title" />
                <div class="pad-left fx fx-slide-left fx-delay-2">
                    <div class="text-clip text-uppercase">{{ spotify.players[info.id].channel.genre | toSpaces }}</div>
                    <h2 class="text-clip">{{ spotify.players[info.id].channel.title }}</h2>
                </div>
            </div>
        </div>
        <!-- description -->
        <div class="push-bottom pad-bottom border-bottom fx fx-slide-up fx-delay-3">
            {{ spotify.players[info.id].channel.description }}
        </div>
        <!-- current track -->
        <div class="push-bottom pad-bottom border-bottom fx fx-slide-up fx-delay-4" :key="spotify.players[info.id].track.date">
            <div><span class="text-faded">DJ:</span> <span class="text-default">{{ spotify.players[info.id].channel.dj | toText( 'N/A' ) }}</span></div>
            <div><span class="text-faded">Playing:</span> <span class="text-secondary">{{ spotify.players[info.id].track.title | toText( 'N/A' ) }}</span></div>
            <div><span class="text-faded">From:</span> <span class="text-bright">{{ spotify.players[info.id].track.album | toText( 'N/A' ) }}</span></div>
            <div><span class="text-faded">By:</span> <span class="text-default">{{ spotify.players[info.id].track.artist | toText( 'N/A' ) }}</span></div>
        </div>
        <!-- buttons -->
        <div class="push-bottom">
            <a class="cta-btn text-nowrap fx fx-slide-up fx-delay-5" :href="spotify.players[info.id].channel.twitter" title="Open link" target="_blank">
                <i class="fa fa-twitter"></i> Twitter
            </a> &nbsp;
            <a class="cta-btn text-nowrap fx fx-slide-up fx-delay-6" :href="spotify.players[info.id].channel.infourl" title="Channel page" target="_blank">
                <span class="fx fx-notx fx-ibk fx-drop-in fx-delay-1" :key="spotify.players[info.id].channel.listeners"><i class="fa fa-headphones"></i> {{ spotify.players[info.id].channel.listeners | toCommas( 0 ) }}</span>
            </a> &nbsp;
            <a class="cta-btn text-nowrap fx fx-slide-up fx-delay-7" :href="spotify.players[info.id].channel.plsfile" title="Download PLS" target="_blank">
                <i class="fa fa-download"></i>
            </a> &nbsp;
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "StationDetails",
        props:['info'],
        computed:mapGetters(['spotify'])
    }
</script>

<style scoped>

</style>
