//用来封装请求注册接口的文件
//导入axios
import axios from 'axios'
export function apigetcode(code,phone){
   return axios({
        url:process.env.VUE_APP_OnlineURL+'/sendsms',
        method:'POST',
        data:{
            code,
            phone,
        },
        withCredentials:true
    });
}   