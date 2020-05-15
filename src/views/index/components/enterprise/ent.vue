<template>
  <div>
    <el-dialog :title="isEdit ? '修改企业' : '新增企业' " :visible.sync="dialogFormVisible">
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
//导入新增和编辑的api
import {apiEntEdit,apiEntAdd} from '../../../../api/enterprise'
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "100px",
      isEdit:true,
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
      //确定按钮逻辑
      submitForm(){
          if(this.isEdit){
        //编辑企业逻辑
            apiEntEdit(this.form).then(res=>{
            //  window.console.log(res);
             if(res.data.code===200){
                 this.$message.success('修改成功！！');
                 this. dialogFormVisible=false;
                 this.$parent.getList();
             }else{
                 this.$message.error(res.data.message);
             }
         })
          }else{
            //新增企业逻辑
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
      },
      //取消按钮逻辑
      cancl(){
          this.dialogFormVisible=false;
          this.$refs.form.resetFields();
      },
  },
}
</script>

<style>

</style>