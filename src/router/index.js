//导入
import Vue from 'vue'
import vueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import useElement from '../views/useElementui/useElement.vue'

//使用  注册
Vue.use(vueRouter);

//实例化
const router = new vueRouter({
    routes:[
        { path:'/login',component:Login},
        { path:'/useElement', component:useElement}
    ]
});

//暴露路由
export default router;