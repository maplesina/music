<template>
  <div v-if="s">
    <div class="show-container" v-if="isShowFull">
      <header>
        <van-icon name="arrow-left" @click="closeFull()"/>
        <span class="songName">{{mp3Info.name}}</span>
      </header>
      <!-- 圆形背景 -->
      <div class="content">
      <div class="great" :style="{'transform': isPause? '' : 'rotate(-30deg)'}"></div>
      <div class="circle-bg" :style="{'animation-play-state': isPause ? 'running' : 'paused'}">
        <div class="img-box">
          <img :src="songsList[idx].al !== undefined? songsList[idx].al.picUrl : songsList[idx].album.artist.img1v1Url" alt="">
          </div>
        </div>
      </div>
      <!-- 歌词 -->
      <div class="lrc" ref="lrc" v-show="currentLyric">
        <div>
          <div class="lines">
            <p
              v-for="(item, index) in currentLyric.lines"
              :key="index"
              ref="lines"
              :style="{'color': index === curNum ? 'red' : ''}"
            >
              {{item.txt}}
            </p>
          </div>
        </div>
      </div>
      <!-- 进度条 -->
      <div class="line-progress">
        <span class="start">{{currentTime}}</span>
        <div class="bar-bg">
          <div class="active-bg" :style="{'width': progress}"></div>
          <div class="line-point" :style="{'left': progress}"></div>
        </div>
        <span class="end">{{end}}</span>
      </div>
      <!-- 字体图标 -->
      <div class="icon-list">
        <van-icon name="replay" />
        <van-icon name="arrow-left" @click="pre(idx)"/>
        <van-icon @click="contorl()" class="van-icon" :class="isPause?'van-icon-pause':'van-icon-play'" />
        <van-icon name="arrow" @click="nextSong(idx)" />
        <van-icon name="bars" @click="showDialog()"/>
      </div>
      <!-- 弹窗 -->
      <van-popup
        v-model="show"
        position="bottom"
        v-if="songsList.length>0"
        :style="{ height: '60%' }"
      >
        <div class="list-group"
          v-for="(item, index) in songsList"
          @click="playMusic(item.id, item.name, index)"
          :key="index"
        >
          <div class="songsName">{{item.name}} -</div>
          <div class="songsAuth">{{item.ar !== undefined ?item.ar[0].name : item.artists[0].name}}</div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import bus from '@/bus.js'
