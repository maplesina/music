<template>
  <div>
    <div class="data">
      <h3>单曲</h3>
      <ul>
        <li
          v-for="(item, index) in result"
          :key="item.id"
          @click="palyMusic(item.id, item.name, index)"
        >
          <p class="name">{{item.name}}</p>
          <p class="art">
            <span
              v-for="(val, index) in item.artists"
              :key="index"
            >{{val.name}}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import bus from '@/bus.js'
export default {
  name: 'site',
  data () {
    return {
      result: null
    }
  },
  computed: {
    name () {
      return this.$route.params.name
    }
  },
  methods: {
    palyMusic (id, name, index) { // 不能在这个地方请求mp3地址
      console.log(id, name, index)
      this.$store.dispatch('full', [id, name]) // 需要开启全屏播放器,获取MP3
      this.$store.dispatch('getLrc', id) // 获取歌词
      this.$store.commit('songsList', [this.result, index])// 传递歌曲列表，当前播放歌曲的下标
      bus.$emit('show')
    },
    getData (val) {
      val = val || this.name
      this.axios.get(`/api/search?keywords=${val}&limit=30&offset=0&type=1`).then((res) => {
        if (res.status === 200) {
          this.result = res.data.result.songs
        }
      })
    }
  },
  mounted () {
    this.getData()
    bus.$on('changeSearch', val => {
      this.getData(val)
    })
  }
}
</script>
<style lang="stylus" scoped>
.data
  padding 0 .3rem
  h3
    padding .3rem 0
  ul
    li
      height 1.2rem
      display flex
      flex-direction column
      // justify-content space-around
      p
        line-height 1.5
</style>
