//导入封装的myhttp.js
import instance from '../utils/myhttp'

//获取题库列表
export function apiQuesList({title,subject,enterprise,type,step,username,status,difficulty,create_date,page,limit,}) {
    return instance({
        url: "/question/list",
        method: "GET",
        params: {
            title,
            subject,
            enterprise,
            type,
            step,
            username,
            status,
            difficulty,
            create_date,
            page,
            limit,
        }
    })
}

//封装添加题库的方法
export function apiAdd(data){
    return instance({
        url:'/question/add',
        method:'POST',
        data:data
    })
}