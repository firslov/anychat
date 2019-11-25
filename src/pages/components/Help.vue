<template>
  <div>
    <transition>
      <div class="help_table">
        <h3 style="line-height: 1.2rem;font-size: .5rem;font-weight:700;">使用说明</h3>
        <div class="scroll_win">
          <p>1. 点击右上角文件按钮创建主题</p>
          <p>2. 点击左上角主页按钮回首页</p>
          <P>3. 点击搜索框搜索关键字</P>
          <p>4. 点击主题框进入主题房间</p>
          <p>5. 主题内可实时匿名聊天</p>
          <p>6. 每个房间保存最近十条聊天记录</p>
          <p>7. 15分钟内无新发言主题自动销毁</p>
          <p>8. 文件仓库可下载文件</p>
        </div>
        <h3 style="line-height: 1.2rem;font-size: .5rem;font-weight:700;">更新说明</h3>
        <div class="scroll_win">
          <p>1. 增加文件仓库</p>
          <p>2. 优化仓库、帮助切换效果</p>
          <p>3. 增加文件仓库上传功能</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Help',
  data() {
    return {
      button_msg: "帮助"
    };
  },
  props: ['ifshow'],
  methods: {}
};
</script>

<style lang="stylus" scoped>
.v-enter, .v-leave-to
  opacity 0
  transform translateY(-150px)
.v-enter-active, .v-leave-active
  transition all 1s ease
.help_table
  width 90%
  height 8.5rem
  margin auto
  background-color lightgreen
  border-radius 0 0 0.2rem 0.2rem
  text-align center
  font-size 0.35rem
  line-height 0.6rem
  color #696969
  .scroll_win
    height 2.8rem
    overflow auto
  .scroll_win::-webkit-scrollbar
    display none
</style>
