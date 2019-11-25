<template>
  <div class="container">
    <ul class="chat-list">
      <transition-group>
        <li v-for="item in list" :key="item.id">
          <div @click.prevent="scrollout(item)"><home-item :chattopic="item"></home-item></div>
        </li>
      </transition-group>
    </ul>
    <div class="end-item">往下翻翻～ <span class="iconfont btn">&#xe61d;</span></div>
  </div>
</template>

<script>
import HomeItem from './HomeItem';

export default {
  name: 'HomeContainer',
  data() {
    return {};
  },
  components: {
    HomeItem
  },
  methods: {
    pullRequest() {
      this.$parent.getChatList();
    },
    scrollout(item) {
      this.$router.push({
        path: `/Chat/${item.id}/${item.topic}`
      });
    }
  },
  props: ['list']
};
</script>

<style lang="stylus" scoped>
.v-enter, .v-leave-to
  opacity 0
  transform translateY(150px)
.v-enter-active, .v-leave-active
  transition all 0.5s ease
.chat-list
  // height 100%
  margin 0.3rem

// .container
//   height 10rem
//   overflow auto
.end-item
    // position fixed
    // bottom 0
    height 1rem
    width 4rem
    margin auto
    margin-bottom 2rem
    border-radius .3rem
    // border-radius 0 0 0.2rem 0.2rem
    background-color antiquewhite
    text-align -webkit-center
    line-height 1rem
    font-size 0.3rem
    color dimgrey
    .btn
      line-height 1rem
      font-size .3rem
</style>
