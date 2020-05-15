<template>
  <div>
    <!-- 上方卡片区域 -->
    <el-card style="margin-bottom:20px">
      <!-- 行内表单 -->
      <el-form :inline="true" :model="obj" class="demo-form-inline">
        <!-- 用户名称 -->
        <el-form-item label="用户名称">
          <el-input v-model="obj.username" class="short"></el-input>
        </el-form-item>
        <!-- 用户邮箱 -->
        <el-form-item label="用户邮箱">
          <el-input v-model="obj.email" class="long"></el-input>
        </el-form-item>
        <!-- 角色 -->
        <!-- <el-form-item label="角色">
          <el-input v-model="obj.role" class="short"></el-input>
        </el-form-item>-->
        <!-- 角色 -->
        <el-form-item label="角色">
          <el-select v-model="obj.role_id" class="long">
            <el-option label="所有" value></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <!-- 搜索 -->
        <el-form-item>
          <el-button type="primary" @click="Search">搜索</el-button>
        </el-form-item>
        <!-- 清除 -->
        <el-form-item>
          <el-button @click="Clean">清除</el-button>
        </el-form-item>
        <!-- 新增学科 -->
        <el-form-item>
          <el-button type="primary" @click="userAdd">
            <i class="el-icon-plus"></i> 新增用户
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下方区域 -->
    <el-card>
      <!-- 表格区域 -->
      <el-table :data="userList" style="width: 100%" :border="true">
        <el-table-column type="index" label="序号" width="100px"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <!-- <el-table-column prop="short_name" label="简称"></el-table-column> -->
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>

        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.status==0 ? '禁用' : '启用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" @click="edit(scope.row)" v-if="['超级管理员','管理员','老师'].includes($store.state.role)" >编辑</el-link>&nbsp;
            <el-link
              type="primary"
              :underline="false"
              @click="qyjy(scope.row)"
              v-if="['超级管理员','管理员','老师'].includes($store.state.role)"
            >{{scope.row.status==0 ? '启用' : '禁用'}}</el-link>&nbsp;
            <el-link type="primary" :underline="false" @click="del(scope.row)" v-if="['超级管理员','管理员'].includes($store.state.role)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <div class="pages">
        <el-pagination
          background
          :current-page="obj.page"
          :page-sizes="pageSizes"
          :page-size="obj.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="sizeChange"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </el-card>
      <!-- 新增和编辑区域 -->
      <userAE ref="userAE"></userAE>
  </div>
</template>

<script>
//导入封装的api
import { apGetUser, apiStatus, apiDel } from "../../../api/user";
//导入子组件
import userAE from './user/userAE'
export default {
  data() {
    return {
      //表格数据源
      userList: [],
      //分页数据源
      pageSizes: [2, 4, 8],
      obj: {
        username: "",
        email: "",
        role_id: "",
        page: 1,
        limit: 4
      },
      total: 0,
    };
  },
  components:{
    userAE
  },
  created() {
    this.getUserList();
  },
  methods: {
    //获取数据的方法
    getUserList() {
      apGetUser(this.obj).then(res => {
        if (res.data.code === 200) {
          this.userList = res.data.data.items;
          this.total = res.data.data.pagination.total;
        }
      });
    },

    //页容量改变时刷新数据
    sizeChange(index) {
      this.obj.limit = index;
      this.getUserList();
    },

    //当前页改变时刷新数据
    currentChange(index) {
      this.obj.page = index;
      this.getUserList();
    },
    //搜索按钮功能
    Search() {
      this.getUserList();
    },

    //清除搜索按钮功能
    Clean() {
      this.obj.username = "";
      this.obj.email = "";
      this.obj.role_id = "";
    },

    //状态切换功能实现
    qyjy(row) {
      apiStatus(row.id).then(res => {
        if (res.data.code === 200) {
          if (row.status === 0) {
            this.$message.success("启用成功");
          } else {
            this.$message.success("禁用成功");
          }
          this.getUserList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    //删除按钮功能实现
    del(row) {
      this.$confirm("您确定要删除吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
         apiDel(row.id).then(res=>{
           if(res.data.code===200){
             this.$message.success('删除成功！');
             if(this.userList.length==1){
               this.obj.page-=1;
             }
             this.getUserList();
           }else{
             this.$message.error(res.data.message);
           }
         })
      });
    },

    //新增用户
    userAdd(){
      this.$refs.userAE.isEdit=false;
      this.$refs.userAE.dialogFormVisible=true;
      this.$refs.userAE.$refs.form.resetFields();
    },

    //修改用户
     edit(row){
      this.$refs.userAE.isEdit=true;
      this.$refs.userAE.dialogFormVisible=true;
      this.$nextTick(()=>{
         this.$refs.userAE.form=JSON.parse(JSON.stringify(row));
      })
     

    }

  }
};
</script>

<style>
</style>