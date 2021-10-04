import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';

//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
//导入富文本编辑器对应的样式
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
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




// 组件按需导入
import {Button, Form, FormItem, Input,Message,Container,Header,Aside
  ,Main,MessageBox,Avatar,Menu,MenuItem,MenuItemGroup
  ,Submenu,Breadcrumb,BreadcrumbItem,Card,Upload,Alert,Image,Table,TableColumn, Pagination, Dialog, Select, Option, Tag} from 'element-ui'

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
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tag)
Vue.prototype.$confirm=MessageBox.confirm
Vue.prototype.$message=Message

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
