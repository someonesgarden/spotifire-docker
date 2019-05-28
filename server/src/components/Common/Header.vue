<template>
    <div id="HeaderTop" class="nav-header">
        <mu-appbar class="mu-appbar-header">
            <mu-button slot="left" @click="side.left.open = true" class="top-icon">
                <mu-icon value="border_left"></mu-icon>
            </mu-button>

            <img class="menu-icon" src="/static/img/spotifire_logo.png" style="width:110px; height:auto;">

            <mu-button flat slot="right" @click="side.right.open=true">
                <mu-icon value="border_right"></mu-icon>
            </mu-button>

        </mu-appbar>

        <mu-drawer :open.sync="side.left.open" :docked="side.left.docked" :width="300">
            <mu-list>
                <aside-view @rightopen="side.right.open=true"></aside-view>
            </mu-list>
        </mu-drawer>

        <mu-drawer :open.sync="side.right.open" :docked="side.right.docked" :right="true" :width="300">
            <mu-list>
                <playlist-view @leftopen="side.left.open=true" @close="side.right.open=false" @open="side.right.open=true"/>
            </mu-list>
        </mu-drawer>

        <mu-button fab small color="grey500" @click="a_index(['bottom','open'])" range style="position:fixed;bottom:60px;left:10px;z-index:10;">
            <mu-icon value="border_bottom"></mu-icon>
        </mu-button>

        <mu-button fab small color="black" @click="side.left.open=true" range style="position:fixed;bottom:10px;left:10px;z-index:10;">
            <mu-icon value="border_left"></mu-icon>
        </mu-button>

        <mu-button fab small color="black" @click="side.right.open=true" range style="position:fixed;bottom:10px;right:10px;z-index:10;">
            <mu-icon value="border_right"></mu-icon>
        </mu-button>

    </div>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex';

    import AsideView from './AsideView';
    import PlaylistView from './PlaylistView';

    export default {
        name: 'myheader',
        components:{
            AsideView,
            PlaylistView
        },
        data:function(){
            return{
                side:{
                    left:{
                        open:false,
                        docked:false
                    },
                    right:{
                        open:false,
                        docked:false
                    }
                }
            }
        },
        computed:mapGetters(['bottom','rootAction']),
        methods:mapActions(['a_index']),

        watch:{
            'rootAction':{
                handler(newAction){
                    if(newAction.type==='leftopen') this.side.left.open = true;
                },deep:true
            }
        }
    }
</script>
<style>
    .mu-appbar-header {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 101;
        overflow: hidden;
    }

    button.top-icon{
        -webkit-box-shadow:inherit;
        box-shadow:inherit;
        background-color:inherit;
    }

</style>
