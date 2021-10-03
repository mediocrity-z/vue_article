<template>
  <div class="publish">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>发表文章</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>写文章</span>
      </div>
      <!-- 提示框 -->
              <el-alert
                title="文章封面只允许上传一个jpg文件，并且文件大小不超过5MB"
                type="warning"
                show-icon
                :closable="false"
              >
              </el-alert>
      <el-form ref="pubRefs" :model="pubForm" label-width="80px" :rules="pubRules">
        <!-- 文章标题输入区域 -->
        <el-form-item label="文章标题" class="title" prop="title">
          <el-input
            v-model="pubForm.title"
            placeholder="请输入文章标题"
          ></el-input>
        </el-form-item>

        <el-form-item label="文章分类" prop="cateId">
          <el-select @change="getCateId(list.Id)" v-model="list.Id" placeholder="请选择" class="cate">
            <el-option
              v-for="item in list"
              :key="item.Id"
              :label="item.name"
              :value="item.Id"
            >
            </el-option>
          </el-select>
        </el-form-item>



        <el-form-item label="文章封面" prop="coverUrl">
          <el-upload
            class="upload-demo"
            action="http://api-breakingnews-web.itheima.net"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-exceed="limited"
            :limit="limit"
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
            
          </el-upload>
        </el-form-item>
        
           
        <!-- 富文本编辑器内容 -->
        <el-form-item label="文章内容" prop="content">
          <quill-editor
            v-model="pubForm.content"
            style="height: 260px"
          ></quill-editor>
        </el-form-item>
        <div class="btns">
          <el-button type="primary" @click="publish">发布文章</el-button>
          <el-button type="info" @click="draft">存为草稿</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      // 发表文章的表单对象
      pubForm: {
        title: "",
        cateId: 0,
        content: "",
        coverUrl: "",
        state: "",
      },
      pubRules:{
        title:[
 { required: true, message: "文章标题不能为空", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "文章标题长度应在3到20个字符",
            trigger: "blur",
          }
        ],
       cateId:[
          { required: true, message: "分类选项不能为空", trigger: "blur" },
       ],
       content:[
          { required: true, message: "文章内容不能为空", trigger: "blur" },
          
       ],
       coverUrl:[{ required: true, message: "文章封面不能为空", trigger: "blur" },]
      }
    };
  },
  computed: {
    list() {
      return this.$store.state.cateList;
    },
    limit() {
      // 如果存在图片地址则限制上传
      if (this.pubForm.coverUrl) {
        return 1;
      }
    },
  },
  methods: {
    // 获取上传的图片的地址
    handleAvatarSuccess(res, file) {
      this.pubForm.coverUrl = URL.createObjectURL(file.raw);
    },
    //   对上传的图片作出限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error("上传封面图片只能是 JPG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传封面图片大小不能超过 5MB!");
      }
      return isJPG && isLt5M;
    },
    // 触发文件上限触发的事件
    limited() {
      return this.$message.warning("只允许上传一个图片文件!");
    },
    // 将选择器选中的值传给内存中的id
    getCateId(value){
this.pubForm.cateId=value
    },
    // 将文章发布
    publish(){
        this.$refs.pubRefs.validate(async (valid)=>{
        if(!valid) return;
         var fd = new FormData(this.pubForm);
        fd.append('state','published')
    const {data:res}=await this.$http.post('/my/article/add',fd)
    if(res.status!=0){return this.$message.error(res.message)}
    this.$message.success(res.message)
    // 将表单重置
    this.$refs.pubRefs.resetFields()
        })
    },
    // 将文章保存为草稿
   draft(){
      this.$refs.pubRefs.validate(async (valid)=>{
        if(!valid) return;
         var fd = new FormData(this.pubForm);
        fd.append('state','dfaft')
    const {data:res}=await this.$http.post('/my/article/add',fd)
    if(res.status!=0){return this.$message.error(res.message)}
    this.$message.success(res.message)
        })
       
    }
  },
};
</script>
<style lang="less" scoped>
.publish {
  .el-card {
    margin-top: 20px;
    height: 900px;
     .el-alert{
        margin-top: 5px;
        margin-bottom: 20px;
        width: 700px;
      }
    .el-form {
      .title {
        width: 400px;
      }
      .cate {
        width: 320px;
      }
      .btns{
        margin-top: 150px;
        margin-left: 80px;
      }
     
    }
  }
}
</style>