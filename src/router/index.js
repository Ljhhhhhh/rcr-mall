import Vue from 'vue';
import Router from 'vue-router';
import Detail from '@/pages/detail';
import Album from '@/pages/album';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/detail'
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/album',
      name: 'Album',
      component: Album
    }
  ]
});
