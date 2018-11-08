// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import FastClick from 'fastclick';
import Vant, {
  Lazyload,
} from 'vant';
import vSelect from 'vue-select';
import 'vant/lib/vant-css/index.css';
import 'static/styles/main.scss';
import * as filters from './filters'; // global filters
import './mock'; // simulation data
import hHeader from '@/components/hHeader';
import Icon from 'vue-svg-icon/Icon.vue';
import './router/permission';
import {
  OsAction,
} from '@/utils/contactOs';
import AMap from 'vue-amap';
Vue.use(AMap);
AMap.initAMapApiLoader({
  // 高德的key
  key: '931d081122d6c5ff0b32ed70b413d412',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4',
});
window.OsAction = OsAction;
Vue.component('v-select', vSelect);
Vue.component('icon', Icon);
Vue.component('hHeader', hHeader);
// options 为可选参数，无则不传
Vue.use(Lazyload);
Vue.use(Vant);
FastClick.attach(document.body);
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
  },
  template: '<App/>',
});
