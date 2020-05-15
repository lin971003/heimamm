//封装设置token  获取token  删除token的方法

//定义一个KEY
let KEY ='heimamm';

//设置token
export function setToken(value){
    window.localStorage.setItem(KEY,value);
}

//设置token
export function getToken(){
   return window.localStorage.getItem(KEY);
}

//删除token
export function removeToken(){
 window.localStorage.removeItem(KEY);
}