import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级路由
import layout from '@/views/Layout/layout.vue'
const login = () => import('@/views/Login')

// 二级路由
import home from '@/views/Home'

const order = () => import('@/views/Orders')
const params = () => import('@/views/Params')
const goods = () => import('@/views/Goods')
const goodsList =()=>import('@/views/Goods/goodslist')
const goodsAdd =()=>import ('@/views/Goods/goodsadd')

const user =()=> import('@/views/User')


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: layout,
    meta:{
      isLogin:true
    },
    children:[
      {
        path:'/',
        component:home
      },
      {
        path:'/goods',
        component:goods,
        // 上坪三级路由导航
        children:[
          {
            path:'/goods/goodsList',
            component:goodsList
          },
          {
            path:'/goods/goodsAdd',
            component:goodsAdd
          }
        ]
      },
      {
        path:'/order',
        component:order
      },
      {
        path:'/params',
        component:params
      },
      {
        path:'/user',
        component:user
      }
    ]
  },
  {
    path: '/login',
    component: login
  },
 

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})




export default router
