<template>
  <div>
    选择登录方式
    <p @click="selectTel">选择手机号登录</p>
    <p>选择邮箱登录</p>
    <p>选择二维码登录</p>
  </div>
</template>
<script>
export default {
  name: 'login',
  methods: {
    selectTel () {
      this.$router.push('tel')
    }
  }
}
</script>
