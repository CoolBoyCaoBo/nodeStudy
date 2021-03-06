// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import axios from 'axios'
import App from './App'
import router from './router'
import sjPlugin from './common'

Vue.use(sjPlugin);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// Vue.$http = Vue.prototype.$http = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  created(){
    this.$http({
      url:'user/loginState',
      method: 'get'
    }).then((res)=>{
      if(res.data.code === 200){
        this.$router.push({path:'/home'});
      }
    })
  },  
  router,
  components: { App },
  template: '<App/>'
})
