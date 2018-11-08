import router from './index';

router.beforeEach((to, from, next) => {
  console.log(router);
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = '人车人商城';
  }
  next();
});
