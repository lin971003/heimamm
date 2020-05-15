//封装首页所有信息的请求方法
import axios from 'axios'
//导入操作token的方法
import { getToken } from '../utils/myToken'
const instance = axios.create({
    baseURL:process.env.VUE_APP_baseURL,
    withCredentials:true
});

//封装一个获取用户信息方法
export function apiInfo(){
   return instance({
        url:'/info',
        method:'GET',
        headers:{
            token:getToken()
        }
    })
}

//封装一个用户退出的方法
export function apiLogout(){
    return instance({
        url:'/logout',
        method:'GET',
        headers:{
            token:getToken()
        }
    })
}

