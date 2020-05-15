//用来封装登录相关的API请求
//导入AXIOS
import axios from 'axios'
//创建一个新的axios对象并且设置
var instance =axios.create({
    baseURL:process.env.VUE_APP_baseURL,
    withCredentials:true,
})
//封装登入方法
export function apiLogin({
    phone,
    password,
    code,
}){
  return instance({
        url:'/login',
        method:'POST',
        data:{
            phone,
            password,
            code,
        },
    })
}