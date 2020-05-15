<template>
  <el-dialog :close-on-click-modal="false" title="用户注册" :visible.sync="dialogFormVisible">
    <!-- 输入框部分 -->
    <el-form :model="form" :rules="rules" ref="form">
      <!-- 头像 -->
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avator">
        <el-upload
          class="avatar-uploader"
          :action="imgUploads"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
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
            <button
              class="img btn"
              @click="getCode"
              :disabled="time!==0"
              style="cursor: pointer"
            >{{time===0 ? '获取用户验证码' : time}}</button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancl" class="btn1">取 消</el-button>
      <el-button type="primary" @click="register" class="btn1">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入axios
// import axios from 'axios'

//导入register
import { apigetcode, apiRegister } from "@/api/register.js";

//导入自己封装的规则
import {checkPhone,checkEmail} from '@/utils/mycheck.js'

// //自定义表单规则  手机号码验证
// let checkPhone = (rules, value, callback) => {
//   let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
//   if (reg.test(value)) {
//     callback();
//   } else {
//     callback(new Error("手机号格式不正确!!"));
//   }
// };
// //自定义表单规则  邮箱验证
// let checkEmail = (rules, value, callback) => {
//   let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
//   if (reg.test(value)) {
//     callback();
//   } else {
//     callback(new Error("邮箱格式不正确!!"));
//   }
// };

export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "67px",

      form: {
        nickname: "",
        email: "",
        phone: "",
        password: "",
        imgcode: "",
        logincode: "",
        avator: ""
      },

      rules: {
        avator: [{ required: true, message: "请选择头像", trigger: "blur" }],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 9, message: "长度在 3 到 9 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        imgcode: [
          { required: true, message: "请输入图形验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ],
        logincode: [
          { required: true, message: "请输入手机验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ]
      },
      //图片验证码的URL
      imgUrl: process.env.VUE_APP_baseURL + "/captcha?type=sendsms&t=" + Date.now(),
      //定时器
      timer: null,
      //倒计时
      time: 0,
      //保存图片上传的地址
      imgUploads: process.env.VUE_APP_baseURL + "/uploads",
      //保存图片预览的url
      imageUrl: ''
    };
  },
  methods: {
    //点击取消按钮后重置表单并且关闭注册页面
    cancl() {
      //表单重置
      this.$refs.form.resetFields();
      //头像重置
      this.imageUrl = null;
      //关闭注册页面
      this.dialogFormVisible = false;
    },

    //确定按钮的注册功能
    register() {
      this.$refs.form.validate(valid => {
        if (valid) {
          //账号注册功能
          apiRegister({
            username: this.form.nickname,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avator,
            password: this.form.password,
            rcode: this.form.logincode
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success("注册成功!!");
              //表单重置
              this.$refs.form.resetFields();
              //头像重置
              this.imageUrl = null;
              //关闭注册页面
              this.dialogFormVisible = false;
            } else {
              this.$message.error(res.data.message);
            }
            // window.console.log(res);
          });
        } else {
          this.$message.error("验证不通过!!");
        }
      });
    },
    //点击切换图片验证码
    imgChange() {
      this.imgUrl =
        process.env.VUE_APP_baseURL + "/captcha?type=sendsms&t=" + Date.now();
    },
    //点击获取手机验证码
    getCode() {
      //判断手机号码是否合法
      let regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!regPhone.test(this.form.phone)) {
        this.$message.error("手机号码不合法!!");
        return;
      }

      //判断验证码是否合法
      if (this.form.imgcode.trim().length !== 4) {
        this.$message.error("验证码不合法!!");
        return;
      }

      //初始化事件
      this.time = 60;
      //设置一个计时器
      this.timer = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          clearInterval(this.timer);
        }
      }, 100);

      //获取短信验证码
      apigetcode(this.form.imgcode, this.form.phone)
        .then(res => {
          this.$message.success("手机验证码为" + res.data.data.captcha);
          // window.console.log(res);
        })
        .catch(err => {
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
    },
    //上传头像成功后的方法
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      //把返回的图片地址保存起来  验证头像不为空
      this.form.avator = res.data.file_path;
      //对表单中的单一属性进行验证
      this.$refs.form.validateField("avator");
    },
    //上传头像之前的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/png/gif 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang='less'>
.el-dialog {
  width: 610px;
  // height: 786px;

  .el-dialog__header {
    padding: 0;
    width: 100%;
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
      .btn1 {
        width: 75px;
        height: 39px;
      }
    }
  }

  //上传头像插件所需要的CSS
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>