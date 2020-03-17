import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import  './style/index.css'

Vue.use(ElementUI);
Vue.config.productionTip = false

//使用环境变量
window.console.log(process.env.VUE_APP_NAME);
window.console.log(process.env.VUE_APP_TITLE);

import router from './router/index.js'
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
