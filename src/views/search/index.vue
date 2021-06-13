<template>
  <div>
    <!-- 头部 -->
    <header style="position: relative">
      <van-row class="head">
        <van-col span="4">
          <van-icon @click="goBack()" class="left-row" name="arrow-left" />
        </van-col>
        <van-col span="20">
          <input type="text" v-model="inpVal" placeholder="歌曲名" @keyup.enter="search()"/>
        </van-col>
      </van-row>
      <div class="pos">
        <p class="list-name"
          v-for="(item, index) in songs"
          :key="index"
          @click="toSite(item.keyword)"
        >
          {{item.keyword}}
        </p>
      </div>
    </header>
    <!-- 历史记录 -->
    <div class="history">
      <div class="left-txt">历史</div>
      <div class="txt-wrap">
        <span class="inner-txt">红颜</span>
        <span class="inner-txt">红颜</span>
        <span class="inner-txt">红颜</span>
      </div>
      <div class="del">
        <van-icon name="delete-o" />
      </div>
    </div>
    <!-- 热搜榜 -->
    <!-- 二级路由容器 -->
    <router-view></router-view>
  </div>
</template>
<script>
import bus from '@/bus.js'
export default {
  name: 'search',
  data () {
    return {
      inpVal: '',
      hotList: [],
      songs: []
    }
  },
  methods: {
    toSite (name) {
      this.inpVal = name
      if (this.$route.name === 'site') {
        bus.$emit('changeSearch', name)
      } else {
        this.$router.push({ name: 'site', params: { name } })
      }
      this.songs = null
    },
    search () {
      this.axios.get(`/api/search/suggest?keywords=${this.inpVal}&type=mobile`).then((res) => {
        if (res.status === 200) {
          this.songs = res.data.result.allMatch
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  mounted () {

  }
}
</script>
<style lang="stylus" scoped>
.pos
  position absolute
  top .88rem
  left 0
  width 100%
  background pink
  z-index 2
  .list-name
    // width 100%
    padding .2rem .3rem
    line-height .8rem
    font-size .24rem

h3
  padding-bottom .3rem
  border-bottom 1px solid #000
  color #333
.history
  padding .3rem
  display flex
  .left-txt,.del
    padding 0 .2rem
  .txt-wrap
    flex 1
    display flex
    justify-content space-around
    span
      padding 0 .3rem
      color #333
      background #ccc
      border-radius .2rem
.head
  .left-row
    font-size .8rem
    line-height .8rem
    text-align center
    color #888
  input
    border none
    outline none
    border-bottom 1px solid #ccc
    width 100%
    height .8rem
    line-height .8rem
</style>
