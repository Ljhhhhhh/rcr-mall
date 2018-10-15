<template>
  <div class="container detail">
    <h-header title="车辆详情">
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
            <p>2016款 雅阁 混动 2.0L 锐酷版</p>
          </div>
          <p class="car-info_spec">外观奥夫特黑+内饰黑色</p>
          <p class="car-info_sale">
            <span>厂商指导价：23.98万</span>
            <span><i></i> 已售121台</span>
          </p>
        </div>
        <div class="car-info_explain">
          <p>
            <h-tag tag="5%首付" style="background:#ED1E03" /><span>该车型首付款为厂商指导价的5%，数量有限数量有限。</span></p>
          <p>
            <h-tag tag="送皮座椅" style="background:#ED1E03" /><span>购车即送价值1000元真皮座椅，仅限前20位仅限前20位。</span></p>
          <i class="arrow-more_icon" @click="infoDetailShow"></i>
        </div>
        <div class="car-info_program van-hairline--bottom" ref="program">
          <ul class="tab_item">
            <li v-for="(item, index) in programList" :key="index" :class="{active:index===programActive}" @click="setProgram(index)">金融方案{{index+1}}</li>
          </ul>
          <div class="tab-content">
            <div class="wrap">
              <div class="tab-content_item" :class="{active:index===programActive}" v-for="(item, index) in programList"
                :key="index">
                <div>
                  <p>首付(5%)</p>
                  <p>{{item.first}}万</p>
                </div>
                <div>
                  <p>月供</p>
                  <p>{{item.month}}元</p>
                </div>
                <div>
                  <p>期数</p>
                  <p>{{item.order}}期</p>
                </div>
              </div>
            </div>
          </div>
          <div class="link-all_btn" @click="showProjectDetail"><span>查看方案详情</span>
            <van-icon name="arrow" class="icon" />
          </div>
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
            <div class="link-all_btn" @click="showAllConfig"><span>查看全部配置</span>
              <van-icon name="arrow" class="icon" />
            </div>
          </div>
        </div>
        <div class="car-info_advantage">
          <h-content-title title="车型亮点"></h-content-title>
          <div class="content">
            <p>亮点(用户后台自定义)</p>
            <p>亮点(用户后台自定义)</p>
            <p>亮点(用户后台自定义)</p>
            <p>亮点(用户后台自定义)</p>
            <p>亮点(用户后台自定义)</p>
            <p>亮点(用户后台自定义)</p>
            <p>亮点(用户后台自定义)</p>
            <p>亮点(用户后台自定义)</p>
            <p>亮点(用户后台自定义)</p>
            <p>亮点(用户后台自定义)</p>
            <p>亮点(用户后台自定义)</p>
            <p>亮点(用户后台自定义)</p>
            <p>亮点(用户后台自定义)</p>
            <p>亮点(用户后台自定义)</p>
            <p>亮点(用户后台自定义)</p>
            <p>亮点(用户后台自定义)</p>
          </div>
        </div>
        <!--用户自定义：亮点 -->
        <div class="divide-border"></div>
        <div class="car-info_step">
          <h-content-title title="轻松四步 新车开回家"></h-content-title>
          <div class="content">
            <p>步骤(用户后台自定义)</p>
            <p>步骤(用户后台自定义)</p>
            <p>步骤(用户后台自定义)</p>
            <p>步骤(用户后台自定义)</p>
            <p>步骤(用户后台自定义)</p>
            <p>步骤(用户后台自定义)</p>
            <p>步骤(用户后台自定义)</p>
            <p>步骤(用户后台自定义)</p>
            <p>步骤(用户后台自定义)</p>
            <p>步骤(用户后台自定义)</p>
            <p>步骤(用户后台自定义)</p>
            <p>步骤(用户后台自定义)</p>
            <p>步骤(用户后台自定义)</p>
            <p>步骤(用户后台自定义)</p>
            <p>步骤(用户后台自定义)</p>
            <p>步骤(用户后台自定义)</p>
          </div>
        </div>
        <!--用户自定义：步骤 -->
        <div class="divide-border"></div>
        <div class="car-recommend">
          <h-content-title title="为你推荐"></h-content-title>
          <div class="recommend-list_box">
            <div class="recommend-list van-hairline--surround">
              <p>首付2.39万</p>
              <img src="https://www.audi.cn/content/dam/nemo/cn/home/heading/2018/autoshwo2018_mob.jpg?downsize=880px:*">
              <div>
                <span>本田雅阁</span>
                <span>2016款 混动2.0L</span>
              </div>
            </div>
            <div class="recommend-list van-hairline--surround">
              <p>直降1200元</p>
              <img src="https://www.audi.cn/content/dam/nemo/cn/home/teaser/online4S_teaser20180629.png?downsize=880px:*">
              <div>
                <span>本田雅阁</span>
                <span>2016款 混动2.0L</span>
              </div>
            </div>
            <div class="recommend-list van-hairline--surround">
              <p>送2000元油卡</p>
              <img src="https://www.audi.cn/content/dam/nemo/cn/home/new_home/teaser17_20180919.png?downsize=880px:*">
              <div>
                <span>本田雅阁</span>
                <span>2016款 混动2.0L</span>
              </div>
            </div>
            <div class="recommend-list van-hairline--surround">
              <p>首付2.39万</p>
              <img src="https://www.audi.cn/content/dam/nemo/cn/home/heading/2018/autoshwo2018_mob.jpg?downsize=880px:*">
              <div>
                <span>本田雅阁</span>
                <span>2016款 混动2.0L</span>
              </div>
            </div>
            <div class="recommend-list van-hairline--surround">
              <p>直降1200元</p>
              <img src="https://www.audi.cn/content/dam/nemo/cn/home/teaser/online4S_teaser20180629.png?downsize=880px:*">
              <div>
                <span>本田雅阁</span>
                <span>2016款 混动2.0L</span>
              </div>
            </div>
            <div class="recommend-list van-hairline--surround">
              <p>送2000元油卡</p>
              <img src="https://www.audi.cn/content/dam/nemo/cn/home/new_home/teaser17_20180919.png?downsize=880px:*">
              <div>
                <span>本田雅阁</span>
                <span>2016款 混动2.0L</span>
              </div>
            </div>
            <div class="recommend-list van-hairline--surround">
              <p>首付2.39万</p>
              <img src="https://www.audi.cn/content/dam/nemo/cn/home/heading/2018/autoshwo2018_mob.jpg?downsize=880px:*">
              <div>
                <span>本田雅阁</span>
                <span>2016款 混动2.0L</span>
              </div>
            </div>
            <div class="recommend-list van-hairline--surround">
              <p>直降1200元</p>
              <img src="https://www.audi.cn/content/dam/nemo/cn/home/teaser/online4S_teaser20180629.png?downsize=880px:*">
              <div>
                <span>本田雅阁</span>
                <span>2016款 混动2.0L</span>
              </div>
            </div>
            <div class="recommend-list van-hairline--surround">
              <p>送2000元油卡</p>
              <img src="https://www.audi.cn/content/dam/nemo/cn/home/new_home/teaser17_20180919.png?downsize=880px:*">
              <div>
                <span>本田雅阁</span>
                <span>2016款 混动2.0L</span>
              </div>
            </div>
            <div class="recommend-list van-hairline--surround">
              <p>首付2.39万</p>
              <img src="https://www.audi.cn/content/dam/nemo/cn/home/heading/2018/autoshwo2018_mob.jpg?downsize=880px:*">
              <div>
                <span>本田雅阁</span>
                <span>2016款 混动2.0L</span>
              </div>
            </div>
            <div class="recommend-list van-hairline--surround">
              <p>直降1200元</p>
              <img src="https://www.audi.cn/content/dam/nemo/cn/home/teaser/online4S_teaser20180629.png?downsize=880px:*">
              <div>
                <span>本田雅阁</span>
                <span>2016款 混动2.0L</span>
              </div>
            </div>
            <div class="recommend-list van-hairline--surround">
              <p>送2000元油卡</p>
              <img src="https://www.audi.cn/content/dam/nemo/cn/home/new_home/teaser17_20180919.png?downsize=880px:*">
              <div>
                <span>本田雅阁</span>
                <span>2016款 混动2.0L</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <keep-alive>
      <h-consult></h-consult>
    </keep-alive>
    <h-to-top :show="toTopShow" @scrollToTop="scrollToElement"></h-to-top>
    <div class="fix-top_tab van-hairline--bottom" v-show="topTabActive.state">
      <div class="top-tab_box">
        <span class="top-tab_item" :class="{active:i===topTabActive.index}" v-for="(tab, i) in topTabElemMap" :key="i"
          @click="scrollToElement(i)">
          {{tab.title}}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import hHeader from '@/components/hHeader';
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
} from 'vuex';
import clearupList from '@/utils/clearupAlbumlist';
import BScroll from 'better-scroll';
import hToTop from '@/components/hToTop';
import {
  fetchCarAlbum,
} from '@/api/car/carAlbum';
export default {
  name: 'Detail',
  data() {
    return {
      topResrvedOffset: 45, // 顶部tab预留高度
      swiperOption: { // swipe配置
        loop: true,
      },
      bannerIndex: 1,
      bannerList: [],
      programList: [{
        first: 2.39,
        month: 5519,
        order: 12,
      },
      {
        first: 2.59,
        month: 5559,
        order: 24,
      },
      {
        first: 3.33,
        month: 9999,
        order: 6,
      },
      ],
      programActive: 0,
      carConfiguration: {
        a: '三厢车',
        b: '4915/1845/1470mm',
        c: '2.0L146马力L4',
        d: 'E-CVT无级变速',
        e: '前置前驱',
        f: '油电混合',
        g: '4.2L/100km',
        h: '外观奥夫特黑+内饰黑色',
      },
      configurationMap: {
        a: '车身结构',
        b: '长/宽/高',
        c: '发动机',
        d: '变速箱',
        e: '驱动方式',
        f: '燃料形式',
        g: '综合油耗',
        h: '车辆颜色',
      },
      scroll: null,
      toTopShow: false,
      topTabActive: {
        state: false,
        index: null,
      },
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
    };
  },
  created() {
    this.getBannerList();
  },
  mounted() {
    this._initPage();
  },
  watch: {
    $route: function (to, from) {
      if (from.name === 'storeSelect') {
        this.show = true;
      }
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  methods: {
    async getBannerList() {
      let res = await fetchCarAlbum();
      // 整理banner列表，使其按照type归类
      this.bannerList = clearupList(res.items);
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
        this.scroll.scrollToElement(this.topTabElemMap[index]['elem'], 300, 0, -this.topResrvedOffset);
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
    },
    _initPage() {
      // 设置scroll滚动
      this.scroll = new BScroll('.scroll-wrap', {
        click: true,
        probeType: 2,
      });
      this.scroll.on('scroll', (pos) => {
        this._scroll(pos);
      });
      this.scroll.on('scrollEnd', (pos) => {
        this._scroll(pos);
        if (this.topTabActive.index < 0) {
          this.topTabActive.state = false;
        } else {
          this.topTabActive.state = true;
        }
      });
    },
    ...mapMutations({
      set_albumlist: 'SET_ALBUMLIST',
    }),
  },
  components: {
    hHeader,
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
          background-size: 34px 265px;
          background-position: -5px -200px;
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
      background: #ECF8FF;
      display: flex;
      justify-content: space-between;
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
          content: '';
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
          background: #FFF;

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
        background: #ECF8FF;
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
      justify-content: space-between;

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
          color: #FFF;
          height: 20px;
          line-height: 20px;
        }

        img {
          width: 100%;
        }

        div {
          width: 100%;
          height: auto;
          color: $font_theme;
          margin: 7px auto 10px;

          span {
            display: inline-block;
            width: 100%;
            font-size: rem(12);
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
    padding: 0 rem(15);
    box-sizing: border-box;
    background: #FFF;

    .top-tab_box {
      display: flex;
      justify-content: space-between;
      height: 100%;
      align-items: center;

      .top-tab_item {
        flex: 1;
        text-align: center;
        max-width: 4em;
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
