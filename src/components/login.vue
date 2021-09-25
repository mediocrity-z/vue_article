<template>
  <div id="login">
    <div class="logo">
      <img src="http://www.escook.cn:8086/assets/images/logo.png" alt="" />
    </div>
    <!-- 登录注册区域 -->
    <div class="loginBox">
      <div class="loginTitle">文章发布后台管理系统</div>
      <!-- 登录表单 -->
      <div v-show="showLogin" class="loginInput">
        <el-form ref="loginFormRefs" :model="loginForm" :rules="loginRules">
          <el-form-item prop="username">
            <el-input
              class="username"
              v-model="loginForm.username"
              prefix-icon="el-icon-user-solid"
              placeholder="请输入用户名"
              clearable
              autofocus
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="password"
              v-model="loginForm.password"
              prefix-icon="el-icon-s-tools"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="success" round @click="login">登录</el-button>
            <el-button @click="reset" type="info" round>重置</el-button>
          </el-form-item>
          <a class="zhuce" href="javascript:;" @click="showLogin = false"
            >还没有账号？点击去注册</a
          >
        </el-form>
      </div>
      <!-- 注册表单 -->
      <div class="regist" v-show="!showLogin">
        <el-form
          :rules="registRules"
          ref="registFormRefs"
          :model="registForm"
          label-width="80px"
        >
          <el-form-item prop="registername">
            <el-input
              prefix-icon="el-icon-user-solid"
              placeholder="请输入用户名"
              clearable
              autofocus
              v-model="registForm.registername"
            ></el-input>
          </el-form-item>
          <el-form-item prop="registerpassword">
            <el-input
              prefix-icon="el-icon-s-tools"
              placeholder="请输入密码"
              show-password
              v-model="registForm.registerpassword"
            ></el-input>
          </el-form-item>
          <el-form-item prop="confirmpassword">
            <el-input
              prefix-icon="el-icon-more"
              placeholder="请再次输入密码"
              show-password
              v-model="registForm.confirmpassword"
            ></el-input>
          </el-form-item>
          <el-form-item class="bottom">
            <el-button class="btn" type="primary" round @click="regist"
              >注册</el-button
            >
            <el-button type="info" @click="registReset" round>重置</el-button>
          </el-form-item>
        </el-form>
        <a href="javascript:;" class="option" @click="showLogin = true"
          >注册完毕？去登录</a
        >
      </div>
    </div>
  </div>
</template>
<script>
// 利用qs(axios内置库)将参数转换为query参数
import qs from "qs";
export default {
  data() {
    return {
      // 登录的表单对象
      loginForm: {
        username: "",
        password: "",
      },
      //   控制注册与登录的页面切换
      showLogin: true,
      // 登录表单的验证对象
      loginRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 3,
            max: 6,
            message: "用户名长度应在3到6个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "密码长度应为6-18位的非空字符串",
            trigger: "blur",
          },
        ],
      },
      //    注册表单对象
      registForm: {
        registername: "",
        registerpassword: "",
        confirmpassword: "",
      },
      // 注册表单验证规则对象
      registRules: {
        registername: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 3,
            max: 6,
            message: "用户名长度应在3到6个字符",
            trigger: "blur",
          },
        ],
        registerpassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "密码长度应为6-18位的非空字符串",
            trigger: "blur",
          },
        ],
        confirmpassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "密码长度应为6-18位的非空字符串",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //   重置表单已输入的数据
    reset() {
      this.$refs.loginFormRefs.resetFields();
    },
    //   重置注册表单已输入的数据
    registReset() {
      this.$refs.registFormRefs.resetFields();
    },
    // 注册用户
    regist() {
      this.$refs.registFormRefs.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "/api/reguser",
          qs.stringify({
            username: this.registForm.registername,
            password: this.registForm.registerpassword,
          })
        );
        if (res.status != 0) {
          return this.$message.error(res.message);
        }
        this.$message.success("注册成功!");
        this.$refs.registFormRefs.resetFields()
      });
    },
    // 用户登录
    login() {
      this.$refs.loginFormRefs.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "/api/login",
          qs.stringify(this.loginForm)
        );
        if (res.status != 0) {
          return this.$message.error(res.message);
        }
        this.$message.success("登录成功!");
        console.log(res);
        // 记录token值
        window.sessionStorage.setItem("token", res.token);
        // 路由跳转
        this.$router.push("/home");
      });
    },
  },
};
</script>
<style lang="less" scoped>
#login {
  position: relative;
  .logo {
    margin: 8px;
    padding: 8px;
  }
  .loginBox {
    position: absolute;
    width: 450px;
    height: 300px;
    background-color: rgb(214, 235, 243);
    left: 460px;
    top: 160px;
    border: 1px solid transparent;
    box-sizing: border-box;
    border-radius: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .loginTitle {
      flex: 1;
      font-size: 20px;
      margin-top: 10px;
      color: rgb(53, 165, 187);
    }
    .loginInput {
      width: 400px;
      flex: 4;
      display: flex;
      justify-content: center;
      .btns {
        display: flex;
        justify-content: center;
        transform: translateX(-5%);
      }
      .zhuce {
        color: gray;
        text-decoration: none;
        margin-left: 20px;
      }
      .zhuce:hover {
        color: rgb(5, 179, 170);
      }
    }
    .regist {
      margin-left: -80px;
      width: 300px;
      margin-top: 8px;
      position: relative;
      .bottom {
        display: flex;
        width: 100%;
        justify-content: center;
      }
      .option {
        position: absolute;
        right: -110px;
        text-decoration: none;
        color: gray;
        bottom: 6px;
      }
      .option:hover {
        color: rgb(5, 179, 170);
      }
    }
  }
}
</style>