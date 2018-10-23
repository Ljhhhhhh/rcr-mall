// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import FastClick from 'fastclick';
import Vant, {Lazyload} from 'vant';
import 'vant/lib/vant-css/index.css';
import 'static/styles/main.scss';
import * as filters from './filters'; // global filters
import './mock'; // simulation data
import hHeader from '@/components/hHeader';

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
  components: { App },
  template: '<App/>',
});
