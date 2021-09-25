import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.prototype.$http=axios
axios.defaults.baseURL='http://api-breakingnews-web.itheima.net'
axios.interceptors.request.use(config=>{
  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config
})

// 组件按需导入
import {Button, Form, FormItem, Input,Message} from 'element-ui'



Vue.use(Button)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Form)
Vue.prototype.$message=Message

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
