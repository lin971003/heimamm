//导入组件
import chart from '../views/index/components/chart.vue'
import user from '../views/index/components/user.vue'
import question from '../views/index/components/question.vue'
import enterprise from '../views/index/components/enterprise.vue'
import subject from '../views/index/components/subject.vue'


export default [
    {path:'chart',component:chart,meta:{title:'数据概览' , roles:["超级管理员","管理员","老师"] , fullPath:"/index/chart" ,icon:"el-icon-pie-chart"  }  },
    {path:'user',component:user,meta:{title:'用户列表' , roles:["超级管理员","管理员","老师"] , fullPath:"/index/user",icon:"el-icon-user" }},
    {path:'question',component:question,meta:{title:'题库列表' , roles:["超级管理员","管理员","学生","老师"], fullPath:"/index/question",icon:"el-icon-edit-outline"  }},
    {path:'enterprise',component:enterprise,meta:{title:'企业列表' , roles:[ "超级管理员","管理员" ], fullPath:"/index/enterprise",icon:"el-icon-office-building"  }},
    {path:'subject',component:subject,meta:{title:'学科列表' , roles:[ "超级管理员","管理员" ], fullPath:"/index/subject",icon:"el-icon-notebook-2"  }},
]