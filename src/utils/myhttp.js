
//导入axios
import axios from 'axios'
//导入操作TOKEN的方法
import {getToken} from './myToken.js'

//定义一个instance
const instance =axios.create({
    baseURL:process.env.VUE_APP_baseURL,
    withCredentials:true,
})

//请求拦截器 
instance.interceptors.request.use(function (config) {
    config.headers.token = getToken();
    return config
},function (error){
    return Promise.reject(error)
});
// 响应拦截器
instance.interceptors.response.use(function(response){
    return response
},function (error){
    return Promise.reject(error)
})

export default instance;