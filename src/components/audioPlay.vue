<template>
  <div>
    <audio ref="audio" :src="mp3Info.mp3.url" autoplay></audio>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import bus from '@/bus.js'
export default {
  name: 'audioPlay',
  data () {
    return {

    }
  },
  methods: {
    handlerEvent () {
      this.$refs.audio.addEventListener('play', () => {
        console.log(this.$refs.audio.duration)
      })
      this.$refs.audio.addEventListener('timeupdate', () => {
        const that = this
        setTimeout(function () {
          bus.$emit('currentTime', that.$refs.audio.currentTime)
        }, 1000) // 这个值需要写在全屏播放器中，播放时间
      })
      this.$refs.audio.addEventListener('ended', () => { // 歌曲播放完毕后，播放下一首
        bus.$emit('next', this.idx)
      })
    }
  },
  computed: {
    ...mapState({
      mp3Info: 'mp3Info',
      idx: 'idx'
    })
  },
  mounted () {
    this.handlerEvent()
    bus.$on('pause', (p) => {
      if (p) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause() // 调用audio的暂停方法
      }
    })
  }
}
</script>
<style lang="stylus" scoped>

</style>
