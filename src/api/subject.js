//封装首页所有信息的请求方法
// import axios from 'axios'
// import {
//     getToken
// } from '../utils/myToken'
// //创建一个新的axios对象并且设置
// var instance = axios.create({
//     baseURL: process.env.VUE_APP_baseURL,
//     withCredentials: true,
// })

// instance.interceptors.request.use(function (config) {
//     config.headers.token = getToken();
//     return config
// })


//导入封装的myhttp.js
import instance from '../utils/myhttp'

//封装获取学科信息
export function GetSubject({
    name,
    page,
    limit,
    rid,
    username,
    status
}) {
    return instance({
        url: '/subject/list',
        method: 'GET',
        // headers: {
        //     token: getToken()
        // },
        params: {
            name,
            page,
            limit,
            rid,
            username,
            status
        }
    })
}


//封装学科状态
export function subjectStatus(id) {
    return instance({
        url: '/subject/status',
        method: 'POST',
        data: {
            id: id,
        }
    })
}

//封装添加学科
export function subjectAdd({rid,name,short_name,intro,remark,}) {
    return instance({
        url: '/subject/add',
        method: 'POST',
        data: {
            rid,
            name,
            short_name,
            intro,
            remark,
        }
    })
}

//封装编辑学科
export function subjectEdit({rid,name,short_name,intro,remark,id}){
    return instance({
        url:'/subject/edit',
        method:'POST',
        data:{
           rid,
           name,
           short_name,
           intro,
           remark,
           id
        }
    })
}

//封装删除学科
export function removeSub(id){
    return instance({
        url:'/subject/remove',
        method:'POST',
        data:{
            id,
        }
    })
}