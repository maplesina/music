import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home/home'
import top from '@/views/topSongs/index'
import topDetail from '@/views/topDetail/index'
import search from '@/views/search/index'
import site from '@/views/search/site'
import hotSearch from '@/views/search/hotSearch'
import login from '@/views/login/index'
import tel from '@/views/login/phone'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home',
  component: home
}, {
  path: '/tel',
  name: 'tel',
  component: tel
}, {
  path: '/login',
  name: 'login',
  component: login
}, {
  path: '/top',
  name: 'top',
  component: top
}, {
  path: '/topdetail/:name',
  name: 'topdetail',
  component: topDetail
}, {
  path: '/search',
  name: 'search',
  component: search,
  redirect: {
    name: 'hot'
  },
  children: [{
    path: 'site',
    name: 'site',
    component: site
  }, {
    path: 'hot',
    name: 'hot',
    component: hotSearch
  }]
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
