import {mapGetters,mapActions} from 'vuex';

import baseMix from './base';

export default{
    mixins:[
        baseMix
    ],

    computed: mapGetters(['mapstore']),
    methods: mapActions(['a_mapstore'])
}
