<template>
  <div>
    <!-- 上方卡片区域 -->
    <el-card style="margin-bottom:20px">
      <!-- 行内表单 -->
      <el-form :inline="true" :model="obj" class="demo-form-inline">
        <!-- 学科编号 -->
        <el-form-item label="学科编号">
          <el-input v-model="obj.rid" class="short"></el-input>
        </el-form-item>
        <!-- 学科名称 -->
        <el-form-item label="学科名称">
          <el-input v-model="obj.name" class="long"></el-input>
        </el-form-item>
        <!-- 创建者 -->
        <el-form-item label="创建者">
          <el-input v-model="obj.username" class="short"></el-input>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态">
          <el-select v-model="obj.status"  class="long">
            <el-option label="所有" value=""></el-option>
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <!-- 搜索 -->
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
        <!-- 清除 -->
        <el-form-item>
          <el-button @click="clearSearch">清除</el-button>
        </el-form-item>
        <!-- 新增学科 -->
        <el-form-item>
          <el-button type="primary" @click="add">
            <i class="el-icon-plus"></i> 新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下方区域 -->
    <el-card>
      <!-- 表格区域 -->
      <el-table :data="userInfo" style="width: 100%">
        <el-table-column type="index" label="序号" width="80px"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            {{scope.row.create_time | mytime}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.status==0 ? '禁用' : '启用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" @click="edit(scope.row)">编辑</el-link>&nbsp;
            <el-link
              type="primary"
              :underline="false"
              @click="qyjy(scope.row)"
            >{{scope.row.status==0 ? '启用' : '禁用'}}</el-link>&nbsp;
            <el-link type="primary" :underline="false" @click="del(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <div class="pages">
        <el-pagination background :current-page="obj.page" :page-sizes="pageSizes" :page-size="obj.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"   @size-change="sizeChange"
        @current-change="currentChange">
        </el-pagination>
      </div>
    </el-card>
    <!-- 新增学科面板 -->
    <subjectadd ref="add"></subjectadd>
    <!-- 修改学科面板 -->
    <editSubject ref="edit"></editSubject>
  </div>
</template>

<script>
//导入GetSubject方法
import { GetSubject, subjectStatus,removeSub } from "../../../api/subject";
//导入新增学科子组件
import subjectadd from "./subjectadd/subjectadd";
//导入修改学科子组件
import editSubject from "./subjectadd/eidtSubject";
//导入filter.js
import '@/filters/timeFilter.js'

export default {
  data() {
    return {
      //获取的表格数据源头
      userInfo: [],
      // 总页数
      total: 0,
      //可选页容量
      pageSizes: [2, 4, 8],

      //定义一个obj对象  传给获取数据的方法
      obj: {
      name: "",
        //当前页面
      page: 1,
        //每页容量
      limit: 4,
      rid:"",
       username:"",
       status:'',
      }
    };
  },
  components: {
    subjectadd,
    editSubject
  },
  created() {
    this.refreshSubject();
  },
  methods: {
    //刷新数据的方法
    refreshSubject() {
      GetSubject(this.obj).then(res => {
        this.userInfo = res.data.data.items;
        this.total = res.data.data.pagination.total;
        // window.console.log(res);
      });
    },
    //启用禁用状态切换
    qyjy(row) {
      let id = row.id;
      //调用封装的api
      subjectStatus(id).then(res => {
        // window.console.log("状态切换:", res);
        if (res.data.code === 200) {
          this.$message.success("状态切换成功");
          this.refreshSubject();
        }
      });
    },
    //新增学科
    add() {
      this.$refs.add.dialogFormVisible = true;
    },
    //点击页码改变时触发的事件 currentChange  点击页码刷新页面数据
    currentChange(index){
      this.obj.page=index;
      //调用方法刷新数据
      this.refreshSubject();
    },
    //页容量改变的时候触发的事件  sizeChange  刷新页面数据
    sizeChange(index){
      window.console.log(index);
      this.obj.limit=index;
        //调用方法刷新数据
      this.refreshSubject();
    },
    //筛选按钮功能的实现
    search(){
      // window.console.log(this.obj);
      this.refreshSubject();
    },
    //清除按钮功能的实现
    clearSearch(){
      this.obj.name='';
      this.obj.rid='';
      this.obj.username='';
      this.obj.status='';
    },
    //编辑按钮
    edit(row){
      this.$refs.edit.dialogFormVisible=true;
       
      if( row.id != this.$refs.edit.form.id){
         this.$refs.edit.form=JSON.parse(JSON.stringify(row));
      }
   
    },
    //删除按钮
    del(row){
      let id =row.id; 
      this.$confirm('您确定要删除吗？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         removeSub(id).then(res=>{
          if(res.data.code===200){
            this.$message.success('删除成功');
             if(this.userInfo.length==1){
              this.obj.page=this.obj.page-1;
            }
            this.refreshSubject();
          }else{
            this.$message.error(res.data.message);
          }
        });
        })
    }

  }
};
</script>

<style lang='less'>
.pages {
  text-align: center;
  margin-top: 30px;
}
.demo-form-inline {
  .short {
    width: 150px;
  }
  .long {
    width: 200px;
  }
}
</style>