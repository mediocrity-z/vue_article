<template>
  <div class="pic">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>更换头像</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <div slot="header">
        <span>更换头像</span>
      </div>

      <template>
        <el-alert
          title="点击+号即可上传图片"
          type="success"
          effect="light"
          :closable="false"
          center
        >
        </el-alert>
      </template>

      <div class="upload">
        <el-upload
          action="http://api-breakingnews-web.itheima.net/my/update/avatar"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-image
            fit="cover"
            v-if="imgUrl"
            :src="imgUrl"
            class="avatar"
          ></el-image>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <el-button type="primary" @click="uploadImg">确认更换</el-button>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 头像的base64格式的字符串
      str: "",
      // 头像图片地址
      imgUrl: "",
    };
  },
  methods: {
    // 获取上传的图片的地址
    handleAvatarSuccess(res, file) {
      this.imgUrl = URL.createObjectURL(file.raw);

      function uploadFile(f){
        return new Promise((resolve,reject)=>{
          var fr = new FileReader();
          // 将blob对象转换成base64字符串
          fr.readAsDataURL(f.raw)
          fr.onload=function(){
            resolve(this.result)
          }
        })
      }
      uploadFile(file).then((res)=>{
        // 把base64字符串保存
        this.str=res
      })
   
    },
    //   对上传的图片作出限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isJPG && isLt5M;
    },
    //   上传并更改头像
    async uploadImg() {
      const { data: res } = await this.$http.post(
        "/my/update/avatar",
        this.str
      );
      this.$store.commit('sendImg',this.imgUrl)
    
      if (res.status != 0) {
        return this.$message.error(res.message);
      }
      return this.$message.success(res.message);
    },
  },
};
</script>
<style lang="less" scoped>
.pic {
  .box-card {
    margin-top: 20px;
    .el-alert {
      width: 20%;
    }
    .upload {
      border: 1px solid #ebeeee;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      width: 215px;
      height: 215px;
      margin-top: 20px;
      .avatar {
        width: 215px;
        height: 215px;
        display: block;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 215px;
        height: 215px;
        line-height: 215px;
        text-align: center;
      }
    }

    .el-button {
      margin-top: 20px;
      margin-left: 55px;
    }
  }
}
</style>