import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/detail',
    },
    {
      path: '/cars',
      name: 'Cars',
      component: () => import('@/pages/new'),
    },
    {
      path: '/detail',
      name: 'Detail',
      component: () => import('@/pages/new/detail'),
    },
    {
      path: '/album',
      name: 'Album',
      component: () => import('@/pages/common/album'),
    },
    {
      path: '/rent-detail',
      name: 'RentDetail',
      component: () => import('@/pages/rent/detail'),
    },
  ],
});
