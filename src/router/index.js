import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home/home'
import top from '@/views/topSongs/index'
import topDetail from '@/views/topDetail/index'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home',
  component: home
}, {
  path: '/top',
  name: 'top',
  component: top
}, {
  path: '/topdetail/:name',
  name: 'topdetail',
  component: topDetail
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
