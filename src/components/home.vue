<template>
    <div id="home">
<el-container>
    <!-- 首部区域 -->
  <el-header>
      <div class="logo">
           <img src="http://www.escook.cn:8086/assets/images/logo.png" alt="" />
      </div>
      <div class="loginout">
          <el-button @click="loginout" type="info" icon="el-icon-switch-button">退出</el-button>
      </div>
  </el-header>
  <el-container>
    <el-aside width="200px">
        <div class="wel">
          <el-avatar v-if="hasava" :src="user.user_pic"></el-avatar>
                <el-avatar v-else>{{avatitle}}</el-avatar>
          <div class="name">欢迎您,{{user.username}}</div>
        </div>
         <el-menu
         text-color="#fff"
         background-color="#333744"
       active-text-color="#409EFF"
       unique-opened
       router
      >
      <!-- 第一个一级菜单区域 -->
      <el-menu-item index="/page">
        <i class="el-icon-s-home"></i>
        <span slot="title">个人主页</span>
      </el-menu-item>

       <!-- 第二个一级菜单区域 -->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>文章管理</span>
        </template>
        <!-- 二级菜单区域 -->
          <el-menu-item index="2-1">
              <template slot="title">
          <i class="el-icon-menu"></i>
          <span>文章分类</span>
        </template>
              </el-menu-item>
          <el-menu-item index="2-2"><template slot="title">
          <i class="el-icon-reading"></i>
          <span>文章列表</span>
        </template></el-menu-item>
          <el-menu-item index="2-3"><template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span>发表文章</span>
        </template></el-menu-item>
      </el-submenu>
      
      <!-- 第三个一级菜单区域 -->
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>个人中心</span>
        </template>
          <el-menu-item index="3-1"><template slot="title">
          <i class="el-icon-s-cooperation"></i>
          <span>基本资料</span>
        </template></el-menu-item>
          <el-menu-item index="3-2"><template slot="title">
          <i class="el-icon-picture"></i>
          <span>更换头像</span>
        </template></el-menu-item>
          <el-menu-item index="3-3"><template slot="title">
          <i class="el-icon-edit"></i>
          <span>重置密码</span>
        </template></el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
     <el-main><router-view></router-view></el-main>
  </el-container>
</el-container>
    </div>
</template>
<script>
export default {
    created(){
  this.getInfo()
    },
   data(){
       return{
        // 用户的个人信息
        user:{},
        // 控制用户的头像显示
        hasava:false,
        // 代替头像的文本内容
        avatitle:''
       }
   },
   methods:{
    //    获取用户的基本信息
   async getInfo(){
      const {data:res}=await this.$http.get('/my/userinfo')
      if(res.status!=0){return this.$message.error(res.message)}
      this.user=res.data
      if(this.user.user_pic!=null){
          this.hasava=true
      }else{
          this.hasava=false
          this.avatitle=this.user.username.charAt(0)
      }
    },
    //    退出功能
       loginout(){
           this.$confirm('此操作将会退出登录，是否继续？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
          center:true
        }).then(()=>{
           this.$message.success('退出登录成功!')
           this.$router.push('/login')
           window.sessionStorage.removeItem('token')
        })
       }
   }
}
</script>
<style lang="less" scoped>
#home{
    .el-container{
        .el-header{
            background-color: black;
            display: flex;
            .logo{
              flex: 13;
            }
            .loginout{
            flex: 1;
            margin-top: 10px;
            }
        }
        .el-container{
            .el-aside{
                background-color: rgba(16, 15, 29, 0.795);
                color: white;
                height: 597px;
                .wel{
                    display: flex;
                    justify-content: space-evenly;
                    margin-top: 10px;
                    margin-bottom: 10px;
                    .name{
                        margin-top: 10px;
                        font-size: 15px;
                    }
                }
                .el-menu{
                    border-right: none;
                }
            }
            .el-main{
                background-color: rgb(231, 227, 227);
                height: 597px;
            }
        }
    }
}
</style>