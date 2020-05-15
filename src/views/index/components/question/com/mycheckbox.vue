<template>
  <!-- A -->
  <div>
    <el-checkbox :label="label" class="oneradio">
      {{label}}
      <el-input class="ipt" :value='text' @input="v=>$emit('changeIpt2',v)" ></el-input>
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-checkbox>
  </div>
</template>

<script>
export default {
    props:['label','text','image'],
  data() {
    return {
      uploadUrl: process.env.VUE_APP_OnlineURL + `/question/upload`,
      imageUrl:process.env.VUE_APP_OnlineURL+this.image,
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit('changeImg2',res.data.url)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.oneradio {
  margin-bottom: 45px;
  margin-top: 40px;
  display: flex;
  align-items: center;
  .el-checkbox__label {
    display: flex;
    align-items: center;
    .ipt {
      width: 450px;
      margin: 0 20px 0 30px;
    }
  }
}
</style>