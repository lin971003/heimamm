<template>
  <div>
    <el-dialog title="新增企业" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <!-- 企业编号 -->
        <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
          <el-input v-model="form.eid" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 企业名称 -->
        <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 企业简称 -->
        <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 企业简介 -->
        <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 企业备注 -->
        <el-form-item label="企业备注" :label-width="formLabelWidth" prop="remark">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancl">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//导入新增企业api
import { apiEntAdd } from '../../../../api/enterprise'
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "100px",
      form: {
        eid:"",
        name:"",
        short_name:"",
        intro:"",
        remark:"",
      },
      rules: {
           eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
           name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
           short_name: [{ required: true, message: "请输入企业简称", trigger: "blur" }],
           intro: [{ required: true, message: "请输入企业简介", trigger: "blur" }],
           remark: [],
      }
    };
  },
  methods: {
      //点击确定按钮
      submitForm(){
            apiEntAdd(this.form).then(res=>{
                window.console.log(res);
                if(res.data.code===200){
                  this.$message.success('新增成功!');
                  this.$refs.form.resetFields();
                  this.dialogFormVisible=false;
                  this.$parent.getList();
                }else{
                  this.$message.error(res.data.message);
                }
            })
      }
  }
};
</script>

<style>
</style>