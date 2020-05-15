<template>
  <div class="ques">
    <!-- 上方卡片区域 -->
    <el-card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <!-- <el-select v-model="formInline.subject" placeholder="请选择学科" class="formitem">
            <el-option
              v-for="(item, index) in subjectList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select> -->
          <subjectcom v-model="formInline.subject" ></subjectcom>

        </el-form-item>

        <el-form-item label="阶段">
          <el-select v-model="formInline.step" placeholder="请选择阶段" class="formitem">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="企业">
          <!-- <el-select v-model="formInline.enterprise" placeholder="请选择企业" class="formitem">
            <el-option
              v-for="(item, index) in entList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select> -->
          <entcom v-model="formInline.enterprise" ></entcom>
        </el-form-item>

        <el-form-item label="题型">
          <el-select v-model="formInline.type" placeholder="请选择题型" class="formitem">
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="简答" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <br />

        <el-form-item label="难度">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度" class="formitem">
            <el-option label="简单" :value="1"></el-option>
            <el-option label="一般" :value="2"></el-option>
            <el-option label="困难" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="作者">
          <el-input v-model="formInline.username" class="formitem"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态" class="formitem">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker
            style="width:150px"
            v-model="formInline.create_date"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>

        <br />

        <el-form-item label="标题">
          <el-input v-model="formInline.title" class="long"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>

        <el-form-item>
          <el-button @click="clearSearch">清除</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="openadd">
            <i class="el-icon-plus"></i> 新增试题
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下方卡片区域 -->
    <el-card class="cardBtm">
      <el-table :data="questionList" style="width: 100%" :border="true">
        <el-table-column type="index" label="序号" width="80px"></el-table-column>
        <el-table-column  label="题目" width="300px">
          <template slot-scope="scope">
            <span v-html="scope.row.answer_analyze"></span>
          </template>
        </el-table-column>
        <el-table-column  label="学科.阶段">
            <template slot-scope="scope">
              {{scope.row.subject_name}}·
              <span v-if="scope.row.step===1" >初级</span>
              <span v-else-if="scope.row.step===2">中级</span>
              <span v-else>高级</span>
            </template>
        </el-table-column>
        <el-table-column prop="subject_name" label="题型">
             <template slot-scope="scope">
              <span v-if="scope.row.type===1" >单选</span>
              <span v-else-if="scope.row.type===2">多选</span>
              <span v-else>简答</span>
            </template>
        </el-table-column>
        <el-table-column prop="enterprise" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.status==0 ? '禁用' : '启用'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" >编辑</el-link>&nbsp;
            <el-link
              type="primary"
              :underline="false"
              
            >{{scope.row.status==0 ? '启用' : '禁用'}}</el-link>&nbsp;
            <el-link type="primary" :underline="false" >删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <div class="pages">
        <el-pagination background :current-page="formInline.page" :page-sizes="pageSizes" :page-size="formInline.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"  >
        </el-pagination>
      </div>
    </el-card>
    {{formInline}}
    <add ref="add" />
  </div>
</template>

<script>
//导入获取学科数据api
// import { GetSubject } from "../../../api/subject.js";
// //导入获取企业数据api
// import { apiGetlist } from "../../../api/enterprise";
//导入获取题库数据api
import {apiQuesList} from '../../../api/question'
//导入subjectcom子组件
// import subjectcom from '../../../components/subjectcom'
//导入subjectcom子组件
// import entcom from '../../../components/entcom'

//导入新增面板
import add from './question/add'



export default {
  data() {
    return {
      //表单数据保存
      formInline: {
        title:"",
        subject:"",
        enterprise:"",
        type:"",
        step:"",
        username:"",
        status:"",
        difficulty:"",
        create_date: "",
        page:1,
        limit:10,
      },
      total:0,
      //学科数据保存
      subjectList: [],
      //企业数据保存
      entList: [],
      //分页数据
      pageSizes:[2,4,8],
      //保存题库数据
      questionList:[],

    };
  },
  //注册子组件
  components:{
    add,
    // subjectcom,
    // entcom,
  },
  created() {
    //调用获取学科数据方法
    // this.getSub();
    // //调用获取企业数据方法
    // this.getEnt();
    //调用获取题库方法
    this.getQuesList();
  },
  methods: {
     //子组件传值给父组件
  // changesubject(value){
  //   // window.console.log("父组件",value);
  //   this.formInline.subject=value;
  // },
   //子组件传值给父组件
    // changeEnterprise(value){
    //   this.formInline.enterprise=value;
    // },
  //打开新增面板事件
  openadd(){
    this.$refs.add.dialogFormVisible=true;
  },
  clearSearch(){
    this.formInline.subject=""
    this.formInline.enterprise=""
  },
  search(){},
    //当前页发生改变时触发的事件
  // currentChange(){

  // },
   //当前页发生改变时触发的事件
  // sizeChange(){

  // },

    // //获取学科数据的方法
    // getSub() {
    //   GetSubject({ page: 1, limit: 10 }).then(res => {
    //     // window.console.log("学科", res);
    //     if (res.data.code === 200) {
    //       this.subjectList = res.data.data.items;
    //     }
    //   });
    // },
    // //获取企业数据的方法
    // getEnt() {
    //   apiGetlist({ page: 1, limit: 10 }).then(res => {
    //     // window.console.log("企业", res);
    //     if (res.data.code === 200) {
    //       this.entList = res.data.data.items;
    //     }
    //   });
    // },
    //获取题库列表方法
    getQuesList(){
      apiQuesList(this.formInline).then(res=>{
        // window.console.log(res);
        if(res.data.code===200){
          this.questionList=res.data.data.items;
         this.total=res.data.data.pagination.total;
        }
      })
    }
  }
};
</script>

<style lang='less'>
.ques {
  .el-form-item {
    .el-form-item__label {
      padding-left: 21px;
      padding-right: 31px;
    }
    .long {
      width: 388px;
    }
  }
  .formitem {
    width: 150px;
  }
  .pages{
    margin-top: 30px;
  }
  .cardBtm{
    margin-top: 30px;
  }
}
</style>