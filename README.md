# mall_rcr

> 人车人商城

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

* vue + vue-router + vuex + axios
* 基于[vant](https://youzan.github.io/vant/#/zh-CN/intro)框架
* 使用mock模拟车辆相册数据 + 利用async/await和axios完成异步请求 (只是演示mockjs的基本使用)
* src/util/request:对axios进行基本项全局配置