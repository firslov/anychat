<template>
  <div class="chat-table">
    <div class="chat-topic">{{ topic }}</div>
    <!-- <div class="outer"> -->
    <div class="chat-msg" ref="chat_table">
      <ul class="chat-ul">
        <li class="chat-item" :style="{ background: rgb(item.time) }" v-for="item in msglist">{{ item.msg }}</li>
      </ul>
      <div class="place-holder"></div>
    </div>
    <!-- </div> -->
    <div class="input-table">
      <div class="chat-box"><input type="text" v-model:value="msg" class="input-text" @keyup.enter="submit" /></div>
      <div class="chat-btn"><input type="button" value="发送" class="input-btn" @click="submit" /></div>
      <div class="chat-back"><input type="button" value="返回" class="back-btn" @click="back" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      topic: this.$route.params.topic,
      id: '',
      msg: '',
      msglist: [],
      colorlist1: [10, 210, 30, 190, 50, 170, 70, 150, 90, 130, 110],
      colorlist2: [10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210],
      colorlist3: [210, 190, 170, 150, 130, 110, 90, 70, 50, 30, 10]
    };
  },
  methods: {
    rgb(time) {
      var r = this.colorlist1[time % 11];
      var g = this.colorlist2[time % 11];
      var b = this.colorlist3[time % 11];
      // console.log(`rgb(${r},${g},${b})`);
      return `rgb(${r},${g},${b})`;
    },
    back() {
      this.$socket.emit('quit-room', this.id);
      this.$router.push({
        path: '/'
      });
    },
    submit() {
      const message = {
        id: this.$route.params.id,
        msg: this.msg,
        time: Date.parse(new Date())
      };
      if (this.msg != '') {
        this.$socket.emit('chat-message', message);
        this.msg = '';
        this.scollBottom();
        this.$http.get('refreshchat/', { params: { id: message.id } }).then(result => {
          if (result.status === 200) {
            // 成功了
            console.log('刷新成功！');
          } else {
            // 失败了
            console.log('刷新失败！');
          }
        });
      }
    },
    scollBottom() {
      this.$nextTick(() => {
        var container = this.$refs.chat_table;
        container.scrollTop = container.scrollHeight;
      });
    }
  },
  // created(){
  // },
  created() {
    this.id = this.$route.params.id;
    this.$socket.emit('into-room', this.id);
  },
  destroyed() {
    this.$parent.$parent.getChatList();
  },
  sockets: {
    output(data) {
      // if(data.msg.id == this.$route.params.id){
      this.msglist.push(data.msg);
      // }
    },
    backhis(data) {
      // if(data.msg.id == this.$route.params.id){
      this.msglist = data;
      // console.log('receive backhis');
      // console.log(this.msglist);
      this.scollBottom();
      // }
    }
  },
  props: ['chattopic']
};
</script>

<style lang="stylus" scoped>
.chat-table
  width 90%
  height 9.3rem
  margin auto
  background-color #FFBABA
  border-radius 0 0 0.2rem 0.2rem
  .chat-topic
    height 1rem
    line-height 1rem
    text-align center
    font-size 0.4rem
    color #696969
  .chat-msg
    height 7rem
    overflow auto
    ul
      // height fit-content
      padding 0.2rem
      .chat-item
        width fit-content
        padding 0.1rem 0.2rem
        height auto
        line-height 0.6rem
        text-align center
        margin 0.1rem auto
        border-radius 0.2rem
        color #EAEAEA
      li
        line-height 0.6rem
        height auto
        word-break break-all
        word-wrap break-word
    .place-holder
      height 1.5rem
  .chat-msg::-webkit-scrollbar
    display none
  .input-table
    height 1rem
    display flex
    width 100%
    margin auto
    .chat-box
      width 50%
      text-align center
      margin auto 0.2rem
      .input-text
        height 1rem
        line-height 1rem
        width 85%
        text-align center
        border-radius 0.3rem
        color #696969
        touch-action none
    .chat-btn, .chat-back
      width 25%
      input
        height 1rem
        line-height 1rem
        width 85%
        font-size 0.3rem
        text-align center
        color #696969
        border-radius 0.3rem
        touch-action none
</style>
