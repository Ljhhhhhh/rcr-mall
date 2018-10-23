import Vue from 'vue';
import Router from 'vue-router';
import Detail from '@/pages/new/detail';
import Album from '@/pages/common/album';
import RentDetail from '@/pages/rent/detail';

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
      component: () => import('@/pages/new/detail'),
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
