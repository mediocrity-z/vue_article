import Vue from 'vue'
import VueRouter from 'vue-router'
const Login=()=>import('../components/login.vue')
const Home=()=>import('../components/home.vue')
const Page=()=>import('../components/page.vue')
const Welcome=()=>import('../components/welcome.vue')
const Basic=()=>import('../components/basic.vue')
const Pic=()=>import('../components/pic.vue')
const Resetp=()=>import('../components/resetp.vue')
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

// 路由导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){return next()}
  let str=window.sessionStorage.getItem('token')
  if(!str){return next('/login')}
  return next()
})

export default router
