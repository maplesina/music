<template>
  <div v-if="isShowMin" @click="toFull()" class="wrapper">
    mini播放器
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'miniPlay',
  computed: {
    ...mapState(['isShowMin'])
  },
  methods: {
    ...mapMutations(['toFull'])
  }
}
</script>
<style lang="stylus" scoped>
.wrapper
  position fixed
  bottom 0
  left 0
  right 0
  height 1.2rem
  background pink
</style>
