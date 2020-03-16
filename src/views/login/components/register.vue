<template>
  <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
    <!-- 输入框部分 -->
    <el-form :model="form" :rules="rules" ref="form">
      <!-- 昵称 -->
      <el-form-item prop="nickname" label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item prop="phone" label="手机号" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 图形码 -->
      <el-form-item prop="imgcode" label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.imgcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7">
            <img class="img" src="../../../assets/login_captcha.png" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="logincode" label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.logincode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7">
            <button class="img btn">获取用户验证码</button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false" class="btn1" >取 消</el-button>
      <el-button type="primary" @click="register" class="btn1" >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
       formLabelWidth: "67px",
       
      form: {
        nickname:'',
        email:'',
        phone:'',
        password:'',
        imgcode:'',
        logincode:'',
      },

    rules:{
        nickname:[
                { required: true, message: '请输入昵称', trigger: 'blur' },
                { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ],
        email:[
                { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        phone:[
                { required: true, message: '请输入手机号', trigger: 'blur' },
                { min: 11, max:11, message: '长度在 11 个字符', trigger: 'blur' }
        ],
        password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        imgcode:[
                { required: true, message: '请输入图形验证码', trigger: 'blur' },
                { min: 4, max: 4, message: '长度在 4 个字符', trigger: 'blur' }
        ],
        logincode:[
                { required: true, message: '请输入手机验证码', trigger: 'blur' },
                { min: 6, max: 6, message: '长度在 6 个字符', trigger: 'blur' }
        ],
    },
        
    };
  },
  methods: {
      register(){
          this.$refs.form.validate(valid=>{
              if(valid){
                  this.$message.success('验证通过!!');
              }else{
                  this.$message.error('验证不通过!!')
              }
          })
      }
  },
};
</script>

<style lang='less'>
.el-dialog {
  width: 600px;
  //   height: 786px;

  .el-dialog__header {
    padding: 0;
    width: 600px;
    height: 53px;
    line-height: 53px;
    text-align: center;
    // border:1px solid rgba(78,78,78,1);
    background: linear-gradient(to right, #02c6fc, #1394fc);
    .el-dialog__title {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(254, 254, 254, 1);
    }
  }

  .el-dialog__body {
    padding-right: 27px;
    .el-col-7 {
      float: right;
      height: 41px;
      .img {
        width: 143px;
        height: 41px;
      }
      .btn {
        border: 1px solid rgba(211, 215, 223, 1);
        border-radius: 4px;
        background-color: #fff;
      }
    }
    .el-col-17 {
      width: 325px;
      .el-input__inner {
        //   width: 325px;
        padding: 0px;
      }
    }
  }
  .el-dialog__footer {
    padding: 0px 20px 20px;
    .dialog-footer {
      text-align: center;
      .btn1{
          width: 75px;
          height: 39px;
      }
    }
  }
}
</style>