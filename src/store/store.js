//在JS文件中使用vuex
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

//vuex实例化
const store = new Vuex.Store({
    //定义参数
    state:{
        username:'',
        imgUrl:'',
        role:"", //用户角色
    },
    //定义方法
    mutations:{
        setInfo:function (state,payload){
            state.username=payload.username;
            state.imgUrl=process.env.VUE_APP_baseURL + "/"+payload.avatar;
        },
        //定义一个设置用户角色的方法
        setRole: function (state,payload){
            state.role=payload;
        }
    }
})

export default store