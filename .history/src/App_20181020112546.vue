<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  font-family: 'PingFangSC-Regular', 'SourceHanSansCN-Regular', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 44px;
}
</style>
