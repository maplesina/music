<template>
  <div>
    <van-popup v-model="show" position="left" :style="{ width: '70%',height: '100%' }">
      <div class="login"
        v-if="login"
      >
        <p>登录过的昵称</p>
      </div>
      <div class="nologin"
        v-else
      >
        <p @click="toLogin()">还未登录，请先登录</p>
      </div>
    </van-popup>
    <van-row class="bg">
      <van-col span="3" class="left">
        <van-icon name="wap-nav" @click="showLogin()"/>
      </van-col>
      <van-col span="19">
        <van-search
          v-model="value"
          shape="round"
          placeholder="请输入搜索关键词"
          @click="toSearch()"
        /></van-col>
      <van-col span="2"></van-col>
    </van-row>
    <!-- banner -->
    <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="item in bannerList"
        :key="item.id"
      >
        <img class="img1" :src="item.imageUrl" alt="">
      </van-swipe-item>
    </van-swipe> -->
    <!-- 主菜单内容区域 -->
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide
        v-for="(item, index) in menusList"
        :key="index"
      >
        <div class="round"
          @click="toTop(index)"
        >
          <div class="dt" v-if="index == 0">{{day}}</div>
          <img :src="item.iconUrl" alt="">
        </div>
        <p class="name">{{item.name}}</p>
      </swiper-slide>
    </swiper>
    <!-- 推荐歌单 -->
    <h3 class="clearfix">
      <span class="list">推荐歌单</span>
      <van-button round>更多<van-icon name="arrow" /></van-button>
    </h3>
    <swiper class="swiper" :options="swiper1">
      <swiper-slide
        v-for="(item, index) in songsList"
        :key="index"
      >
        <div class="wrapper">
          <img :src="item.picUrl" alt="">
          <div class="pos">
            <div class="mask"></div>
            <van-icon name="play" />
            <span>{{item.playCount > 99999999 ? parseInt(item.playCount/ 100000000) + '亿' : item.playCount > 9999 ? parseInt(item.playCount/ 10000) + '万' : item.playCount}}</span></div>
          <p class="title ells">{{item.name}}</p>
        </div>
      </swiper-slide>
    </swiper>
    <!-- 排行榜 -->
    <h3 class="clearfix">
      <span class="list">排行榜</span>
      <van-button round>更多<van-icon name="arrow" /></van-button>
    </h3>
    <div class="left-content">
      <swiper class="swiper" :options="swiper2">
        <swiper-slide
          v-for="(item, index) in topList"
          :key="index"
        >
          <p class="topName">{{item.name}}</p>
          <ul class="list" v-if="songs">
            <li class="listItem"
              v-for="(list, i) in songs[index]"
              :key="i"
            >
              <img :src="list.al.picUrl" alt="">
              <div class="itemContent">
                <span class="index">{{i + 1}}</span>
                <span class="item-name lins">{{list.al.name}}</span>
                <span class="author lins">- {{list.ar[0].name}}</span>
              </div>
            </li>
          </ul>
        </swiper-slide>
      </swiper>
    </div>
    <!-- 新歌新碟内容 -->
    <div class="album">
      <!-- /personalized/newsong 新歌 limit参数-->
      <div class="title">
        <h3 class="clearfix">
          <span class="newSongs" :index=0 @click="change()" :class="{ active: flag === 0}">新歌</span>
          <span class="rows">|</span>
          <span class="newAlbum" :index=1 @click="change()" :class="{ active: flag === 1}">新碟</span>
          <span class="rows">|</span>
          <span class="numberAlbum" :index=2 @click="change()" :class="{ active: flag === 2}">数字专辑</span>
        </h3>
      </div>
      <!-- 新歌对应 -->
      <div class="left-content" v-show="flag === 0">
        <swiper class="swiper" :options="swiper2">
          <swiper-slide
            v-for="(item, index) in 2"
            :key="index"
          >
            <ul class="list">
              <li class="listItem"
                v-for="(list, i) in newSongs[index]"
                :key="i"
              >
                <img :src="list.picUrl" alt="">
                <div class="itemContent">
                  <span class="item-name lins">{{list.name}}</span>
                  <span class="author lins">- {{list.song.artists[0].name}}</span>
                </div>
              </li>
            </ul>
          </swiper-slide>
        </swiper>
      </div>
      <!-- 新碟 -->
      <div class="left-content"  v-show="flag === 1">
        <swiper class="swiper" :options="swiper2">
          <swiper-slide
            v-for="(item, index) in 2"
            :key="index"
          >
            <ul class="list">
              <li class="listItem"
                v-for="(list, i) in newAlbum[index]"
                :key="i"
              >
                <img :src="list.picUrl" alt="">
                <div class="itemContent">
                  <span class="item-name lins">{{list.name}}</span>
                  <span class="author lins">- {{list.artists[0].name}}</span>
                </div>
              </li>
            </ul>
          </swiper-slide>
        </swiper>
      </div>
      <!-- 专辑 -->
      <div class="left-content"  v-show="flag === 2">
        <swiper class="swiper" :options="swiper2">
          <swiper-slide
            v-for="(item, index) in 2"
            :key="index"
          >
            <ul class="list">
              <li class="listItem"
                v-for="(list, i) in numberAlbum[index]"
                :key="i"
              >
                <img :src="list.coverUrl" alt="">
                <div class="itemContent">
                  <span class="item-name lins">{{list.albumName}}</span>
                  <span class="author lins">- {{list.artistName}}</span>
                </div>
              </li>
            </ul>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      login: false,
      show: false,
      value: '',
      flag: 0,
      songs: [], // 5个排行榜的歌单数据
      bannerList: [], // 轮播图数据
      menusList: [], // 主菜单圆形数据
      songsList: [], // 推荐歌单数据
      topList: [], // 排行榜
      newSongs: [], // 新歌数据
      newAlbum: [], // 新碟数据
      numberAlbum: [], // 数字专辑
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 30,
        freeMode: true
      },
      swiper1: {
        slidesPerView: 3,
        spaceBetween: 10,
        slidesPerGroup: 3
      },
      swiper2: {
      }
    }
  },
  computed: {
    day () {
      const dt = new Date().getDate()
      return dt
    }
  },
  methods: {
    /**
     * 选择登录方式
     */
    toLogin () {
      this.$router.push('login')
    },
    /**
    点击显示左侧登录
    */
    showLogin () {
      this.show = true
    },
    /**
    * 点击跳转到搜索页面
    */
    toSearch () {
      this.$router.push('/search')
    },
    toTop (index) {
      switch (index) {
        case 0:
          // 每日推荐页面
          break
        case 3:
          this.$router.push({ name: 'top' }) // 排行榜页面
          break
      } // 根据什么东东去判断 路由地址？
    },
    change (e) {
      e = e || window.event
      console.log(e.target.attributes.index.value)
      this.flag = parseInt(e.target.attributes.index.value)
    },
    getBanner () { // 获取baanner数据
      this.axios.get('/api/banner').then((res) => {
        // console.log(res)
        if (res.status === 200) {
          this.bannerList = res.data.banners
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getMenus () { // 获取圆形图标入口列表
      this.axios.get('/api/homepage/dragon/ball').then((result) => {
        if (result.status === 200) {
          this.menusList = result.data.data
        }
      })
    },
    getSongsList () { // 获取推荐歌单
      this.axios.get('/api/personalized?limit=30').then((result) => {
        // console.log(result)
        if (result.status === 200) {
          // this.songsList = result.data.result
          while (this.songsList.length < 6) {
            const num = parseInt(Math.random() * 30) // [0,29]
            if (this.songsList.indexOf(result.data.result[num]) === -1) {
              this.songsList.push(result.data.result[num])
            }
          }
        }
      })
    },
    getTop () { // 排行榜
      this.axios.get('/api/toplist').then(res => {
        if (res.status === 200) {
          this.topList = res.data.list.slice(0, 6)
          this.topList.map((val, index) => {
            if (index === 4) {
              this.topList.splice(4, 1)
            }
            this.axios.get('/api/playlist/detail?id=' + val.id).then((res) => {
              this.songs.push(res.data.playlist.tracks.slice(0, 3))
            })
          })
        }
      })
    },
    getnewSongs () { // 新歌 6条数据分2页，每页3个数据
      this.axios.get('/api/personalized/newsong?limit=6').then(res => {
        if (res.status === 200) {
          // this.newSongs = res.data.result
          this.newSongs.push(res.data.result.slice(0, 3))
          this.newSongs.push(res.data.result.slice(3))
        }
      })
    },
    getnewAlbum () { // 新碟
      this.axios.get('/api/top/album?offset=0&area=ZH&limit=6&type=hot').then(res => {
        if (res.status === 200) {
          this.newAlbum.push(res.data.monthData.slice(0, 3))
          this.newAlbum.push(res.data.monthData.slice(3, 6))
        }
      })
    },
    getnumberAlbum () { // 数字专辑
      this.axios.get('/api/album/list?limit=6').then(res => {
        if (res.status === 200) {
          this.numberAlbum.push(res.data.products.slice(0, 3))
          this.numberAlbum.push(res.data.products.slice(3))
        }
      })
    }
  },
  mounted () {
    this.getBanner()
    this.getMenus()
    this.getSongsList()
    this.getTop()
    this.getnewSongs()
    this.getnewAlbum()
    this.getnumberAlbum()
  }
}
</script>
<style lang="stylus" scoped>
.title
  .active
    color red
  span
    color grey
    font-weight 400
    margin 0 .1rem
.topName
  text-align center
  margin .3rem 0
.listItem
  display flex
  margin .2rem 0
  img
    width 1.2rem
    margin-right .3rem
  .itemContent
    flex 1
    display flex
    height 1.2rem
    align-items center
    .index,.item-name,.author
      margin-right .3rem
    .item-name
      font-size .36rem
      font-weight 400
    .author
      width 1.2rem
.left-content
  padding-left .3rem
.lins
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
.ells
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; // 行数
  overflow: hidden;
.wrapper
  position relative
  .pos
    position absolute
    right .2rem
    top .2rem
    border-radius .2rem
    // opacity .2
    .mask
      position absolute
      width 100%
      height 100%
      // z-index -1
      background rgba(0,0,0,.4)
    span
      color white
    .van-icon
      color white
  img
    width 100%
    border-radius .2rem
.clearfix:after
  content ''
  height 0
  clear both
  visibility hidden
  display block
h3
  padding-left .3rem
  margin .5rem 0
  .list
    font-size .4rem
    float left
  button
    float right
    line-height .5rem
    height .5rem
    font-size .24rem
    margin-right .3rem
.dt
  position absolute
  left 50%
  top .5rem
  margin-left -.16rem
.name
  font-size .24rem
  text-align center
  margin-top .2rem
.round
  background #FEF2F6
  position relative
  width 1.2rem
  height 1.2rem
  border-radius 50%
  overflow hidden
  text-align center
  img
    width .8rem
    height .8rem
    border-radius 50%
    background red
    margin-top 0.2rem
.van-search__content
  background #F8FDFF
.bg
  // background #E4E9EC
  i
    font-size .6rem
    margin-top .2rem
  .left
    // line-height 1rem
    text-align center
.my-swipe
  width 95%
  margin 0 auto
  border-radius 15px
  overflow hidden
  .van-swipe-item
    width 100%
.img1
  width 100%
</style>
