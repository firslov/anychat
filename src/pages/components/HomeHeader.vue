<template>
  <div class="top">
    <div class="header">
      <div class="header-left"><span class="iconfont btn" @click="backtoindex">&#xe608;</span></div>
      <div class="header-input"><input type="text" class="search" v-model:value="key" /></div>
      <div class="header-search"><span class="iconfont btn" @click="submit">&#xe65e;</span></div>
      <div class="header-right">
        <router-link to="/create"><span class="iconfont btn">&#xe9e0;</span></router-link>
      </div>
    </div>
    <transition><router-view></router-view></transition>
  </div>
</template>
<script>
export default {
  name: 'HomeHeader',
  data() {
    return {
      key: ''
    };
  },
  methods: {
    backtoindex() {
      // console.log(this.$route);
      if (this.$route.path != '/') {
        this.$router.replace({ path: '/' });
      }
      this.$parent.getChatList()
    },
    submit() {
      this.$emit('func', this.key);
      this.key = '';
    }
  }
};
</script>
<style lang="stylus" scope>
@import '~styles/variables.styl'

.v-enter, .v-leave-to
  opacity 0
  transform translateY(-150px)
.v-enter-active, .v-leave-active
  transition all 1s ease
.top
  position fixed
  top 0
  width 100%
.header
  display flex
  line-height 1.2rem
  height 1.2rem
  background coral
  .header-left
    width 1rem
    float right
    text-align center
    line-height 1.2rem
    margin auto 0.2rem
    .btn
      line-height 1.2rem
      font-size 0.55rem
      color dimgrey
  .header-input
    flex 1
    height 0.9rem
    line-height 0.9rem
    margin auto
    color #ccc
    text-align center
    .search
      height 0.9rem
      line-height 0.9rem
      width 4rem
      text-align center
      border-radius 0.3rem
      color #696969
  .header-search
    width 1rem
    text-align center
    line-height 1.2rem
    .btn
      line-height 1.2rem
      font-size 0.55rem
      color dimgrey
  .header-right
    width 1.3rem
    float right
    text-align center
    line-height 1.2rem
    margin auto
    .btn
      line-height 1.2rem
      font-size 0.55rem
      color dimgrey
</style>
