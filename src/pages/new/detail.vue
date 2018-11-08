<template>
  <!-- <transition name="slide"> -->
  <div class="container detail">
    <!-- {{uaInfo}} -->
    <h-header title="车辆详情" v-if="!fromApp">
      <i class="share" slot="right" @click="share"></i>
    </h-header>
    <div class="scroll-wrap">
      <div class="scroll-content">
        <div class="banner" v-if="bannerList.length">
          <swiper :options="swiperOption" ref="mySwiper" @slideChange="bannerChange">
            <swiper-slide v-for="(banner, index) in bannerList" :key="index" @click.native="preview(index+1)">
              <img :src="banner.url">
            </swiper-slide>
          </swiper>
          <div class="indicators">
            {{bannerIndex | padStartIndex(bannerList)}}/{{bannerList.length}}
          </div>
        </div>
        <div class="car-info_head">
          <div class="car-info_title">
            <h-tag tag="厂家直供" />
            <p>{{carInfo.name}}</p>
          </div>
          <p class="car-info_spec">{{carInfo.color}}</p>
          <p class="car-info_sale">
            <span>厂商指导价：{{carInfo.price | formatPrice}}元</span>
            <span><i></i> 已售{{carInfo.sale}}台</span>
          </p>
        </div>
        <div class="car-info_explain">
          <template v-for="(item, index) in carInfo.actives">
            <p v-if="index < 2" :key="index">
              <h-tag :tag="item.name" style="background:#ED1E03" />
              <span>{{item.remark}}</span>
            </p>
          </template>
          <!-- <p>
            <h-tag tag="5%首付" style="background:#ED1E03" /><span>该车型首付款为厂商指导价的5%，数量有限数量有限。</span></p>
          <p>
            <h-tag tag="送皮座椅" style="background:#ED1E03" /><span>购车即送价值1000元真皮座椅，仅限前20位仅限前20位。</span></p> -->
          <i class="arrow-more_icon" @click="infoDetailShow"></i>
        </div>
        <div class="car-info_program van-hairline--bottom" ref="program">
          <ul class="tab_item">
            <li v-for="(item, index) in Object.keys(programList)" :key="index" :class="{active:index===programActive}"
              @click="setProgram(index)">{{item}}</li>
          </ul>
          <div class="tab-content">
            <div class="wrap">
              <div class="tab-content_item" :class="{active:index===programActive}" v-for="(item, index) in Object.values(programList)"
                :key="index">
                <div>
                  <p>首付({{item.payrate}}%)</p>
                  <p>{{item.first | formatPrice}}元</p>
                </div>
                <div>
                  <p>月供</p>
                  <p>{{item.month | formatPrice}}元</p>
                </div>
                <div>
                  <p>期数</p>
                  <p>{{item.num}}期</p>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="link-all_btn" @click="showProjectDetail"><span>查看方案详情</span>
            <van-icon name="arrow" class="icon" />
          </div> -->
        </div>
        <div class="divide-border"></div>
        <div class="car-info_configuration">
          <!-- 基本配置 -->
          <h-content-title title="基本配置"></h-content-title>
          <div class="info-configuration_list">
            <ul>
              <li v-for="(val, key) of carConfiguration" :key="key" class="van-hairline--bottom">
                <label>{{configurationMap[key]}}</label>
                <span>{{val}}</span>
              </li>
            </ul>
            <!-- <div class="link-all_btn" @click="showAllConfig"><span>查看全部配置</span>
              <van-icon name="arrow" class="icon" />
            </div> -->
          </div>
        </div>
        <div class="car-info_advantage">
          <h-content-title title="车型亮点"></h-content-title>
          <div class="content">
            <div v-html="carInfo.content"></div>
          </div>
        </div>
        <!--用户自定义：亮点 -->
        <div class="divide-border"></div>
        <div class="car-info_step">
          <h-content-title title="轻松四步 新车开回家"></h-content-title>
          <div class="content">
            <div v-html="carInfo.article"></div>
          </div>
        </div>
        <!--用户自定义：步骤 -->
        <div class="divide-border"></div>
        <div class="car-recommend">
          <h-content-title title="为你推荐"></h-content-title>
          <div class="recommend-list_box">
            <div class="recommend-list van-hairline--surround" v-for="(recommend, index) in recommendList" :key="index"
              @click="recommendCar(recommend.id)">
              <p>{{recommend.tags}}</p>
              <img :src="recommend.thumb">
              <div>
                <span>{{recommend.title}}</span>
                <!-- <span>2016款 混动2.0L</span> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h-to-top :show="toTopShow" @scrollToTop="scrollToElement"></h-to-top>
    <keep-alive>
      <h-consult @changeFollow="changeFollow" :following="carInfo.follow" @addOrder="addOrder"></h-consult>
    </keep-alive>
    <div class="fix-top_tab van-hairline--bottom" :class="{'from-app': fromApp}" v-show="topTabActive.state">
      <div class="top-tab_box">
        <span class="top-tab_item" :class="{active:i===topTabActive.index}" v-for="(tab, i) in topTabElemMap" :key="i"
          @click="scrollToElement(i)">
          {{tab.title}}
        </span>
      </div>
    </div>
  </div>
  <!-- </transition> -->
