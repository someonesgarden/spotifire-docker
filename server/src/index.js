import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import MuseUI from 'muse-ui'
Vue.use(MuseUI);

import theme from 'muse-ui/lib/theme';
//import * as colors from 'muse-ui/lib/theme/colors';
theme.add('teal', {
  primary: '#17b06f',
  secondary: '#1c1c1c',
  warning:'#4259fd',
  success: '#4caf50',
  track: '#00bd81',
}, 'light');
theme.use('teal');

Vue.config.productionTip = false

import VueMasonry from 'vue-masonry-css'
Vue.use(VueMasonry);

import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

import './filters';

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
})
