<template>
  <div>
    <p>手机登录</p>
    <p>+86<input type="text" v-model="tel"></p>
    <p>密码 <input type="password" v-model="pwd" @keyup.13="checkTel"></p>
  </div>
</template>
<script>
export default {
  name: 'phone',
  data () {
    return {
      tel: '',
      pwd: '',
      text: '正在验证'
    }
  },
  methods: {
    checkTel () {
      this.$toast(this.text)
      this.axios.get(`/api/login/cellphone?phone=${this.tel}&password=${this.pwd}`).then((res) => {
        console.log(res)
        if (res.data.code === 200) { // 登录成功
          this.text = '登录成功'
          this.$toast(this.text)
          // 跳转首页、存储用户数据，让APP已经登录
          // 一直保持登录状态：本地存储
          // 想要在某时间段登录有效：Cookie
          this.$router.push('/')
          const dt = new Date()
          dt.setTime(dt.getTime() + 3 * 24 * 60 * 60 * 1000)
          document.cookie = `nickName=${res.data.profile.nickname};expires = ${dt.toGMTString()}`
          this.$store.commit('nick', res.data.profile.nickname)
        } else {
          this.text = '信息错误'
          this.$toast(this.text)
        }
      })
    }
  }
}
</script>
