<template>
  <div class="container">
    <h-header title="车辆详情" :hasBack="false">
      <van-icon name="chat" slot="right" size="22px" class="header-chat_icon"/>
    </h-header>
    <p>hello world</p>
    <transition name="slide">
      <router-view class="router-view_fullpage"></router-view>
    </transition>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.header-chat_icon{
  vertical-align: middle;
}
</style>
