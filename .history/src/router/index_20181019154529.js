import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/car',
    },
    {
      path: '/car',
      name: 'carList',
      component: () => import('@/pages/new/list'),
      children: [
        {
          path: 'detail',
          name: 'Detail',
          component: () => import('@/pages/new/detail'),
        },
      ],
    },
    {
      path: '/rent',
      name: 'rentList',
      component: () => import('@/pages/rent/detail'),
      children: [
        {
          path: 'detail',
          name: 'RentDetail',
          component: () => import('@/pages/rent/detail'),
        },
      ],
    },
    {
      path: '/album',
      name: 'Album',
      component: () => import('@/pages/common/album'),
    },
  ],
});
