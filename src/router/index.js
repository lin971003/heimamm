//导入
import Vue from 'vue'
import vueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import useElement from '../views/useElementui/useElement.vue'
import index from '@/views/index/index.vue'

//导入子路由
import child from './childRoute'


//导入nprogress
import NProgress from 'nprogress';
//导入样式
import 'nprogress/nprogress.css'

//导入获取token的方法
import {getToken} from '../utils/myToken.js'
//导入apiInfo
import {apiInfo} from '../api/index.js'

//在js文件中使用message
import {Message} from 'element-ui'

import store from '../store/store'



//使用  注册
Vue.use(vueRouter);

//实例化
const router = new vueRouter({
    routes:[
        //路由重定向
        {path:'/',redirect:'/login'},
        { path:'/login',component:Login},
        { path:'/useElement', component:useElement},
        //首页路由
        { path:'/index',component:index,meta:{roles:["超级管理员","管理员","学生","老师"]},
        
        children:child
    },
    ]
});






//使用路由的前置守卫
router.beforeEach((to,from,next) => {
    //得到meta属性
    const title =to.meta.title;
    if(title){
        document.title=title;
    }
    NProgress.start();
    if(to.path!='/login'){
        if(getToken()){
            apiInfo().then(res => {
                //判读用户是否处于禁用状态
                if(res.data.data.status===0){
                    Message.error('用户已经被禁用，清联系管理员');
                    NProgress.done();
                }else{ 
                    if (res.data.code == 200) {
                        NProgress.done();
                        let useInfo =res.data.data;
                        store.commit('setInfo',useInfo);
                        // Message.success('登入成功！！');
                        //判断权限
                        let role =res.data.data.role;
                        store.commit('setRole',role);
                        window.console.log(to.meta.roles,role);   
                        if(to.meta.roles.includes(role)){
                            next();
                        }else{
                            NProgress.done();
                            Message.error('您没有权限访问此页面');
                        }
                        // next();
                        }else if(res.data.code == 206){
                            NProgress.done();
                            Message.error('您还没有登录!!');
                           next('/login');
                        }
                }
             
              });

        }else{
            NProgress.done();
            Message.error('您还没有登录!!');
            next('/login');
        }
    }else{
        next();
    }
  })

// 使用路由的后置守卫
router.afterEach(() => {
    // ...
    //  NProgress.start();
     NProgress.done();
  })

//暴露路由
export default router;
