import Vue from 'vue';
import Router from 'vue-router';
import Detail from '@/pages/detail';
import Album from '@/pages/album';
import RentDetail from '@/pages/rentDetail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/detail',
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
    },
    {
      path: '/album',
      name: 'Album',
      component: Album,
    },
    {
      path: '/rent-detail',
      name: 'RentDetail',
      component: RentDetail,
    },
  ],
});
