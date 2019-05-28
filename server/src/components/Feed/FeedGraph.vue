<template>
    <div class="flex_v graphbase" ref="graphbase" @click="callGenerator">
        <chart ref="pchart" :type="'polarArea'" :data="seriesData" :options="spotify.pichart.options" class="radar_chart" :height="350" v-if="af" />
    </div>
</template>

<script>
    import Chart from '../Chart/Chartjs';
    import {mapActions,mapGetters} from 'vuex';

    export default {
        name: "FeedGraph",
        props:['feature'],
        components:{Chart},

        data(){
            return {
                af:null
            }
        },

        mounted(){
            this.af = this.feature;

        },

        computed: {
            ...mapGetters(['spotify']),

            seriesData () {
                let music_keys = this.spotify.music_keys;
                let af_data = [
                    [
                        this.af.acousticness*100,
                        this.af.danceability*100,
                        this.af.energy*100,
                        this.af.instrumentalness*100,
                        this.af.liveness*100,
                        this.af.speechiness*100,
                        this.af.valence*100],
                ];

                let data = {
                    labels: this.spotify.labels
                };

                let af_series = [music_keys[this.af.mode]+" "+this.af.tempo+"bpm "+this.af.loudness+"dB"];

                data.datasets = af_series.map((e, i) => {
                    return {
                        data:                   af_data[i],
                        label:                  af_series[i],
                        borderColor:            this.spotify.backgroundColors[i],
                        pointBackgroundColor:   this.spotify.backgroundColors[i],
                        backgroundColor:        this.spotify.backgroundColors[i]
                    }
                });
                return data
            }
        },

        methods:{
            ...mapActions(['a_index','a_spotify']),

            callGenerator(){
                this.a_spotify(['set', 'feature', {popularity: 30, val: this.feature}]);

                let seeds  = [
                    {
                        type: 'TRACK',
                        id: this.spotify.dummy_tracks[Math.floor(Math.random()*(this.spotify.dummy_tracks.length+1))]
                    }, {
                    type: 'ARTIST',
                        id: this.spotify.dummy_artists[Math.floor(Math.random()*(this.spotify.dummy_artists.length+1))]
                }];

                for(let i=0;i<3;i++) seeds.push({ type: 'GENRE', id: this.spotify.dummy_genres[Math.floor(Math.random()*(this.spotify.dummy_genres.length+1))]});

                this.a_spotify(['set','seeds',seeds]);
                this.a_index(['root', 'action', 'leftopen']);
            }
        }
    }
</script>

<style scoped lang="scss">

    .graphbase{
        height:100%;

        &.wide{

        }
    }


</style>