</template>
<script>
import hTag from '@/components/hTag';
import hContentTitle from '@/components/hContentTitle';
import hConsult from '@/components/hConsult';
import 'swiper/dist/css/swiper.css';
import {
  swiper,
  swiperSlide,
} from 'vue-awesome-swiper';
import {
  mapMutations,
  mapGetters,
} from 'vuex';
import clearupList from '@/utils/clearupAlbumlist';
import BScroll from 'better-scroll';
import hToTop from '@/components/hToTop';
import {
  carDetail,
} from '@/api/car/carDetail';
import {
  changeFollow,
} from '@/api/car/carFollow';
import {
  addOrder,
} from '@/api/order/order';
import {
  webAction,
} from '@/utils/contactOs';
  // window.userinfo = {
  //   userToken: 'qm30apwcqvmzks5t9icxp9gagnq2kv2e',
  //   isLogin: true,
  //   userId: 10,
  //   fromApp: 1,
  //   cardId: 12,
  // };

export default {
  name: 'Detail',
  data() {
    return {
      carId: 12,
      topResrvedOffset: 45, // 顶部tab预留高度
      swiperOption: {
        // swipe配置
        loop: true,
      },
      bannerIndex: 1,
      bannerList: [],
      carInfo: {},
      programList: [],
      programActive: 0,
      carConfiguration: {},
      configurationMap: {
        discharge_standard: '排放标准',
        gear_type: '变速箱',
        liter: '排量',
        maker_type: '生产商类型',
        seat_number: '座位数',
        year: '年款',
      },
      scroll: null,
      toTopShow: false,
      topTabActive: {
        state: false,
        index: null,
      },
      recommendList: [],
      topTabElemMap: [{
        title: '金融方案',
        elem: '.car-info_program', // 金融方案
        offsetTop: '',
      },
      {
        title: '车辆信息',
        elem: '.car-info_configuration', // 车辆信息
        offsetTop: '',
      },
      {
        title: '购车说明',
        elem: '.car-info_step', // 购车说明
        offsetTop: '',
      },
      {
        title: '为您推荐',
        elem: '.car-recommend', // 为您推荐
        offsetTop: '',
      },
      ],
      uaInfo: null,
    };
  },
  created() {
    // eslint-disable-next-line
      // window.userinfo = {
    //   isLogin: true,
    //   carId: 12,
    //   formApp: 1,
    //   userId: 123,
    //   userToken: 'qm30apwcqvmzks5t9icxp9gagnq2kv2e',
    // };
    this.userinfo = window.userinfo;
    this.getCarId() && this.getCarDetail();
  },
  mounted() {
    this._initPage();
  },
  watch: {
    $route: function (to, from) {
      if (from.name === 'storeSelect') {
        this.show = true;
      }
      this.getCarId() && this.getCarDetail();
      this.topTabActive.state = false;
      this.scroll.scrollTo(0, 0);
      // this._initPage();
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    ...mapGetters(['fromApp']),
  },
  // beforeRouteUpdate (to, from, next) {
  //   next();
  //   // react to route changes...
  //   // don't forget to call next()
  // },
  methods: {
    addOrder() {
      addOrder(this.carId, this.carInfo.price, this.carInfo.deptId, this.carInfo.financeId, 'news').then(res => {
        if (res.errno === 0) {
          webAction({
            type: 'alert',
            message: '预约成功',
          });
        }
      });
    },
    getCarId() {
      this.carId = this.$route.params.id || window.carId;
      if (!this.carId) {
        this.$router.push({
          path: '/car',
        });
        return false;
      }
      return true;
    },
    recommendCar(id) {
      // this.carId = id;
      this.$router.push({
        path: '/car-detail/' + id,
      });
      // this.$router.push({
      //   name: 'Detail',
      //   params: {
      //     id,
      //   },
      // });
      // this.getCarDetail();
      // this.scroll.scrollTo(0, 0, 300);
    },
    async getCarDetail() {
      let res = await carDetail(this.carId); // 12是车的ID
      // 整理banner列表，使其按照type归类
      let data = res.data;
      let mode = data.modes[0];
      this.bannerList = clearupList(res.data.imgs);
      this.carInfo = {
        name: mode.name,
        follow: data.follow > 0,
        price: data.price,
        sale: data.sale,
        content: data.content,
        article: data.article.content,
        actives: data.acts,
        color: mode.colors ? mode.colors.split(',').join('、') : '',
        deptId: data.dept_id,
        financeId: data.finances[0].id ? data.finances[0].id : '暂时未获取',
      };
      this.carConfiguration = {
        discharge_standard: mode.discharge_standard,
        gear_type: mode.gear_type,
        liter: mode.liter,
        maker_type: mode.maker_type,
        seat_number: mode.seat_number,
        year: mode.year,
      };
      let finances = {};
      data.finances.forEach(item => {
        if (!finances[item.name]) {
          finances[item.name] = {
            first: item.first,
            month: item.month,
            num: item.num,
            payrate: item.payrate,
            id: 1,
          };
        }
      });
      this.programList = finances;
      this.recommendList = data.products;
    },
    async changeFollow() {
      let res = await changeFollow(this.carId);
      if (res.errno === 0) {
        this.carInfo.follow = !this.carInfo.follow;
      }
    },
    preview(index) {
      console.log('index:', index);
      this.set_albumlist(this.bannerList);
      this.$router.push({
        name: 'Album',
        query: {
          index,
        },
      });
    },
    setProgram(index) {
      let arr = document.querySelectorAll('.tab-content_item');
      Array.from(arr).forEach((item, i) => {
        if (i > index) {
          arr[i].style.transform = 'translateX(110%)';
        } else if (i < index) {
          arr[i].style.transform = 'translateX(-110%)';
        } else {
          arr[i].style.transform = 'none';
        }
      });
      this.programActive = index;
    },
    slideChangeTransitionStart() {
      console.log(123);
    },
    bannerChange() {
      this.bannerIndex = this.swiper.realIndex + 1;
    },
    share() {
      alert('APP实现分享功能');
    },
    showProjectDetail() {
      alert('查看方案详情');
    },
    showAllConfig() {
      alert('查看全部配置');
    },
    infoDetailShow() {
      alert('展示活动详情');
    },
    scrollToElement(index) {
      if (!index && index !== 0) {
        this.scroll.scrollTo(0, 0, 300);
      } else {
        this.scroll.scrollToElement(
          this.topTabElemMap[index]['elem'],
          300,
          0,
          -this.topResrvedOffset
        );
      }
    },
    _scroll(pos) {
      // 初始化每个元素对应的滚动高度
      if (!this.topTabElemMap[0]['offsetTop']) {
        this.topTabElemMap.forEach((item, index) => {
          let offsetTop = document.querySelector(item.elem).offsetTop;
          item.offsetTop = offsetTop;
        });
      }

      // 回到顶部按钮的显隐控制
      if (-pos.y > this.topTabElemMap[0]['offsetTop']) {
        this.toTopShow = true;
      } else {
        this.toTopShow = false;
      }
      let activeIndex = -1;
      this.topTabElemMap.forEach((item, index) => {
        let scrollY = -pos.y;
        if (scrollY > item.offsetTop - this.topResrvedOffset - 5) {
          activeIndex = index;
        }
      });
      this.topTabActive.index = activeIndex;
      if (this.topTabActive.index < 0) {
        this.topTabActive.state = false;
      } else {
        this.topTabActive.state = true;
      }
    },
    _initPage() {
      // 设置scroll滚动
      let scrollWrap = document.querySelector('.scroll-wrap');
      let docHeight = document.documentElement.clientHeight;
      let scrollWrapHeight = this.fromApp ? docHeight - 64 + 'px' : docHeight - 104 + 'px';
      scrollWrap.style.height = scrollWrapHeight;
      this.scroll = new BScroll('.scroll-wrap', {
        click: true,
        probeType: 3,
      });
      this.scroll.on('scroll', pos => {
        this._scroll(pos);
      });
      this.scroll.on('scrollEnd', pos => {
        let stateFlag = this.topTabElemMap[0].offsetTop;
        if (-pos.y > stateFlag) {
          this.topTabActive.state = true;
        } else {
          this.topTabActive.state = false;
        }
      });
    },
    ...mapMutations({
      set_albumlist: 'SET_ALBUMLIST',
    }),
  },
  components: {
    hTag,
    hContentTitle,
    hConsult,
    swiper,
    swiperSlide,
    hToTop,
  },
};

</script>
<style lang="scss" scoped>
  .scroll-wrap {
    width: 100%;
    height: calc(100vh - 104px);
    overflow: hidden;
  }

  .share {
    display: inline-block;
    width: 19px;
    height: 17px;
    background: red;
    background: $icon_sprite;
    background-size: 31px 327px;
    background-position: -4px -224px;
    vertical-align: -3px;
  }

  .banner {
    width: 100%;
    height: auto;
    position: relative;
    margin-bottom: 20px;

    img {
      width: 100%;
      height: auto;
    }

    .indicators {
      position: absolute;
      bottom: rem(10);
      right: rem(15);
      color: #999;
      font-size: rem(12);
      font-family: $font_bold;
      letter-spacing: rem(2);
      z-index: 3;
    }
  }

  .car-info_head {
    width: auto;
    height: auto;
    box-sizing: border-box;
    margin: 0 rem(15);
    padding-bottom: 20px;

    .car-info_title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: rem(18);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      p {
        color: $font_theme;
        font-size: rem(17);
        font-family: $font_bold;
      }
    }

    .car-info_spec {
      color: $font_vice;
      font-size: rem(12);
      margin-top: 18px;
    }

    .car-info_sale {
      color: $font_vice;
      font-size: rem(12);
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: rem(12);
      line-height: rem(12);

      span:last-child {
        position: relative;

        i {
          position: absolute;
          display: inline-block;
          height: 18px;
          width: 16px;
          background: red;
          left: -19px;
          bottom: 0;
          background: $icon_sprite;
          background-size: 34px 325px;
          background-position: -5px -247px;
        }
      }
    }
  }

  .car-info_explain {
    margin: 10px rem(15) 12px;
    position: relative;

    p {
      width: 90%;
      font-size: rem(12);
      color: $font_vice;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 5px;
    }
  }

  .link-all_btn {
    text-align: center;
    padding-bottom: 15px;
    color: $font_vice;
    font-size: rem(12);

    span {
      border-bottom: 1px solid $font_vice;
      vertical-align: middle;
      display: inline-block;
      margin-right: rem(15);
    }

    .icon {
      vertical-align: -3px;
    }
  }

  .car-info_program {
    width: auto;
    height: auto;

    .tab_item {
      width: auto;
      height: 40px;
      background: #ecf8ff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 10px rem(15) 0;
      color: #666;
      font-family: $font_bold;
      font-size: rem(15);

      li {
        height: 40px;
        line-height: 40px;
        padding: 0 rem(11);
        position: relative;

        &::after {
          content: "";
          position: absolute;
          width: rem(25);
          height: 4px;
          border-radius: rem(2);
          background: $color_theme;
          bottom: 0;
          left: 50%;
          transition: 0.6s all ease;
          transform: translate3d(-50%, 0, 0) scaleX(0);
        }

        &.active {
          color: $color_theme;
          background: #fff;

          &::after {
            position: absolute;
            transform: translate3d(-50%, 0, 0) scaleX(1);
          }
        }
      }
    }

    .tab-content {
      width: 100%;
      height: 56px;
      padding: 0 rem(15);
      box-sizing: border-box;
      margin: 15px 0;

      .wrap {
        width: 100%;
        height: 56px;
        position: relative;
        overflow: hidden;
      }

      .tab-content_item {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        text-align: center;
        background: #ecf8ff;
        min-width: 100%;
        max-width: 100%;
        margin-right: rem(15);
        transition: 0.6s all ease;
        transform: translateX(110%);
        transform-origin: left;

        &.active {
          transform: translateX(0);
          width: 100%;
        }

        div {
          padding: 5px 0;
          flex: 1;

          p:first-child {
            color: $font_theme;
            font-size: rem(12);
          }

          p:last-child {
            color: $color_vice;
            font-size: rem(17);
            margin-top: 3px;
            font-family: $font_bold;
          }
        }
      }
    }
  }

  .car-info_configuration {
    padding: 0 rem(15);
    width: auto;
    height: auto;
    margin: 30px auto;
    color: $font_theme;
    text-align: center;

    .info-configuration_list {
      margin-top: 30px;

      ul {
        margin-bottom: 20px;
      }

      ul li {
        line-height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        label,
        span {
          flex: 1;
        }

        label {
          text-align: left;
        }

        span {
          text-align: right;
        }
      }
    }
  }

  .car-info_advantage,
  .car-info_step {
    margin-bottom: 15px;
  }

  .car-info_step {
    margin-top: 30px;
  }

  .content {
    margin-top: 30px;
    padding: 0 rem(15);
  }

  .car-recommend {
    margin: 30px auto 15px;

    .recommend-list_box {
      margin-top: 30px;
      padding: 0 rem(8);
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      .recommend-list {
        margin: 0 rem(3) 10px;
        flex: 1;
        min-width: 31%;
        max-width: 31%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        text-align: center;

        p,
        img,
        div {
          flex: 1;
        }

        p {
          width: 100%;
          background: $color_vice;
          font-size: rem(12);
          color: #fff;
          height: 20px;
          line-height: 20px;
          max-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        img {
          width: 100%;
        }

        div {
          width: 100%;
          min-height: 32px;
          max-height: 32px;
          color: $font_theme;
          margin: 7px auto 10px;
          text-align: center;

          span {
            width: 100%;
            font-size: rem(12);
            text-align: left;
          }
        }
      }
    }
  }

  .fix-top_tab {
    position: fixed;
    top: 44px;
    left: 0;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    background: #fff;

    &.from-app {
      top: 0;
    }

    .top-tab_box {
      display: flex;
      justify-content: space-around;
      height: 100%;
      align-items: center;

      .top-tab_item {
        flex: 1;
        text-align: center;
        width: 4em;
        height: 100%;
        line-height: 40px;
        font-size: rem(15);
        color: $font_theme;

        &.active {
          color: $color_theme;
          background: linear-gradient(left, $color_theme, $color_theme) no-repeat;
          background-position: bottom center;
          background-size: 100% 2px;
        }
      }
    }
  }

</style>
