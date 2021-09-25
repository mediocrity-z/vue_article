import Vue from 'vue'
import VueRouter from 'vue-router'
const Login=()=>import('../components/login.vue')
const Home=()=>import('../components/home.vue')
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
  component: Home
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

router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){return next()}
  let str=window.sessionStorage.getItem('token')
  if(!str){return next('/login')}
  return next()
})

export default router
