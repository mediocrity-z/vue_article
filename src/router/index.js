import Vue from 'vue'
import VueRouter from 'vue-router'
const Login=()=>import('../components/login.vue')
const Home=()=>import('../components/home.vue')
const Page=()=>import('../components/page.vue')
const Welcome=()=>import('../components/welcome.vue')
const Basic=()=>import('../components/basic.vue')
const Pic=()=>import('../components/pic.vue')
const Resetp=()=>import('../components/resetp.vue')
const Cate=()=>import('../components/cate.vue')
const List=()=>import('../components/list.vue')
const Publish=()=>import('../components/publish.vue')
Vue.use(VueRouter)

const routes = [
    {
      path:'/',
      redirect:'/login'
    }
  ,{
   path:'/login',
   component:Login
  },
  {
  path:'/home',
  component: Home,
  redirect:'/welcome',
  children:[
    {
      path:'/welcome',
      component:Welcome
    }
    ,{
      path:'/page',
      component:Page
    },
    {
      path:'/basic',
      component:Basic
    },
    {
      path:'/pic',
      component:Pic
    },
    {
      path:'/resetp',
      component:Resetp
    },
    {
      path:'/cate',
      component:Cate
    },
    {
      path:'/list',
      component:List
    },
    {
      path:'/publish',
      component:Publish
    }
  ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

//导入nprogress包对应的js和css
import NProgress from 'nprogress/nprogress'
import 'nprogress/nprogress.css'

// 路由导航守卫
router.beforeEach((to,from,next)=>{
  // 如果跳转登录页，直接放行
  if(to.path=='/login'){return next()}
  let str=window.sessionStorage.getItem('token')
  // 如果没有token值拦截访问路由
  if(!str){return next('/login')}
  // 放行
  next()
  // 显示顶部进度条
  NProgress.start()
  // 隐藏顶部进度条
  NProgress.done()
})

export default router
