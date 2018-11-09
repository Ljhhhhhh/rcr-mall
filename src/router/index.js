import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/car',
  },
  {
    path: '/car',
    name: 'carList',
    component: () => import('@/pages/new/list'),
  },
  {
    path: '/car-detail/:id',
    name: 'Detail',
    component: () => import('@/pages/new/detail'),
    meta: {
      title: '车辆详情',
    },
  },
  {
    path: '/rent',
    name: 'rent',
    component: () => import('@/pages/rent/rent'),
  },
  {
    path: '/rentlist',
    name: 'rentList',
    component: () => import('@/pages/rent/list'),
    meta: {
      title: '租车列表',
    },
  },
  {
    path: '/rent/detail/:id',
    name: 'rentDetail',
    component: () => import('@/pages/rent/detail'),
  },
  {
    path: '/second',
    name: 'secondList',
    component: () => import('@/pages/second/list'),
    meta: {
      title: '二手车',
    },
  },
  {
    path: '/sale',
    name: 'secondSale',
    component: () => import('@/pages/second/sale'),
    meta: {
      title: '卖车',
    },
  },
  {
    path: '/second-detail/:id',
    name: 'secondDetail',
    component: () => import('@/pages/second/detail'),
    meta: {
      title: '车辆详情',
    },
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
  {
    path: '/car-mode-select',
    name: 'carModeSelect',
    component: () => import('@/pages/common/allCar'),
  },
  ],
});
