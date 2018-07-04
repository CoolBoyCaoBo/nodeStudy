import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home.vue'
import Register from '@/components/register.vue'
import Login from '@/components/login.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {path: '/home',name: 'home',component: Home},
    {path: '/login',name: 'login',component: Login},
    {path: '/register',name: 'register',component: Register},
  ]
})
