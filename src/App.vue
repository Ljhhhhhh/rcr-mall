<template>
  <div id="app" :class="{'from-app':fromApp}">
    <router-view/>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  name: 'App',
  data() {
    return {
      fromApp: false,
    };
  },
  created() {
    let fromApp = +window.fromApp === 1;
    this.fromApp = fromApp;
    this.setFromApp(fromApp);
  },
  methods: {
    ...mapMutations({
      setFromApp: 'SET_FROMAPP',
    }),
  },
};
</script>

<style >
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
#app.from-app{
  padding-top: 0;
}
</style>
