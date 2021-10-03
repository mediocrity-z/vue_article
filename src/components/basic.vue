<template>
    <div class="basic">
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>个人中心</el-breadcrumb-item>
  <el-breadcrumb-item>基本资料</el-breadcrumb-item>
</el-breadcrumb>

<el-card class="box-card">
  <div slot="header">
    <span>修改用户信息</span>
  </div>
  
  <!-- 表单区域 -->
<el-form :model="editForm" ref="editRef" label-width="100px" :rules="editRules">
  <el-form-item label="用户名" >
    <el-input clearable disabled v-model="$store.state.user.username"></el-input>
  </el-form-item>
  <el-form-item label="用户昵称" prop="nickname">
    <el-input clearable placeholder="在此处设置您的昵称" v-model="editForm.nickname"></el-input>
  </el-form-item>
  <el-form-item label="用户邮箱" prop="email">
    <el-input clearable placeholder="在此处设置您的邮箱地址" v-model="editForm.email"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="editInfo">提交</el-button>
    <el-button type="info" @click="reset">重置</el-button>
  </el-form-item>
</el-form>
</el-card>

    </div>
</template>
<script>
export default {
    created(){
    
    },
    data(){
        return {
          // 编辑表单对象
          editForm:{
             nickname:'',
            email:'',
          },
           
    // 表单验证规则
     editRules:{
         nickname:[
             { required: true, message: "用户昵称不能为空", trigger: "blur" },
          {
            min: 3,
            max: 6,
            message: "昵称长度应在3到6个字符",
            trigger: "blur",
          }
         ],
         email:[
              { required: true, message: "用户邮箱不能为空", trigger: "blur" },
         ]
     }
        }
    },
    methods:{
      // 修改表单的重置功能
        reset(){
            this.$refs.editRef.resetFields()
        },
        // 修改用户信息
    editInfo(){
         this.$refs.editRef.validate(async (valid)=>{
           if(!valid)return 
           const {data:res}=await this.$http.post('/my/userinfo',{
                id:this.$store.state.user.id,
                nickname:this.editForm.nickname,
                email:this.editForm.email
        })
        if(res.status!=0){return this.$message.error(res.message)}
        // 重新获取用户信息的数据以更新主页视图
      const {data:update}=await this.$http.get('/my/userinfo')
      // 将更新后的用户数据传给vuex
       this.$store.commit('updateUser',update.data)
        this.$message.success(res.message)
         })
        }
    }
}
</script>
<style lang="less" scoped>
.basic{
    .box-card{
  margin-top: 20px;
  .el-input{
      width: 300px;
  }
    }
}
</style>