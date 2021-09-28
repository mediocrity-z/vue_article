<template>
  <div class="resetp">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>重置密码</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>

      <el-form
        :model="resetPassword"
        :rules="resetRules"
        ref="resetRef"
        label-width="100px"
      >
        <el-form-item label="原密码" prop="origin">
          <el-input
            type="password"
            placeholder="请输入原密码"
            v-model="resetPassword.origin"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            type="password"
            show-password
            placeholder="请输入新密码"
            v-model="resetPassword.newPassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input
            placeholder="请确认新密码"
            show-password
            type="password"
            v-model="resetPassword.confirmPassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitPwd">提交</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data() {
    return {
      // 重置密码的表单对象
      resetPassword: {
        // 原密码
        origin: "",
        //   新密码
        newPassword: "",
        // 确认新密码
        confirmPassword: "",
      },
      // 重置密码的表单验证规则对象
      resetRules: {
        origin: [
          { required: true, message: "原密码不能为空", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "新密码长度应为6-18位的非空字符串",
            trigger: "blur",
          }
        ],
        confirmPassword:[
              { required: true, message: "新密码不能为空", trigger: "blur" },
        ]
      },
    };
  },
  methods:{
    //   重置表单
      reset(){
          this.$refs.resetRef.resetFields()
      },
    //   提交新密码
    async submitPwd(){
   const {data:res}=await this.$http.post('/my/updatepwd',qs.stringify({
       oldPwd:this.resetPassword.origin,
       newPwd:this.resetPassword.newPassword
   }))
   if(res.status!=0){return this.$message.error(res.message)}
   return this.$message.success(res.message)
    }
  }
};
</script>
<style lang="less" scoped>
.resetp {
  .el-card {
    margin-top: 20px;
    .el-form {
      .el-form-item {
        width: 400px;
      }
    }
  }
}
</style>