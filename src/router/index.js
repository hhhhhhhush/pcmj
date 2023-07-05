import { getToken } from '@/utils/storage'
import { Message } from 'element-ui'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// const routes = [

// ]

// 路由懒加载，二级路由，重定向
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout'),
      redirect: '/dashboard',
      children: [
        // 二级路由path的两种写法
        // 1.绝对路径  
        // 2.相对路径  path:'dashboard'  自动拼接上父路由的地址 => /dashboard
        { path: '/dashboard', component: () => import('@/views/dashboard') },
        { path: '/article', component: () => import('@/views/article') },
      ]
    },
    { path: '/login', component: () => import('@/views/login') },
  ]
})

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  // 排除法
  // 允许通行：1.token 2.白名单
  const token = getToken()
  if (token || whiteList.includes(to.path)) return next()
  next('/login')
  Message.error("请您先登录哦~")
})

export default router
