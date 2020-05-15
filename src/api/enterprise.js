
//导入封装的myhttp.js
import instance from '../utils/myhttp'

//企业列表api
export function apiGetlist({ name, page, limit, eid, username, status,}){
   return instance({
        url:'/enterprise/list',
        method:'GET',
        params:{
            name,
            page,
            limit,
            eid,
            username,
            status,
        }
    })
}

//企业添加api
export function apiEntAdd({ eid, name, short_name, intro, remark}){
    return instance({
        url:'/enterprise/add',
        method:'POST',
        data:{
           eid,
           name,
           short_name,
           intro,
           remark,
        }
    })
}

//企业状态设置api
export function apiEntStatus(id){
    return instance({
        url:'/enterprise/status',
        method:'POST',
        data:{
           id,
        }
    })
}

//企业删除API
export function apiEntDel(id){
    return instance({
        url:'/enterprise/remove',
        method:'POST',
        data:{
          id,
        }
    })
}

//企业编辑api
export function apiEntEdit({ eid,id, name, tag, short_name, intro, remark}){
    return instance({
        url:'/enterprise/edit',
        method:'POST',
        data:{
           eid,
           id,
           name,
           tag,
           short_name,
           intro,
           remark,
        }
    })
}