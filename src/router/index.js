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
    },
    {
      path: '/car-detail',
      name: 'Detail',
      component: () => import('@/pages/new/detail'),
      meta: {
        title: '车辆详情',
      },
    },
    {
      path: '/rent',
      name: 'rentList',
      component: () => import('@/pages/rent/list'),
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
    {
      path: '/city-select',
      name: 'citySelect',
      component: () => import('@/pages/common/citySelect'),
    },
  ],
});
