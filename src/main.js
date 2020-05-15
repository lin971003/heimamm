import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import  './style/index.css'
//导入全局组件
import subject from './components/subjectcom.vue'
import ent from './components/entcom.vue'
import select from './components/select.vue'
//导入富文本编辑器需要的
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.use(VueQuillEditor);

//注册
Vue.component('subjectcom',subject);
Vue.component('entcom',ent);
Vue.component('selectJL',select);

//使用环境变量
// window.console.log(process.env.VUE_APP_NAME);
// window.console.log(process.env.VUE_APP_TITLE);

import router from './router/index.js'
import store from './store/store'
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
