<template>
    <div>
    <el-dialog title="修改学科" :visible.sync="dialogFormVisible">
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
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//导入方法
import {subjectEdit} from '@/api/subject.js'
export default {
    data() {
    return {
      dialogFormVisible: false,
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: "",
        id:'',
      },
      formLabelWidth: "100px",
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
      }
    };
  },
  methods: {
      //取消按钮功能实现
      cancl(){
          this.dialogFormVisible=false;
      },
      //确定按钮功能实现
      submitForm(){
          //表单验证
        this.$refs.form.validate((valid) => {
          if (valid) {
              //调用编辑方法
            subjectEdit(this.form).then(res=>{
                if(res.data.code===200){
                    //提示修改成功
                    this.$message.success('修改成功');
                    //关闭面板
                    this.dialogFormVisible=false;
                    //刷新页面数据
                    this.$parent.refreshSubject();
                }else{
                    this.$message.error(res.data.message);
                }
            })
          } else {
           this.$message.error('表单验证不通过')
            return false;
          }
        });
       
      }
  },
}
</script>

<style>

</style>