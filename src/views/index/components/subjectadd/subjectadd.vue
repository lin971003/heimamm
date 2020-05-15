<template>
  <div>
    <el-dialog title="新增学科" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <!-- 学科编号 -->
        <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
          <el-input v-model="form.rid" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 学科名称 -->
        <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 学科简称 -->
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 学科简介 -->
        <el-form-item label="学科简介" :label-width="formLabelWidth">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 学科备注 -->
        <el-form-item label="学科备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancl">取 消</el-button>
        <el-button type="primary" @click="submitForm(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//导入封装的方法
import {subjectAdd} from '@/api/subject.js'

export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      formLabelWidth: "100px",
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    //表单确定按钮 1.传入表单参数 2.验证表单  3.调用封装的添加学科方法并传入参数   4.重置表单、关闭面板、刷新数据
    submitForm(form) {
        let rid = form.rid;
        let name = form.name;
        let short_name = form.short_name;
        let intro = form.intro;
        let remark = form.remark;
      this.$refs.form.validate(valid => {
        if (valid) {
        //   window.console.log(form);
           subjectAdd({rid,name,short_name,intro,remark}).then(res=>{
              
               if(res.data.code===200){
                   this.$message.success('添加成功');
                   //关闭面板
                   this.dialogFormVisible=false;
                   //重置表单
                   this.$refs.form.resetFields();
                   this.form.short_name='',
                   this.form.intro='',
                   this.form.remark='',
                   //刷新页面数据
                   this.$parent.refreshSubject();
               }else{
                   this.$message.error(res.data.message);
               }
           })
        } else {
          return false;
        }
      });
    },
    // 表单取消按钮  1.0重置表单列表  2.0关闭面板
    cancl(){
        //重置表单
        this.$refs.form.resetFields();
        this.form.short_name="";
        this.form.intro="";
        this.form.remark="";
        //关闭面板
        this.dialogFormVisible=false;
    }
  }
};
</script>

<style>
</style>