<template>
  <div id="home">
    <el-container>
      <!-- 首部区域 -->
      <el-header>
        <div class="logo">
          <img src="http://www.escook.cn:8086/assets/images/logo.png" alt="" />
        </div>
        <div class="loginout">
          <el-button @click="loginout" type="info" icon="el-icon-switch-button"
            >退出</el-button
          >
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <div class="wel">
            <el-avatar v-if="img" :src="img"></el-avatar>
            <el-avatar v-else icon="el-icon-user-solid"></el-avatar>
            <div class="name">欢迎您,{{resetname}}</div>
          </div>
          <el-menu
            text-color="#fff"
            background-color="#333744"
            active-text-color="#409EFF"
            unique-opened
            router
            :default-active="activePath"
          >
            <!-- 第一个一级菜单区域 -->
            <el-menu-item :index="path[0]" @click="saveNav(path[0])">
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
              <el-menu-item :index="path[1]" @click="saveNav(path[1])">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>文章分类</span>
                </template>
              </el-menu-item>
              <el-menu-item :index="path[2]" @click="saveNav(path[2])"
                ><template slot="title">
                  <i class="el-icon-reading"></i>
                  <span>文章列表</span>
                </template></el-menu-item
              >
              <el-menu-item :index="path[3]" @click="saveNav(path[3])"
                ><template slot="title">
                  <i class="el-icon-edit-outline"></i>
                  <span>发表文章</span>
                </template></el-menu-item
              >
            </el-submenu>

            <!-- 第三个一级菜单区域 -->
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>个人中心</span>
              </template>
              <el-menu-item :index="path[4]" @click="saveNav(path[4])"
                ><template slot="title">
                  <i class="el-icon-s-cooperation"></i>
                  <span>基本资料</span>
                </template></el-menu-item
              >
              <el-menu-item :index="path[5]" @click="saveNav(path[5])"
                ><template slot="title">
                  <i class="el-icon-picture"></i>
                  <span>更换头像</span>
                </template></el-menu-item
              >
              <el-menu-item :index="path[6]" @click="saveNav(path[6])"
                ><template slot="title">
                  <i class="el-icon-edit"></i>
                  <span>重置密码</span>
                </template></el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
created() {
    // 获取用户信息
      this.getInfo();
      // 获取本地存储的已激活的菜单选项
      this.activePath=window.sessionStorage.getItem('activePath')
  },
  data() {
    return { 
      // 当前激活的菜单
      activePath:null,
      // 菜单选项的路径数组
      path:[
        '/page',"/cate",'/list',"/publish","/basic","/pic",
"/resetp"
      ]
    };
  },
  methods: {
    //    获取用户的基本信息
    async getInfo() {
      const { data: res } = await this.$http.get("/my/userinfo");
      if (res.status != 0) {
        return this.$message.error(res.message);
      }
      // 把用户数据传递给vuex
      this.$store.commit('sendUser',res.data)
    },
    
    //    退出功能
    loginout() {
      this.$confirm("此操作将会退出登录，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
        center: true,
      }).then(() => {
        this.$message.success("退出登录成功!");
        this.$router.push("/login");
        window.sessionStorage.removeItem("token");
      }).catch(()=>{
        return 
      });
      window.sessionStorage.removeItem('activePath')
    },
    // 菜单的点击事件，把激活的菜单选项保存在本地
    saveNav(i){
      window.sessionStorage.setItem('activePath',i)
    }
  },
  computed:{
    resetname(){
        if(this.$store.state.user.nickname==""){
            return this.$store.state.user.username
          }
      else{
return this.$store.state.user.nickname
        }
    },
    img(){
    return this.$store.state.imgUrl
    }
  }
};
</script>
<style lang="less" scoped>
#home {
  .el-container {
    .el-header {
      background-color: black;
      display: flex;
      .logo {
        flex: 13;
      }
      .loginout {
        flex: 1;
        margin-top: 10px;
      }
    }
    .el-container {
      .el-aside {
        background-color: rgba(16, 15, 29, 0.795);
        color: white;
        height: 597px;
        .wel {
          display: flex;
          justify-content: space-evenly;
          margin-top: 10px;
          margin-bottom: 10px;
          .name {
            margin-top: 10px;
            font-size: 15px;
          }
        }
        .el-menu {
          border-right: none;
        }
      }
      .el-main {
        background-color: rgb(231, 227, 227);
        height: 597px;
      }
    }
  }
}
</style>