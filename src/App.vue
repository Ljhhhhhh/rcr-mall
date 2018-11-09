<template>
  <div id="app" :class="{'from-app':fromApp}">
    <router-view />
  </div>
</template>

<script>
import {
  mapMutations,
  mapGetters,
} from 'vuex';
  // import loginByWechat from '@/utils/wx';
  // import cookie from 'js-cookie';
export default {
  name: 'App',
  data() {
    return {
      // fromApp: false,
    };
  },
  created() {
    if (window.userinfo && Number(window.userinfo.fromApp) === 1) {
      this.setFromApp(true);
    } else {
      this.setFromApp(false);
    }
    if (this.fromApp) {
      this.setUserInfo(window.userinfo);
    }

    // else {
    // if (!cookie.get('openid') || !cookie.get('token')) {
    // loginByWechat(this.$route.query);
    // }
    // }
  },
  computed: {
    ...mapGetters([
      'fromApp',
      'userinfo',
    ]),
  },
  methods: {
    ...mapMutations({
      setFromApp: 'SET_FROMAPP',
      setUserInfo: 'SET_USERINFO',
    }),
  },
};

</script>

<style>
  #app {
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    font-family: 'PingFangSC-Regular', 'SourceHanSansCN-Regular', Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding-top: 44px;
  }

  #app.from-app {
    padding-top: 0;
  }

</style>
