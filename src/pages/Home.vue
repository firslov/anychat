<template>
  <!-- <div class="home" @touchmove.prevent> -->
  <div class="home">
    <div class="blank-item"></div>
    <home-header v-on:func="getkey"></home-header>
    <!-- <home-list></home-list> -->
    <transition mode="out-in">
    	<component :is="comName" :list="filterlist"></component>
    </transition>
    <!-- <home-container v-show="show" :list="filterlist"></home-container> -->
    <!-- <home-footer v-show="show"></home-footer> -->
<!--    <ftp v-show="show1"></ftp>
    <help v-show="show2"></help> -->
    <div class="ftp_btn" v-show="show_ftp" @click="change_ftp">
      {{ ftp_button }}
      <span class="iconfont btn">&#xe6ea;</span>
    </div>
    <div class="help_btn" v-show="show_help" @click="change_help">
      {{ help_button }}
      <span class="iconfont btn">&#xe67c;</span>
    </div>
  </div>
</template>
<script>
import HomeHeader from './components/HomeHeader';
import HomeContainer from './components/HomeContainer';
import Help from './components/Help';
import Ftp from './components/Ftp';
// import HomeList from './components/HomeList'
export default {
  name: 'Home',
  data() {
    return {
      list: [],
      filterlist: [],
      comName: "HomeContainer",
      ftp_button: "仓库",
      help_button: "帮助",
      show_ftp: true,
      show_help: true
    };
  },
  components: {
    HomeHeader,
    HomeContainer,
    Help,
    Ftp
    // HomeList
  },
  methods: {
    change_ftp() {
      if (this.comName == "HomeContainer") {
        this.ftp_button = "返回"
        this.comName = "Ftp"
      } else {
        this.ftp_button = "仓库"
        this.comName = "HomeContainer"
      }
      this.show_help = !this.show_help
    },
    change_help() {
      if (this.comName == "HomeContainer") {
        this.help_button = "返回"
        this.comName = "Help"
      } else {
        this.help_button = "帮助"
        this.comName = "HomeContainer"
      }
      this.show_ftp = !this.show_ftp
    },
    getChatList() {
      this.$http.get('getchatlist').then(result => {
        if (result.status === 200) {
          // 成功了
          this.list = result.body;
          this.filterlist = this.list;
          console.log(this.list);
        } else {
          // 失败了
          alert('获取数据失败！');
        }
      });
    },
    search(keywords) {
      var newList = this.list.filter(item => {
        if (item.topic.includes(keywords)) {
          return item;
        }
      });
      return newList;
    },
    getkey(keywords) {
      this.filterlist = this.search(keywords);
    }
  },
  created() {
    this.getChatList();
  },
  mounted() {
    console.log('～～～');
    this.getChatList();
  },
  beforeCreate() {
    document.querySelector('html').setAttribute('style', 'background-color:skyblue');
  }
};
</script>

<style lang="stylus" scoped>
.v-enter, .v-leave-to
  opacity 0
  transform translateY(150px)
.v-enter-active, .v-leave-active
  transition all 1s ease
.blank-item
  height 1.2rem
  // border-radius 0 0 0.2rem 0.2rem
.ftp_btn
  // position fixed
  // bottom 0
  height 1rem
  width 2.2rem
  position fixed
  bottom 0.7rem
  left 0.4rem
  border-radius 0.5rem
  // border-radius 0 0 0.2rem 0.2rem
  background-color saddlebrown
  text-align -webkit-center
  line-height 1rem
  font-size 0.4rem
  color whitesmoke
  .btn
    line-height 1rem
    font-size 0.4rem
.help_btn
  // position fixed
  // bottom 0
  height 1rem
  width 2.2rem
  position fixed
  bottom 0.7rem
  right 0.4rem
  border-radius 0.5rem
  // border-radius 0 0 0.2rem 0.2rem
  background-color yellowgreen
  text-align -webkit-center
  line-height 1rem
  font-size 0.4rem
  color whitesmoke
  .btn
    line-height 1rem
    font-size 0.4rem
</style>
