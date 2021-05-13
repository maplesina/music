<template>
  <div>
    <header >
      <van-icon @click="goBack()" name="arrow-left" />排行榜
    </header>
    <!-- 排行榜具体信息 -->
    <van-tabs v-model="active"  swipeable>
      <van-tab
        title="官方榜"
      >
        <!-- 内容 {{ index }} -->
        <div class="container">
          <h3>官方榜</h3>
          <ul class="box">
            <li
              v-for="(item, index) in num1"
              :key="index"
              @click="toTopDetail(item.id, item.name)"
            >
              <div class="left-item">
                <p class="title">{{item.name}}</p>
                <img :src="item.coverImgUrl" alt="" srcset="">
              </div>
              <div class="right-item">
                <p class="detail lins"
                  v-for="(list, i) in item.tracks"
                  :key="list.id"
                >
                  <span class="index">{{i + 1}}.</span>
                  <span class="name">{{list.first}}</span>
                  <span class="songsAuthor">- {{list.second}}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </van-tab>
      <van-tab
        title="黑胶"
      >
        <div class="container">
          <h3>黑胶1</h3>
          <ul class="box">
            <li>
              <div class="left-item">
                <p class="title">标题</p>
                <img src="" alt="" srcset="">
              </div>
              <div class="right-item">
                <p class="detail">
                  <span class="index">1</span>
                  <span class="name">xx</span>
                  <span class="songsAuthor">xx</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </van-tab>
      <van-tab title="黑胶"></van-tab>
      <van-tab title="黑胶"></van-tab>
      <van-tab title="黑胶"></van-tab>
      <van-tab title="黑胶"></van-tab>
      <van-tab title="黑胶"></van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: 'topSongs',
  data () {
    return {
      active: 0,
      topName: ['官方', '精选'],
      topDetail: []
    }
  },
  computed: {
    num1 () {
      const list = this.topDetail.slice(0, 4)
      return list
    }
  },
  methods: {
    toTopDetail (id, name) {
      this.$router.push({ name: 'topdetail', params: { id, name } })
    },
    goBack () {
      this.$router.go(-1)
    },
    getTop () {
      this.axios.get('/api/toplist/detail').then(res => {
        if (res.status === 200) {
          this.topDetail = res.data.list
        }
      })
    }
  },
  mounted () {
    this.getTop()
  }
}
</script>
<style lang="stylus" scoped>
.lins
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
.ells
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; // 行数
  overflow: hidden;
.box
  padding .3rem
  li
    border-radius .2rem
    margin  .3rem 0
    display flex
    background pink
    .right-item
      flex 1
      margin-left .3rem
      .detail
        line-height .8rem
        width 4.4rem
.box li:nth-child(2n)
    background-color skyblue
.left-item
  width 1.8rem
  text-align center
  .title
    font-size .4rem
    margin .3rem 0
  img
    width 1rem
    height 1rem
header
  height 0.8rem
  font-size .32rem
  i
    margin-right .3rem
</style>
