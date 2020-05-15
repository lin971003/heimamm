<template>
  <div>
      <div>
    <!-- 上方卡片区域 -->
    <el-card style="margin-bottom:20px">
      <!-- 行内表单 -->
      <el-form :inline="true" :model="obj" class="demo-form-inline">
        <!-- 学科编号 -->
        <el-form-item label="企业编号">
          <el-input v-model="obj.rid" class="short"></el-input>
        </el-form-item>
        <!-- 学科名称 -->
        <el-form-item label="企业名称">
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
          <el-button type="primary" @click="entAdd">
            <i class="el-icon-plus"></i> 新增企业
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下方区域 -->
    <el-card>
      <!-- 表格区域 -->
      <el-table :data="entList" style="width: 100%">
        <el-table-column type="index" label="序号" width="100px"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <!-- <el-table-column prop="short_name" label="简称"></el-table-column> -->
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column  label="创建日期">
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
       <!-- 新增企业面板 -->
    <!-- <entAdd ref="entAdd"></entAdd> -->
    <!-- 修改企业面板 -->
    <!-- <entEdit ref="entEdit"></entEdit> -->
    <ent ref="ent"></ent>

  </div>
  </div>
</template>

<script>
//导入获取企业列表API
import { apiGetlist,apiEntDel,apiEntStatus } from '../../../api/enterprise.js'
//导入新增和编辑页面的子组件
import ent from './enterprise/ent'

export default {
  data() {
    return {
    //定义一个obj对象  传给获取数据的方法
    obj: {
      page:1,
      limit:4,
      name:"",
      eid:"",
      username:"",
      status:"",
      },
    //获取的表格数据源
      entList: [],
    // 总页数
      total: 0,
     //可选页容量
      pageSizes: [2, 4, 8],
    };
  },
  //注册子组件的集合
  components:{
    ent,
  },
  methods: {
    //1.封装刷新页面获取数据的方法
    getList(){
      apiGetlist(this.obj).then(res=>{
        // window.console.log(res);
        if(res.data.code===200){
          //获取数据源
          this.entList=res.data.data.items;
          this.total=res.data.data.pagination.total;
        }
      })
    },
    //2.当前页发生改变时触发的方法
    sizeChange(index){
      this.obj.limit=index;
      this.getList();
    },
    //3.页容量发生变化的方法
    currentChange(index){
      this.obj.page=index;
      this.getList();
    },
    //新增按钮功能
    entAdd(){
      this.$refs.ent.isEdit=false;
      this.$refs.ent.dialogFormVisible=true;
      this.$refs.ent.$refs.form.resetFields();
      
    },
    //筛选功能
    search(){
      this.getList();
    },
    //清除筛选
    clearSearch(){
      this.obj.rid="";
      this.obj.name="";
      this.obj.username="";
      this.obj.status="";
    },
    //删除按钮
    del(row){
       this.$confirm('您确定要删除吗？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         apiEntDel(row.id).then(res=>{
          if(res.data.code===200){
            this.$message.success('删除成功');
             if(this.entList.length==1){
              this.obj.page=this.obj.page-1;
            }
            this.getList();
          }else{
            this.$message.error(res.data.message);
          }
        });
        })
     
    },
    //状态切换功能
    qyjy(row){
      // window.console.log(row);
      apiEntStatus(row.id).then(res=>{
        // window.console.log(res);
        if(res.data.code===200){
          if(row.status===0){
              this.$message.success('启用成功!!');
          }else{
              this.$message.success('禁用成功!!');
          }
          this.getList();
        }else{
          this.$message.error(res.data.message);
        }
      })
    },
    //编辑按钮功能
    edit(row){
      this.$refs.ent.isEdit=true;
      this.$refs.ent.dialogFormVisible=true;
      this.$nextTick(()=>{
        this.$refs.ent.form=JSON.parse(JSON.stringify(row));
      })
    }
  },
  created() {
    //调用刷新页面方法
    this.getList();
  },
}
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