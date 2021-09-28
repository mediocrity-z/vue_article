import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    // 用户信息
    user:{
    },
    // 用户头像的图片地址
    imgUrl:''
  },
  mutations: {
    // 保存用户信息
    sendUser(state,data){
  state.user=data
    },
    // 保存头像的图片地址
    sendImg(state,url){
      state.imgUrl=url
    },
    // 保存更新后的用户信息
    updateUser(state,data){
      state.user=data
    },
    // 保存头像更新后的图片地址
    updateAtr(state,data){
      state.imgUrl=data
    }
  },
  actions: {
  
  },
  modules: {
  },
  getters:{
   
  }
})
