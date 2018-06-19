import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home.vue'
import Index from '@/components/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'HelloWorld',component: HelloWorld},
    {path: '/home',name: 'home',component: Home},
    {path: '/index',name: 'index',component: Index},
  ]
})
