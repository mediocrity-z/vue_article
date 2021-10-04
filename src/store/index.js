import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 用户信息
    user:{
    },
    // 文章分类列表
    cateList:[],
    // 用户头像的图片的地址
    imgUrl:''
  },
  mutations: {
    // 保存用户信息
    sendUser(state,data){
  state.user=data
    },
    // 保存更新后的用户信息
    updateUser(state,data){
      state.user=data
    },
    // 保存头像的图片地址
    sendImg(state,str){
      state.imgUrl=str
    },
    // 保存文章分类信息
getCateList(state,res){
  state.cateList=res
}
  },
  actions: {
    
},
  
  modules: {
  },
  getters:{
   
  }
})
