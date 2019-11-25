<template>
  <div>
    <transition>
      <div class="ftp_table">
        <h3 style="line-height: 1.3rem;font-size: .6rem;font-weight:700;">文件仓库</h3>
        <div class="file_list">
          <table class="file_table">
            <thead style="font-size: .3rem;">
              <tr>
                <th><a @click.prevent="getFileList">回根目录</a></th>
                <th>类型</th>
                <th>大小</th>
                <!-- <th>文件路径</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in list" :style="{ background: rgb() }">
                <td>
                  <a @click.prevent="getSubList(item.url)">{{ item.name }}</a>
                </td>
                <td>{{ item.type }}</td>
                <td>{{ item.size }}</td>
                <!-- <td>{{ item.url }}</td> -->
              </tr>
            </tbody>
          </table>
        </div>
        <div class="upload_form"><input type="file" id="file" name="imgData" accept="image/*" @change="upLoad($event)" /></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Ftp',
  data() {
    return {
      list: [],
      button_msg: '仓库'
    };
  },
  props: ['ifshow'],
  methods: {
    upLoad(e) {
      let file = e.target.files[0];
      // upload image
      let fd = new FormData();
      fd.append('file', file);
      this.$http.post('/upload', fd).then(res => {
        this.imgPath = res.data.path;
      });
      setTimeout(() => {
        this.getFileList();
      }, 3000);
    },
    // submit() {
    //   alert('正在上传，请稍等...');
    //   this.$router.push('/');
    //   setTimeout(() => {
    //     this.getFileList();
    //   }, 3000);
    // },
    rgb() {
      var r = 250 - Math.floor(Math.random() * 60);
      var g = 200 - Math.floor(Math.random() * 60);
      var b = 150 - Math.floor(Math.random() * 60);
      // console.log(`rgb(${r},${g},${b})`);
      return `rgb(${r},${g},${b})`;
    },
    getFileList() {
      this.$http.get('getfilelist').then(result => {
        // 通过 $http 获取的数据,都在 result.body 中放着
        if (result.status === 200) {
          // 成功了
          this.list = result.body;
        } else {
          // 失败了
          alert('获取数据失败！');
        }
      });
    },
    getSubList(url) {
      this.$http
        .post('getsublist', {
          url: url
        })
        .then(result => {
          if (result.status === 200) {
            // 成功了
            var type;
            result = result.body;
            type = result.shift();
            if (type['type'] == 'folder') {
              this.list = result;
            } else {
              console.log(result[0]['url']);
              this.getFile(result[0]['url']);
            }
          } else {
            // 失败了
            alert('添加失败！');
          }
        });
    },
    getFile(url) {
      window.location.href = url;
    }
  },
  created() {
    console.log('ifshow' + this.ifshow);
    this.getFileList();
  }
};
</script>

<style lang="stylus" scoped>
.v-enter, .v-leave-to
  opacity 0
  transform translateY(-150px)
.v-enter-active, .v-leave-active
  transition all 1s ease
.ftp_table
  width 90%
  height 9rem
  margin auto
  background-color lightgreen
  border-radius 0 0 0.2rem 0.2rem
  text-align center
  font-size 0.35rem
  line-height 0.9rem
  color grey
  .file_list
    width 90%
    height 6rem
    margin auto
    overflow auto
    .file_table
      text-align center
      font-size 0.35rem
      width 100%
      color antiquewhite
      thead
        background-color #007AFF
        border-radius 0.3rem
        border 0.1rem
      tr
        border 0.1rem
  .file_list::-webkit-scrollbar
    display none
  .upload_form
    width 5rem
    height 1rem
    line-height 1rem
    margin auto
    margin-top 0.3rem
    border-radius 0.3rem
    color dimgrey
    text-align center
    .upload_file
      width 2rem
      height 1rem
      border-radius 0.5rem
      position relative
      background-color skyblue
      float left
      input
        width 2rem
        height 1rem
        position absolute
        top 0
        right 0
        opacity 0
    .upload_btn
      width 2rem
      border-radius 0.5rem
      float right
      input
        width 2rem
        height 1rem
        height 1rem
        border-radius 0.5rem
        background-color whitesmoke
        color dimgrey
</style>
