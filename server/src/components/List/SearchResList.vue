<template>
    <mu-col span="12" sm="12" md="12" lg="12" xl="12" v-if="spotify[type+'s']" style="width:100%;">
        <p style="margin-top:5px;">
            <strong>{{spotify[type+'s'].items.length}} {{type}}</strong> ({{spotify[type+'s'].total}})
        </p>
        <mu-select :value="spotify[type].id" @change="changeAction" v-if="spotify[type+'s'].items.length>0" class="range">
            <mu-option v-for="(item, index) in spotify[type+'s'].items" :key="type+'_'+index" :label="item.name" :value="item.id" class="range"></mu-option>
        </mu-select>
    </mu-col>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex';
    export default {
        name: "SearchResList",
        props:['type'],
        computed:mapGetters(['spotify']),
        methods:{
            ...mapActions(['a_spotify']),

            changeAction(val){

                if(this.type==='playlist'){
                    this.a_spotify(['set','playlistID', val]);
                } else{
                    this.a_spotify(['set',this.type, val]);
                }

                this.a_spotify(['update','item',this.type]);
            }
        }
    }
</script>
