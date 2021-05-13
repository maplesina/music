<template>
  <div id="app">
    <router-view></router-view>
    <full-player></full-player>
    <mini-play></mini-play>
    <audio-play></audio-play>
  </div>
</template>
<script>
import AudioPlay from './components/audioPlay.vue'
import FullPlayer from './components/fullPlayer.vue'
import MiniPlay from './components/miniPlay.vue'
export default {
  name: 'App',
  components: {
    FullPlayer,
    AudioPlay,
    MiniPlay
  }
}
</script>
<style lang="stylus">

</style>
