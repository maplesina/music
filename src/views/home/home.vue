<template>
  <div>
    <van-row class="bg">
      <van-col span="3" class="left"><van-icon name="wap-nav" /></van-col>
      <van-col span="19">
        <van-search
          v-model="value"
          shape="round"
          placeholder="请输入搜索关键词"
        /></van-col>
      <van-col span="2"></van-col>
    </van-row>
    <!-- banner -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="item in bannerList"
        :key="item.id"
      >
        <img class="img1" :src="item.imageUrl" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- 主菜单内容区域 -->
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide
        v-for="(item, index) in menusList"
        :key="item.id"
      >
        <div class="round">
          <div class="dt" v-if="index == 0">{{day}}</div>
          <img :src="item.iconUrl" alt="">
        </div>
        <p class="name">{{item.name}}</p>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      value: '',
      bannerList: [],
      menusList: [],
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 30,
        freeMode: true
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
    }
  },
  mounted () {
    this.getBanner()
    this.getMenus()
  }
}
</script>
<style lang="stylus" scoped>
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
