import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showfull: false, // 全屏播放器
    isShowMin: false, // mini播放器开关
    mp3Info: {
      name: '', // 歌曲名字
      mp3: {}, // MP3的具体信息
      lrc: '', // 歌词数据
      play: false // 控制MP3播放器开启
    } // MP3数据
  },
  actions: {
    full (ctx, [id, name]) {
      axios.get('/api/song/url?id=' + id).then(res => {
        if (res.status === 200) {
          ctx.commit('info', [res.data.data[0], name])
        }
      })
    },
    getLrc (ctx, id) {
      axios.get('/api/lyric?id=' + id).then(res => {
        if (res.status === 200) {
          ctx.commit('lrc', res.data.lrc.lyric)
        }
      })
    }
  },
  mutations: {
    info (state, data) {
      state.mp3Info.name = data[1]
      state.mp3Info.play = true
      state.showfull = true // 控制全屏播放器开关
      state.isShowMin = false // 控制全屏播放器开关
      state.mp3Info.mp3 = data[0]
    },
    lrc (state, lrc) {
      state.mp3Info.lrc = lrc
    },
    closeFull (state) {
      state.showfull = false
      state.isShowMin = true
    },
    toFull (state) {
      state.showfull = true
      state.isShowMin = false
    }
  },
  modules: {
  }
})
