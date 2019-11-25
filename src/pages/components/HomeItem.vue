<template>
  <div class="list-item" :style="{ background: rgb(chattopic.id)}">{{ chattopic.topic }}</div>
</template>

<script>
export default {
  name: 'HomeItem',
  data (){
    return {
      colorlist1: [10,210,30,190,50,170,70,150,90,130,110],
      colorlist2: [10,30,50,70,90,110,130,150,170,190,210],
      colorlist3: [210,190,170,150,130,110,90,70,50,30,10]
    }
  },
  methods: {
    rgb(id) {
      var r = this.colorlist1[id%11];
      var g = this.colorlist2[id%11];
      var b = this.colorlist3[id%11];
      console.log(`rgb(${r},${g},${b})`)
      return `rgb(${r},${g},${b})`;
    }
  },
  props: ['chattopic']
};
</script>

<style lang="stylus" scoped>
.list-item
  height 1.5rem
  margin 0.2rem
  border-radius 0.1rem
  text-align -webkit-center
  line-height 1.5rem
  font-size 0.4rem
  color #FFFFFF
</style>
