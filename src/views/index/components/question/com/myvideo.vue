<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="uploadUrl"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频格式的文件</div>
    </el-upload>
    <div>
        <video style="width:300px; height:150px; " v-if="videoUrl" :src="videoUrl" controls></video>
    </div>
  </div>
</template>

<script>
export default {
   
  data() {
    return {
      uploadUrl: process.env.VUE_APP_OnlineURL + `/question/upload`,
      videoUrl: '',
    };
  },
props:['value'],
  methods: {
           //上传成功之后的回调函数
        handleAvatarSuccess(res, file) {
        this.videoUrl = URL.createObjectURL(file.raw);
        window.console.log(res);
        this.$emit('input' , res.data.url);
      },
      //上传文件之前的回调函数
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'video/mp4';
        const isLt2M = file.size / 1024 / 1024 < 8;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是mp4格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 8MB!');
        }
        return isJPG && isLt2M;
      }
  },
};
</script>

<style>
</style>