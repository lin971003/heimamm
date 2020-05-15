<template>
  <div>
    <el-dialog title="编辑企业" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
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
         <!-- 所属行业 -->
         <el-form-item label="所属行业" :label-width="formLabelWidth">
         <el-select v-model="form.tag">
             <el-option value="金融" lable="金融"></el-option>
             <el-option value="电商" lable="电商"></el-option>
             <el-option value="互联网" lable="互联网"></el-option>
         </el-select>
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
//导入编辑企业api
import {apiEntEdit} from '../../../../api/enterprise'

export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "100px",
      form: {
        eid:"",
        id:"",
        name:"",
        short_name:"",
        intro:"",
        remark:"",
        tag:"",
      },
    
    };
  },
  methods: {
      //编辑功能实现
     submitForm(){
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
     }
      
  }
};
</script>

<style>
</style>