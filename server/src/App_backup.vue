<template>
  <div id="app" v-cloak class="app-wrap">
    <head-top></head-top>

      <player :info="infos[0]"></player>
<!--      <player :info="infos[1]"></player>-->
<!--     <player :info="infos[2]"></player>-->

      <main class="player-wrap" style="background-image:url('/static/img/ll2.jpg');background-size:cover;background-position:center center;">
        <div class="dw full">
          <div class="dw-panel dw-panel--focus">
            <div class="dw-panel__content bd--grey" style="background-color:#f9f9f9;color:white;background-image:url('/static/img/shibuya_bw.jpg');">
              <router-view></router-view>
            </div>
          </div>
        </div>
             <magazine></magazine>
      </main>

    <player :info="infos[2]"></player>

    <main class="player-wrap">
      <mu-container>
        <mu-bottom-nav style="background-color:inherit;color:inherit;">
          <mu-bottom-nav-item title="Recents" icon="restore"></mu-bottom-nav-item>
          <mu-bottom-nav-item title="Favorites" icon="favorite"></mu-bottom-nav-item>
          <mu-bottom-nav-item title="Nearby" icon="location_on"></mu-bottom-nav-item>
        </mu-bottom-nav>
      </mu-container>
    </main>

    <mu-bottom-sheet :open.sync="bottom.open">
      <mu-flex class="flex-wrapper" justify-content="center" align-items="center">
        <mu-flex justify-content="center" fill style="background-color:green;">
        </mu-flex>
      </mu-flex>
    </mu-bottom-sheet>

  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
import HeadTop from './components/Common/Header.vue';
import Player from './components/Spotify/Player/Player.vue';
import Magazine from './components/Layout/Magazine.vue';

export default {
  name: 'app',
  components: {
    'head-top':HeadTop,
    'player':Player,
      'magazine':Magazine
  },
  computed:mapGetters(['bottom']),
  methods:mapActions(['a_index']),

  data:function(){
    return{
      infos:[
       {
      title:'令和の名言',
              subtitle:'令和の名言!!!!',
              description:'「それはこれから人生の混沌の中で見つけ出していきます」',
              btn1label:'ステーション',
              bg:'/static/img/bg1.jpg',
              btncolor:'#1e7019',
              id:'no1'
    },

        {
          title:'昨日のできごとから。',
          subtitle:'昨日のできごとから。',
          description:'「それはこれから人生の混沌の中で見つけ出していきます」',
          btn1label:'ステーション',
          bg:'/static/img/bg2.jpg',
          btncolor:'#c81645',
          id:'no1'
        },
        {
          title:'昨日のできごとから。',
          subtitle:'昨日のできごとから。',
          description:'「それはこれから人生の混沌の中で見つけ出していきます」',
          btn1label:'ステーション',
          bg:'/static/img/bg3.jpg',
          btncolor:'#c8a800',
          id:'no1'
        },
      ]
    }
  }
}
</script>

<style lang="scss">
  @import "scss/variables";
  @import "scss/mixins";
  @import "scss/app";
  @import "scss/parts/layout/driveway";
  @import "scss/driveway";


</style>
