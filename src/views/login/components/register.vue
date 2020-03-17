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
            <img style="cursor: pointer" @click="imgChange" class="img" :src="imgUrl" alt />
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
            <button class="img btn" @click="getCode" :disabled='time!==0' style="cursor: pointer" >
              {{time===0 ? '获取用户验证码' : time}}
              </button>
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
//导入axios
// import axios from 'axios'

//导入register
import {apigetcode} from '../../../api/register.js'

//自定义表单规则  手机号码验证
 let checkPhone = (rules, value, callback) =>{
  let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(value)) {
           callback();
        }else{
          callback(new Error('手机号格式不正确!!'))
        }
 }
//自定义表单规则  邮箱验证
 let checkEmail = (rules, value, callback) =>{
  let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (reg.test(value)) {
           callback();
        }else{
          callback(new Error('邮箱格式不正确!!'))
        }
 }


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
                { validator: checkEmail, trigger: 'blur' }
        ],
        phone:[
                { required: true, message: '请输入手机号', trigger: 'blur' },
                { validator: checkPhone, trigger: 'blur' }
              
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
                { min: 4, max: 4, message: '长度在 4 个字符', trigger: 'blur' }
        ],
    },
    //图片验证码的URL
    imgUrl:process.env.VUE_APP_OnlineURL+'/captcha?type=sendsms&t='+Date.now(),
    //定时器
    timer:null,
    //倒计时
    time:0,  
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
      },
      //点击切换图片验证码
      imgChange(){
        this.imgUrl=process.env.VUE_APP_OnlineURL+'/captcha?type=sendsms&t='+Date.now();
      },
      //点击获取手机验证码
      getCode(){
        //初始化事件
        this.time=60;
        //设置一个计时器
        this.timer = setInterval(()=>{
            this.time--;
            if(this.time===0){
              clearInterval(this.timer);
            }
        },1000)

        //获取短信验证码
          apigetcode(this.form.imgcode,this.form.phone).then(res=>{
              window.console.log(res);
          }).catch(err=>{
            window.console.log(err);
          });          
          // axios({
          //   url:process.env.VUE_APP_OnlineURL+'/sendsms',
          //   method:'POST',
          //   data:{
          //     code:this.form.imgcode,
          //     phone:this.form.phone,
          //   },
          //   //********携带跨域  特别注意******
          //   withCredentials:true
          // }).then(res=>{
          //     window.console.log(res);
          // }).catch(err=>{
          //   window.console.log(err);
          // })

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