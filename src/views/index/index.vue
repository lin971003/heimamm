<template>
  <div class="app">
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <!-- 左边盒子 -->
        <div class="left">
          <i class="el-icon-s-fold" @click="isCollapse=!isCollapse"></i>
          <img src="../../assets/M.png" alt />
          <span>HM面面</span>
        </div>
        <!-- 右边盒子 -->
        <div class="right">
          <img :src="$store.state.imgUrl" alt />
          <span class="font">{{$store.state.username}}</span>
          <el-button type="primary" size="small" @click="exit">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <!-- 左侧边区域 -->
        <el-aside width="auto">
          <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" :router="true">
            <!-- <el-menu-item index="/index/chart" v-if="['管理员','老师'].includes($store.state.role)">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据概览</span>
            </el-menu-item>
            <el-menu-item index="/index/user"  v-if="['管理员','老师'].includes($store.state.role)">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="/index/question"  v-if="['管理员','老师','学生'].includes($store.state.role)">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item index="/index/enterprise"  v-if="['管理员'].includes($store.state.role)">
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item index="/index/subject"  v-if="['管理员'].includes($store.state.role)">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>-->
            <template v-for="(item, index) in child" >
              <el-menu-item :key="index" :index="item.meta.fullPath" v-if="item.meta.roles.includes($store.state.role)">
                <i :class="item.meta.icon"></i>
                <span slot="title">{{item.meta.title}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <!-- 右侧边区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//导入获取用户信息的API  导入用户退出方法
import { apiLogout } from "../../api/index.js";
// 导入操作token的方法
import { removeToken } from "../../utils/myToken.js";
// import store from '../../store/store'

//导入子路由
import child from "../../router/childRoute";

export default {
  data() {
    return {
      child:child,
      // userInfo: "",
      // 保存用户头像URL
      // imgurl: "",
      //侧边栏菜单折叠的功能
      isCollapse: false
    };
  },
  // created() {
  //   //判断token是否为空
  //   // if (!getToken()) {
  //   //   this.$message.error("请先登入");
  //   //   this.$router.push("/login");
  //   //   return;
  //   // }
  //   //一进入页面就获取用户的信息然后渲染到页面上
  //   apiInfo().then(res => {
  //     if (res.data.code === 200) {
  //       this.userInfo = res.data.data;
  //       this.imgurl = process.env.VUE_APP_baseURL + "/" + res.data.data.avatar;
  //       window.console.log("获取首页用户信息:", res);
  //     }else{
  //        this.$message.error(res.data.message);
  //       //  this.$router.push("/login");
  //     }
  //   });
  // },
  methods: {
    //用户退出功能
    exit() {
      this.$confirm("您确定要退出登录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        apiLogout().then(res => {
          if (res.data.code === 200) {
            removeToken();
            this.$message.success("退出成功!!");
            this.$router.push("../login");
          }
        });
      });
    }
  }
};
</script>

<style lang='less'>
* {
  margin: 0;
  padding: 0;
}
#app,
.app,
.el-container {
  height: 100%;
}

.el-header {
  background-color: #fff;
  color: #333;
  box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    i {
      width: 24px;
      height: 20px;
      margin-right: 22px;
    }
    img {
      width: 33px;
      height: 28px;
      margin-right: 11px;
    }
    span {
      font-size: 22px;
      font-family: Microsoft YaHei;
      font-weight: normal;
      color: rgba(73, 161, 255, 1);
    }
  }
  .right {
    display: flex;
    align-items: center;
    img {
      width: 43px;
      height: 43px;
      border-radius: 50%;
      margin-right: 10px;
    }
    span.font {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(99, 99, 99, 1);
    }
    button {
      margin-left: 38px;
    }
  }
}

.el-aside {
  background-color: #fff;
  box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  color: #333;
}

.el-main {
  background: rgba(232, 233, 236, 1);
  color: #333;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>