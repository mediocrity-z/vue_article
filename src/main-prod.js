import Vue from 'vue'
import App from './App.vue'
import router from './router'

//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
//将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$http=axios
axios.defaults.baseURL='http://api-breakingnews-web.itheima.net'
// axios请求拦截，给请求头加入Ahthorazition请求头，携带token值
axios.interceptors.request.use(config=>{
  // 如果post请求为formdata类型的跳过(自动把请求数据处理为一条消息用分隔符分开)，如果请求类型为x-www-form-urlencoded将请求数据改为键值对形式发送
if(config.headers['Content-Type'=='multipart/form-data']){
}else if(config.method=='post'){
  config.data=qs.stringify(config.data)
}
  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config
})





import store from './store'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
