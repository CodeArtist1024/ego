<template>
  <div class="params">
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>参数管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 搜索框 -->
    <div class="search">
      <!--  @change="toSearch"  change 当文本框的内容改变后触发 -->
      <el-input placeholder="请输入内容" class="text"></el-input>
      <el-button type="primary">搜索</el-button>
      <el-button type="primary" @click="add">弹窗添加</el-button>

    </div>
    <!-- 表格 -->
    <div class="wrapper">
      <template>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="id" label="规格参数ID" width="100">
          </el-table-column>
          <el-table-column prop="itemCatId" label="条目ID" width="80">
          </el-table-column>
          <el-table-column prop="specsName" label="规格名称" width="100">
          </el-table-column>
          <el-table-column prop="paramData" label="规格参数">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>


    <!-- 分页器的使用 -->
    <myPageNation :total="total" :pageSize="pageSize" @changeCurrentPage="getCurrentPge"></myPageNation>


    <!-- 绑定refs属性，修改组件里边的具体属性 -->
    <paramsDialog ref="dialog"></paramsDialog>
  </div>
</template>


<script>
import { params } from '@/api'
import myPageNation from '@/components/myPageNation.vue'
import paramsDialog from './paramsDialog.vue'
export default {
  components: {
    myPageNation,
    paramsDialog
  },
  data() {
    return {
      tableData: [],
      total: 10,
      pageSize: 1,

    }
  },
  created() {
    this.getparams(1)
  },
  methods: {
    add() {
      this.$refs.dialog.dialogVisible=true

    },
    // 实现分页效果
    getCurrentPge(page) {
      // console.log(page);
      // 调用接口请求函数，传递当前的页码
      this.getparams(page)
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 发送网络请求
    async getparams(page) {

      try {
        const res = await params({ page })
        if (res.status == 200) {
          this.total = res.total
          this.pageSize = res.pageSize
        }
        //再界面中显示出来
        this.tableData = res.data
      } catch (error) {
        console.log(error);
      }

    }
  },
}
</script>
<style lang="less" scoped>
.params {
  .title {
    padding-top: 20px;
    margin: 0px 20px;
    background-color: #F4f4f4;
  }

  .search {
    display: flex;
    margin: 20px 10px;

    .text {
      padding-right: 10px;
    }
  }

  .wrapper {
    margin: 10px 10px;
  }
}

.el-form-item {
  // margin-top: 20px;
  margin-bottom: 15px;
}
</style>
