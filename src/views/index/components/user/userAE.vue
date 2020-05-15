<template>
  <div>
    <el-dialog :title="isEdit ? '修改用户' : '新增用户' " :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <!-- 用户名 -->
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 电话 -->
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 角色 -->
        <el-form-item label="角色" :label-width="formLabelWidth" prop="role_id">
          <el-select v-model="form.role_id" placeholder="请选择">
              <el-option :value='2' label='管理员'></el-option>
              <el-option :value='3' label='老师'></el-option>
              <el-option :value='4' label='学生'></el-option>
          </el-select>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
          <el-select v-model="form.status" placeholder="请选择" >
              <el-option label='启用' :value='1' ></el-option>
              <el-option label='禁用' :value='0' ></el-option>
          </el-select>
        </el-form-item>
        <!-- 用户备注 -->
        <el-form-item label="用户备注" :label-width="formLabelWidth" prop="remark">
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
//导入封装的新增和编辑用户api
import { apiAddUser, apiEdit } from '../../../../api/user'
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "100px",
      isEdit: false,
      form: {
       username:"",
       email:"",
       phone:"",
       role_id:"",
       status:"",
       remark:"",
       id:"",
      },
      rules:{
        username:[
                { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
        email:[
                { required: true, message: '请输入邮箱', trigger: 'blur' },
          ],
        phone:[
                { required: true, message: '请输入电话', trigger: 'blur' },
          ],
        role_id:[
                { required: true, message: '请选择', trigger: 'change' },
          ],
        status:[
                { required: true, message: '请选择', trigger: 'change' },
          ],
        remark:[],
      },
    };
  },
  methods: {
    //确定按钮功能实现
    submitForm(){
      if(this.isEdit){
        //编辑用户的逻辑
        apiEdit(this.form).then(res=>{
          if(res.data.code===200){
            this.$message.success('新增成功！');
            this.dialogFormVisible=false;
            this.$parent.getUserList();
          }else{
            this.$message.error(res.data.message)
          }
        })
      }else{
        //新增用户的逻辑
        apiAddUser(this.form).then(res =>{
          // window.console.log('新增',res);
          if(res.data.code===200){
            this.$message.success('新增成功！');
            this.dialogFormVisible=false;
            this.$parent.getUserList();
            this.$refs.form.resetFields();
          }else{
            this.$message.error(res.data.message);
          }
        })
      }
    },
    //取消按钮功能实现
    cancl(){
      this.dialogFormVisible=false;
         this.$refs.form.resetFields();
    },

  },
};
</script>

<style>
</style>