import Lyric from 'lyric-parser' // 歌词插件
import Bs from 'better-scroll' // 滚动插件
import { mapState, mapMutations } from 'vuex'
// const lrc = new Lyric('', handler)
export default {
  name: 'fullPlay',
  data () {
    return {
      s: false,
      isPause: true,
      show: false,
      currentTime: '00:00',
      progress: '0%',
      currentLyric: {
        lines: null
      }, // 设置一个歌词维护属性
      curNum: 0,
      timer1: null
    }
  },
  methods: {
    lrc () {
      const that = this
      const str = this.mp3Info.lrc
      this.currentLyric = new Lyric(str, that.handler)
      that.scroll = new Bs(that.$refs.lrc, {
        click: true
      })
      // if (this.currentLyric.lines !== null) {
      // }
      this.currentLyric.play()
    },
    handler ({ lineNum, txt }) {
      // 拿到歌词后的动作
      this.curNum = lineNum
      if (lineNum <= 1) {
        this.scroll.scrollTo(0, 0)
      } else {
        const lineEl = this.$refs.lines[lineNum - 1]
        this.scroll.scrollToElement(lineEl, 300)
      }
    },
    pre (idx) { // 上一首
      const that = this
      clearTimeout(that.timer1)
      that.timer1 = setTimeout(function () {
        that.isPause = true
        idx--
        if (idx < 0) {
          idx = that.songsList.length - 1
        }
        // 先停止当前播放的歌词
        that.currentLyric.stop()
        that.$store.dispatch('full', [that.songsList[idx].id, that.songsList[idx].name]) // 请求idx索引对应的mp3和歌词
        that.$store.dispatch('getLrc', that.songsList[idx].id)
        that.$store.commit('index', idx) // 修改仓库的idx值
        that.lrc()
      }, 300)
    },
    nextSong (idx) { // 下一首
      const that = this
      clearTimeout(that.timer1)
      that.timer1 = setTimeout(function () {
        that.isPause = true
        idx++
        if (idx >= that.songsList.length) {
          idx = 0
        }
        that.currentLyric.stop()
        that.$store.dispatch('full', [that.songsList[idx].id, that.songsList[idx].name]) // 请求idx索引对应的mp3和歌词
        that.$store.dispatch('getLrc', that.songsList[idx].id)
        that.$store.commit('index', idx) // 修改仓库的idx值
        that.lrc()
      }, 300)
    },
    /**
    * 歌曲播放
    * @params {Number, String, Number}
    */
    playMusic (id, name, index) {
      this.isPause = true
      this.$store.dispatch('full', [id, name]) // 需要开启全屏播放器,获取MP3
      this.$store.dispatch('getLrc', id) // 获取歌词
      this.$store.commit('index', index)// 当前播放歌曲的下标
      this.show = false
    },
    /**
    * 显示抽屉内容
    * @params {}
    */
    showDialog () {
      this.show = true
    },
    ...mapMutations(['closeFull']),
    contorl () { // 播放、暂停
      this.isPause = !this.isPause
      this.currentLyric.togglePlay()
      bus.$emit('pause', this.isPause)
    }
  },
  computed: {
    ...mapState({
      isShowFull: 'showfull',
      mp3Info: 'mp3Info',
      idx: 'idx',
      songsList: 'songsList'
    }),
    end () {
      var dt
      if (this.songsList[this.idx].dt) {
        dt = this.songsList[this.idx].dt
      } else {
        dt = this.songsList[this.idx].duration
      }
      // 256111 ms 04:16 s
      const m = parseInt(dt / 1000 / 60) < 10 ? '0' + parseInt(dt / 1000 / 60) : parseInt(dt / 1000 / 60)
      const s = parseInt(dt / 1000 % 60) < 10 ? '0' + parseInt(dt / 1000 % 60) : parseInt(dt / 1000 % 60)
      return `${m}:${s}`
    }
  },
  watch: {
    'mp3Info.lrc': function () { // 监听组件的lrc数据
      if (this.currentLyric.lines) {
        this.currentLyric.stop()
      }
      this.lrc() // 只要lrc数据更改， 这个方法就会被调用
    }
  },
  mounted () {
    bus.$on('currentTime', time => {
      time = parseInt(time)
      var p = time / parseInt(this.songsList[this.idx].dt / 1000) // 进度
      p = (p * 100).toFixed(2) + '%'
      this.progress = p
      const m = parseInt(time / 60) < 10 ? '0' + parseInt(time / 60) : parseInt(time / 60)
      const s = parseInt(time % 60) < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60)
      this.currentTime = `${m}:${s}`
    })
    bus.$on('next', (idx) => {
      this.nextSong(idx)
    })
    bus.$on('show', () => {
      this.s = true
    })
  }
}
</script>
<style lang="stylus" scoped>
.lrc
  position absolute
  bottom 3rem
  width 60%
  left 20%
  height 1.2rem
  overflow hidden
  text-align center
.list-group
  display flex
  margin .3rem
  text-align center
  .songsName
    margin-right .4rem
.icon-list
  margin-top 1rem
  display flex
  i
    flex 1
    text-align center
    font-size .6rem
    color #bdc3c7
.line-progress
  display flex
  span
    text-align center
    width 1rem
    color #fff
  .bar-bg
    flex 1
    height 2px
    margin-top .1rem
    position relative
    background #95a5a6
    .active-bg
      position absolute
      height 2px
      width 10%
      background #ecf0f1
    .line-point
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ecf0f1;
      margin-top: -3px;
      position absolute
      left 10%
@keyframes rotating {
  0%{
    transform rotateZ(0)
  }
  100%{
    transform rotateZ(360deg)
  }
}
.content
  margin 1.4rem 0
  height 7rem
  position relative
  .circle-bg
    display: flex;
    justify-content: center;
    margin: 0.8rem auto;
    width: 6rem;
    height: 0;
    padding-bottom: 6rem;
    background-image: url("https://icon.qiantucdn.com/20200509/55828113a162610d404cf3a52c1344492");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    animation: rotating 24s linear infinite;
    transform-origin: center;
    .img-box
      border: 1px solid #000;
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      margin-top: 1rem;
      overflow: hidden;
      img
        width 100%
        height 100%
  .great
    position absolute
    z-index 1
    left 50%
    background url(https://icon.qiantucdn.com/20200509/cad9247361c2677cb1287c6fd8f866c92) no-repeat
    width 2rem
    height 0
    padding-bottom 2.5rem
    background-size: 100% 100%;
    transition all .3s
    transform-origin: top left;
header
  i
    font-size .36rem
    line-height 1rem
.show-container
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background #7F8C8D
  z-index 100
</style>
