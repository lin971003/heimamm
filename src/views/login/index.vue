<template>
  <div class="login">
    <div class="leftbox">
      <!-- 标题内容 -->
      <div class="title">
        <img src="../../assets/title-logo.png" alt class="titleLogo" />
        <span class="titlename">黑马面面</span>
        <span class="titleicon"></span>
        <span class="titlelogin">用户登录</span>
      </div>
      <!-- 表单内容 -->
      <el-form class="form" ref="form" :model="form" :rules="rules" label-width="0px">
        <!-- 输入框内容 -->
        <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="logincode">
          <!-- 栅格布局 -->
          <el-row>
            <el-col :span="16">
              <el-input prefix-icon="el-icon-key" v-model="form.logincode"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="logincode" src="../../assets/login_captcha.png" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 复选框 -->
        <el-form-item  prop='isCheck'>
          <el-checkbox-group  v-model="form.isCheck"  >
            <el-checkbox name="isCheck">
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
              <el-link type="primary">隐私条款</el-link>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button class="btn" type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="../../assets/login_banner_ele.png" alt class="rightbox" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        //手机号
        phone: "",
        //密码
        password: "",
        //验证码
        logincode: "",
        //是否阅读
        isCheck: [],
      },
      rules: {
        //手机号码验证规则
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度必须为11位数的手机号",
            trigger: "blur"
          }
        ],
        //密码验证规则
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度必须为5~10个字符之间",
            trigger: "blur"
          }
        ],
        //验证码验证规则
        logincode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码必须为4个字符", trigger: "blur" }
        ],
        //是否阅读验证
         isCheck:[
            {type: 'array', required: true, message: '请勾选已阅读', trigger:'change' }
          ],
      }
    };
  },
  methods: {
    //登录按钮验证
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message.success("验证成功!");

          // this.$message({
          //   message: "恭喜你,登录成功",
          //   type: "success"
          // });
        } else {
           this.$message.error('错了哦!!');
          // window.console.log("验证失败!!");
          // return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.login {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  justify-content: space-around;
  // justify-content: space-between;
  // justify-content: space-evenly;
  align-items: center;
  .leftbox {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 48px 42px 86px;
    box-sizing: border-box;
    .title {
      display: flex;
      align-items: center;

      .titleLogo {
        width: 22px;
        height: 17px;
      }
      .titlename {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 16px;
        margin-right: 14px;
      }
      .titleicon {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .titlelogin {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }
    .form {
      margin-top: 29px;

      .el-form-item__content {
        line-height: 20px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }

      .el-input__inner {
        height: 45px;
      }

      .logincode {
        width: 100%;
        height: 45px;
      }

      .btn {
        width: 100%;
        height: 40px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 16px;
      }
    }
  }
  .rightbox {
    width: 633px;
    height: 435px;
  }
}
</style>