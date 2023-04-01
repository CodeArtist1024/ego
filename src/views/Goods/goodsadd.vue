<template>
  <div class="goodsadd">
    <!-- 面包屑导航 -->
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/goods/goodsList' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品添加</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 提交数据表单 -->
    <div class="myfrom">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类目选择" prop="category">
          <el-button v-model="ruleForm.category">选择类目
          </el-button>
        </el-form-item>
        
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="ruleForm.num"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="ruleForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <el-button>上传图片</el-button>
        </el-form-item>

        <el-form-item label="商品描述" prop="descs">
          <el-input type="textarea" v-model="ruleForm.descs"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>

        <!-- 点击类目选择，弹出一个框，然后再框里加载具体得类目数据 -->






      </el-form>
    </div>



  </div>
</template>


<script>
import tree from './tree.vue';
  export default {
    data() {
      return {
        ruleForm: {
          category:'',
          title: '',
          price: '',
          num: '',
          sellPoint: '',
          image:'',
          descs:''
        
        },
        rules: {
          title: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' },
          ],
          num: [
            { required: true, message: '请输入商品数量', trigger: 'blur' },
          ],
          
        }
      };
    },
    components:{
      tree
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('商品添加成功');
          } else {
            console.log('商品添加失败');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang="less" scoped>
.goodsadd {
  padding-top: 20px;
  width: 1000px;

  .title {
    margin: 0px 20px;
    background-color: #F4f4f4;
  }
  .myfrom{
    margin-top: 40px;
    background-color: #F4f4f4;
    

  }
}
.el-form-item{
  margin-bottom: 15px;
}
</style>
