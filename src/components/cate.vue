<template>
    <div class="cate">
     <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>文章管理</el-breadcrumb-item>
  <el-breadcrumb-item>文章分类</el-breadcrumb-item>
</el-breadcrumb>

<!-- 卡片视图区域 -->
<el-card>
  <div slot="header" class="clearfix">
    <span>文章类别管理</span>
  </div>
  <!-- 添加分类区域 -->
     <el-button style="margin-left:-3px;margin-bottom:5px" type="primary" @click="openDialog">添加分类</el-button>
     <el-dialog
  title="添加文章分类"
  :visible.sync="dialogVisible"
  width="35%"
>
  
  <!-- 添加分类的表单区域 -->
  <el-form :model="addForm" :rules="addRules" ref="addRefs" label-width="100px">
  <el-form-item label="分类名称" prop="cateName">
    <el-input v-model="addForm.cateName" placeholder="请输入分类名称"></el-input>
  </el-form-item>
  <el-form-item label="分类别名" prop="cateAlias">
    <el-input v-model="addForm.cateAlias" placeholder="请输入分类别名"></el-input>
  </el-form-item>
  </el-form>
<span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addCate">确 定</el-button>
    <el-button @click="closeAddDialog">取 消</el-button>
  </span>
  
</el-dialog>

<!-- 表格区域 -->

    <el-table
    highlight-current-row
      :data="list.slice((query.pageNum - 1) * query.pageSize, query.pageNum*query.pageSize)"
      style="width: 100%">
      <el-table-column
        prop="Id"
        label="序号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="alias"
        label="分类别名"
        width="300"
        >
      </el-table-column>
       <el-table-column
        prop="date"
        label="操作"
        width="265">
        <template v-slot:default="scope">
<el-button type="primary" icon="el-icon-edit" size="medium" @click="getEditCate(scope.row.Id)">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete-solid" size="medium" @click="deleteCate(scope.row.Id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


<!-- 编辑文章分类的对话框区域 -->
<el-dialog
  title="修改文章分类"
  :visible.sync="editDialogVisible"
  width="35%"
>
<el-form ref="editRefs" :model="editForm" label-width="80px">
  <el-form-item label="分类名称">
    <el-input v-model="editForm.Cname"></el-input>
  </el-form-item>
   <el-form-item label="分类别名">
    <el-input v-model="editForm.Aname"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
  <el-button type="primary" @click="editCate">确 定</el-button> 
   <el-button @click="editDialogVisible = false">取 消</el-button>
  </span>
</el-dialog>


  <!-- 分页区域 -->
 
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
     :current-page="query.pageNum"
      :page-sizes="[2,5,8,10]"
      :page-size="query.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="list.length">
    </el-pagination>
 
</el-card>
    </div>
</template>
<script>
export default {
    created(){
    this.getCateList()
    },
    data(){
        return{
            // 文章分类列表
         cateList:[],
        //  控制添加分类对话框的显示与隐藏
        dialogVisible:false,
        // 添加分类表单对象
        addForm:{
            cateName:'',
            cateAlias:''
        },
        // 添加分类表单的验证规则对象
        addRules:{
        cateName:[
             { required: true, message: "分类名称不能为空", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "分类名称长度应在3到10个字符",
            trigger: "blur",
          },
        ],
        cateAlias:[
             { required: true, message: "分类别名不能为空", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "分类别名长度应在3到10个字符",
            trigger: "blur",
          },
        ]
        },
        // 分页
        query:{
            // 当前每页显示的数据条数
            pageSize:5,
            // 当前页数
            pageNum:1
        },
        // 控制编辑文章分类的对话框的显示与隐藏
        editDialogVisible:false,
        // 编辑文章分类的表单对象
        editForm:{
            id:0,
            Cname:'',
            Aname:''
        }
        }
    },
methods:{
     // 获取文章分类列表
   async getCateList(){
  const {data:res}=await this.$http.get('/my/article/cates')
  if(res.status!=0){return this.$message.error(res.message)}
  // 把分类列表传递给vuex
  this.$store.commit('sendCateList',res.data)
   },
//    添加文章分类
openDialog(){
this.dialogVisible=true
},
// 监听关闭添加分类的对话框事件
closeAddDialog(){
    this.dialogVisible=false
    this.$refs.addRefs.resetFields()
},
// 添加分类
async addCate(){
const {data:res}=await this.$http.post('/my/article/addcates',{
    name:this.addForm.cateName,
    alias:this.addForm.cateAlias
})
if(res.status!=0){return this.$message.error(res.message)}
this.$message.success(res.message)
this.$refs.addRefs.resetFields()
this.dialogVisible=false
// 刷新当前分类列表
this.getCateList()
},
// 监听pagesize发生改变的事件
handleSizeChange(newSize){
    this.query.pageSize=newSize
    this.getCateList()
},
// 监听当前页码发生改变的事件
handleCurrentChange(newNum){
this.query.pageNum=newNum
this.getCateList()
},
// 删除文章分类
async deleteCate(id){
const result=await this.$confirm('此操作将永久删除该文章分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch((err)=>{
            console.log(err);
        })
        // 用户确认返回confirm字符串，取消返回cancel字符串
if(result!=='confirm')return;
const {data:res}=await this.$http.get('/my/article/deletecate/'+id)
if(res.status!=0){return this.$message.error(res.message)}
this.$message.success(res.message)
this.getCateList()
},
// 获取文章分类的相关信息
async getEditCate(id){
    const {data:res}=await this.$http.get('/my/article/cates/'+id)
    if(res.status!=0){return this.$message.error(res.message)}
    this.editForm.Cname=res.data.name
    this.editForm.Aname=res.data.alias
    this.editForm.id=res.data.Id
    this.editDialogVisible=true
},
// 编辑文章的分类的信息
editCate(){
  this.$refs.editRefs.validate(async (valid)=>{
const {data:res}=await this.$http.post('/my/article/updatecate',{
        Id:this.editForm.id,
        name:this.editForm.Cname,
        alias:this.editForm.Aname
    })
    if(res.status!=0){return this.$message.error(res.message)}
    this.$message.success(res.message)
    this.editDialogVisible=false
    this.getCateList()
  })
    
}
},
computed:{
  list(){
return this.$store.state.cateList
  }
}    
}
</script>
<style lang="less" scoped>
.cate{
    .el-card{
        margin-top: 20px;
        .el-pagination{
        margin:20px 0 0 180px
        }
    }
}
</style>