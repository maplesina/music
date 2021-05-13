<template>
  <div>
    <!-- 头部 -->
    <div class="bg">
      <div class="header">
        <van-icon name="arrow-left" />
        <van-icon name="search" />
      </div>
      <p class="topname">{{this.$route.params.name}}</p>
    </div>
    <!-- 播放全部 -->
    <div class="all-list" v-if="list.tracks">
      <p class="all">
        <van-icon name="play-circle" />
        <span>播放全部</span>
        <span class="len">({{list.tracks.length}})</span>
      </p>
      <ul>
        <li class="list-item"
          v-for="(item, index) in list.tracks"
          @click="palyMusic(item.id, item.name)"
          :key="index"
        >
          <div class="left-item">
            {{index + 1}}
          </div>
          <div class="right-inner lins">
            <p class="inner-name">{{item.name}}</p>
            <p class="inner-author">{{item.ar[0].name}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'topDetail',
  data () {
    return {
      list: {}
    }
  },
  methods: {
    palyMusic (id, name) { // 不能在这个地方请求mp3地址
      this.$store.dispatch('full', [id, name]) // 需要开启全屏播放器,获取MP3
      this.$store.dispatch('getLrc', id) // 获取歌词
    },
    getResult () {
      const url = `/api/playlist/detail?id=${this.$route.params.id}`
      this.axios.get(url).then(res => {
        if (res.status === 200) {
          this.list = res.data.playlist
        }
      })
    }
  },
  mounted () {
    this.getResult()
  }
}
</script>
<style lang="stylus" scoped>
.all
  padding 0 .3rem
  line-height .8rem
  span
    margin 0 .3rem
.inner-name
  color #333
  font-size .32rem
  font-weight 600
  line-height .5rem
.inner-author
  font-size .24rem
  color #777
.lins
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
.ells
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; // 行数
  overflow: hidden;
.list-item
  margin .2rem 0
  padding 0 .3rem
  display flex
  .left-item
    width .9rem
    text-align center
    line-height 1rem
  .right-inner
    flex 1
.bg
  height 4rem
  background #C74082
  position relative
  width 100%
  overflow auto
  .topname
    text-align center
    margin-top 2rem
    font-size .4rem
    color #fff
  .header
    position absolute
    width 80%
    padding 0 .6rem
    top .3rem
    line-height .8rem
    font-size .5rem
    i
      float left
      &:nth-child(2)
        float right
</style>
