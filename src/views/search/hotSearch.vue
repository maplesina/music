<template>
  <div>
    <div class="hot-search">
      <h3>热搜榜</h3>
      <ul class="list">
        <li
          v-for="(item, index) in hotList"
          :key="index"
        >
          <span class="index" :style="{ 'color': index<3? 'red' : ''}">{{index + 1}}</span>
          <span class="name">{{item.first}}</span>
          <span class="hot" v-if="index < 3">HOT</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'hot',
  data () {
    return {
      hotList: []
    }
  },
  methods: {
    getHot () {
      this.axios.get('/api/search/hot').then((res) => {
        if (res.status === 200) {
          this.hotList = res.data.result.hots
        }
      })
    }
  },
  mounted () {
    this.getHot()
  }
}
</script>
<style lang="stylus" scoped>
.hot-search
  padding .3rem
  .list
    display flex
    flex-wrap wrap
    li
      width 50%
      line-height .8rem
      display flex
      font-size .32rem
      .index
        margin-right .3rem
      // .index,.hot
      .hot
        color red
        margin-left .1rem
        font-style italic
</style>
