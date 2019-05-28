import {mapGetters,mapActions} from 'vuex';

import playerMix from './player';

export default{
    mixins:[
        playerMix
    ],
    computed: mapGetters(['spotify']),
    methods: mapActions(['a_spotify'])
}
