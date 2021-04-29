import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import './assets/css/reset.css'
import rem from './assets/js/rem'
import Vant from 'vant'
import 'vant/lib/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper)
Vue.use(Vant)
Vue.use(rem)
Vue.prototype.axios = Axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
