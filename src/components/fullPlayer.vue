<template>
  <div class="show-container" v-if="isShowFull">
    <header>
      <van-icon name="arrow-left" @click="closeFull()"/>
      <span class="songName">{{mp3Info.name}}</span>
    </header>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'fullPlay',
  methods: {
    // closeFull () {
    //   this.$store.commit('closeFull')
    // },
    ...mapMutations(['closeFull'])
  },
  computed: {
    ...mapState({
      isShowFull: 'showfull',
      mp3Info: 'mp3Info'
    })
  }
}
</script>
<style lang="stylus" scoped>
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
