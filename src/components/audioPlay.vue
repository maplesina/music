<template>
  <div v-if="mp3Info.play">
    <audio :src="mp3Info.mp3.url" autoplay></audio>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'audioPlay',
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      mp3Info: 'mp3Info'
    })
  }
}
</script>
<style lang="stylus" scoped>

</style>
