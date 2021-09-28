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
import {Button, Form, FormItem, Input,Message,Container,Header,Aside
  ,Main,MessageBox,Avatar,Menu,MenuItem,MenuItemGroup
  ,Submenu,Breadcrumb,BreadcrumbItem,Card,Upload,Alert,Image} from 'element-ui'

import store from './store'

Vue.use(Upload)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Button)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Avatar)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Alert)
Vue.use(Image)
Vue.prototype.$confirm=MessageBox.confirm
Vue.prototype.$message=Message

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
