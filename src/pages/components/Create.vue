<template>
  <div class="create-table">
    <div class="title">创建主题</div>
    <div class="topic-name"><input id="topic-submit" class="input" type="text" v-model:value="topic" @keyup.enter="submitTopic(topic)" /></div>
    <div class="topic-btn">
      <div class="btn-box"><input class="submit-btn" type="button" @click="submitTopic(topic)" value="提交" /></div>
      <div class="btn-box"><input class="quit-btn" type="button" @click="quit" value="返回" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Create',
  data() {
    return {
      topic: ''
    };
  },
  methods: {
    submitTopic(topic) {
      console.log(topic);
      if (topic != '') {
        this.$http
          .post('submittopic', {
            topic: topic
          })
          .then(result => {
            if (result.status === 200) {
              // 成功了
              this.$router.push({
                path: '/'
              });
            } else {
              // 失败了
              alert('添加失败！');
            }
          });
      }
    },
    quit() {
      this.$router.push({
        path: '/'
      });
    }
  },
  created() {},
  destroyed() {
    this.$parent.$parent.getChatList();
  }
};
</script>

<style lang="stylus" scoped>
.create-table
  width 90%
  height 6rem
  margin auto
  background-color #FFBABA
  border-radius 0 0 0.2rem 0.2rem
  .title
    height 1.5rem
    line-height 1.5rem
    text-align center
    font-size 0.5rem
  .topic-name
    height 2rem
    line-height 2rem
    text-align center
    .input
      line-height 1rem
      width 70%
      font-size 0.3rem
      text-align center
      color #696969
      border-radius 0.3rem
      touch-action none
  .topic-btn
    height 2rem
    line-height 2rem
    display flex
    width 100%
    margin auto
    .btn-box
      width 50%
      text-align center
      .submit-btn, .quit-btn
        height 1rem
        line-height 1rem
        width 60%
        border-radius 0.2rem
        margin auto
        touch-action none
</style>
