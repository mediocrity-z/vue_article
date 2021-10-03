<template>
    <div class="list">
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>文章管理</el-breadcrumb-item>
  <el-breadcrumb-item>文章列表</el-breadcrumb-item>
</el-breadcrumb>

<!-- 卡片视图区域 -->
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>文章列表</span>
  </div>
  
  <!-- 搜索功能区域 -->
  <div class="search">
    <el-input v-model="queryInfo.query" clearable @clear="getList" placeholder="请输入内容"></el-input>
  <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
  </div>
  
<!-- 表格区域 -->

    <el-table
    highlight-current-row
      :data="atcList.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum*queryInfo.pagesize)"
      style="width: 100%">
      <el-table-column
        prop="Id"
        label="文章标题"
        width="300">
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="alias"
        label="发表时间"
        width="240"
        >
      </el-table-column>
      
      <el-table-column
        prop="alias"
        label="状态"
        width="150"
        >
      </el-table-column>
      <el-table-column
        prop="alias"
        label="操作"
        width="200"
        >
         <template v-slot:default="scope">
<el-button type="primary" icon="el-icon-edit" size="medium" @click="editAtc(scope.row.Id)">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete-solid" size="medium" @click="deleteAtc(scope.row.Id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑文章内容的对话框 -->
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="50%"> 
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
        </el-form-item> -->



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
        </el-form-item> -->        
      </el-form>
  <span slot="footer" class="dialog-footer">
  <el-button type="primary" @click="dialogVisible = false">确 定</el-button> 
   <el-button @click="dialogVisible = false">取 消</el-button>
  </span>
</el-dialog> 

    <!-- 分页区域 -->
 
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
     :current-page="queryInfo.pagenum"
      :page-sizes="[2,5,8,10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="atcList.length">
    </el-pagination>
</el-card>
    </div>
</template>
<script>
export default {
  created(){
this.getList()
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
    data(){
      return{
        queryInfo:{
          // 搜索输入框的内容
          query:'',
          // 当前的页数
          pagenum:1,
          // 当前每页显示数据条数
          pagesize:3
        },
        // 文章列表数据
        atcList:[],
        // 控制修改文章内容的对话框的显示与隐藏
        dialogVisible:false,
        // 修改文章的表单对象
      pubForm: {
       
      },
// 修改文章的验证规则对象
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
      }
    },
    methods:{
      // 获取文章列表的数据
    async getList(){
      const {data:res}=await this.$http.get(`/my/article/list?pagenum=${this.queryInfo.pagenum}&pagesize=${this.queryInfo.pagesize}`)
      if(res.status!=0){return this.$message.error(res.message)}
      this.atcList=res.data
      },
      // 监听当前页数据条数值的改变事件
      handleSizeChange(newSize){
        this.queryInfo.pagesize=newSize
      },
      // 监听当前页码值的改变事件
      handleCurrentChange(newNum){
        this.queryInfo.pagenum=newNum
      },
      // 根据文章id删除文章
     async deleteAtc(id){
const result=await this.$confirm('此操作将永久删除该文章分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch((err)=>{
            console.log(err);
        })
        // 用户确认返回confirm字符串，取消返回cancel字符串
if(result!=='confirm')return;
const {data:res}=this.$http.get('/my/article/delete/'+id)
if(res.status!=0){return this.$message.error(res.message)}
this.$message.success(res.message)
      },
      // 根据文章id修改文章
     async editAtc(id){
       const {data:res}=await this.$http.get('/my/article/'+id)
       if(res.status!=0){return this.$message.error(res.message)}
       this.pubForm=res.data
      },
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
    }
}
</script>
<style lang="less" scoped>
.list{
    .el-card{
        margin-top: 20px;
        .search{
         
          .el-input{
           width: 370px;
          }
          .el-button{
           margin-left: 10px;
          }
        }
        .el-table{
          margin-top: 10px;
        }
        .el-pagination{
        margin:20px 0 0 280px
        }
    }
}
</style>