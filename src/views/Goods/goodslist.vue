<template>
  <div class="goodlist">
    <!-- 搜索框 -->
    <div class="search">
      <!--  @change="toSearch"  change 当文本框的内容改变后触发 -->
      <el-input v-model="keywords" placeholder="请输入内容" class="text" @change="toSearch"></el-input>
      <el-button type="primary">搜索</el-button>
      <el-button type="primary" @click="toAdd">商品添加</el-button>
      <el-button type="primary" @click="toDialog">弹窗添加</el-button>

    </div>
    <!-- 表格 -->
    <div class="wrapper">
      <template>
        <el-table :data="tableData" style="width: 100%" border stripe>
          <!-- show-overflow-tooltip	当内容过长被隐藏时显示 tooltip -->
          <!-- el-table-column  复选框 -->
          <!-- prop  对应的数据库中的子字段名字，接受好数据之后，可以直接绑定 -->
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="id" label="商品ID" width="80">
          </el-table-column>
          <el-table-column prop="title" label="商品名称" width="80" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="price" label="商品价格" width="80">
          </el-table-column>
          <el-table-column prop="num" label="商品数量" width="80">
          </el-table-column>
          <el-table-column prop="category" label="商品类目" width="100">
          </el-table-column>
          <el-table-column prop="/" label="商品图片" width="100">
          </el-table-column>
          <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="name" label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </template>
    </div>

    <!-- 分页器 -->
    <myPageNation :pageSize="pageSize" :total="total" @changeCurrentPage="getPageNum" :currentPage='currentPage'>
    </myPageNation>


    <!-- 弹窗添加数据 -->
    <goodsDialog ref="dialog" :title="title" :rowdata="rowdata"></goodsDialog>


  </div>
</template>


<script>
// 引入goodslist接口数据
import { getGoodList, getSearchList, delGoods } from "../../api/index";
// 导入分页器
import myPageNation from "../../components/myPageNation";
import goodsDialog from "./goodsDialog.vue";

export default {
  components: {
    myPageNation,
    goodsDialog
  },
  data() {
    return {
      keywords: '',
      tableData: [],
      total: 100, //数据总条目数
      pageSize: 1, //数据每一页显示多少条
      searchList: [],// 搜索到的所有数据列表
      type: 1,//搜素到的数据和全部数据的标记 1 全部的数据  2 搜索到的数据
      dialogVisible: false,
      currentPage: 1,//选中的高亮页码
      // keyWords:'',
      title:'商品添加',//弹窗标题，默认
      rowdata:{},  // 给goodDialog 传递数据，将数据渲染到商品编辑弹窗


    }
  },
  methods: {
    /**
     * 
     * @param {传递页码} num 
     */
    // 加载数数据列表
    LoadGoodsList(num) {
      // promise 的形式 接受Api 中的数据
      getGoodList({ page: num }).then(res => {
        // console.log(res);
        if (res.status == 200) {
          this.tableData = res.data
          this.total = res.total
          this.pageSize = res.pageSize
        }
        else {
          console.log('goodlist 数据获取失败');
        }

      }).catch(err => {
        console.log(err);
      })
    },
    // 父组件的拿到传递的页码 同时处理搜多到的页码
    getPageNum(num) {
      // 搜素到的数数据显示高亮也
      this.currentPage = num
      // console.log('父组件'+num);
      if (this.type == 1) {
        this.LoadGoodsList(num)

      } else {
        this.tableData = this.searchList.slice((num - 1) * 3, num * 3)
      }
    },

    // 查询搜索 两种方式实现，

    // 实习方式1
    //  toSearch(val){
    //    console.log(val);
    //    getSearchList({search:val}).then(res=>{
    //      console.log(res);
    //    }).catch(err=>{
    //      console.log(err);
    //    })
    //  },

    // 实现方式2
    //change事件的搜索，失去焦点或者回车的时候触发
    // async  await 的形式处理接受到的数据
    async toSearch(val) {
      // 让第一页显示高亮
      this.currentPage = 1

      if (!this.keywords) {

        this.LoadGoodsList(1)
        this.type = 1
        return
      }
      try {
        console.log(this.keywords);

        const res = await getSearchList({ search: this.keywords })
        console.log(res.result);
        // 处理分页
        if (res.status == 200 && res.result.length > 0) {
          this.tableData = res.result
          this.searchList = res.result
          // 处理第一页,定义一页显示3条数据
          this.total = res.result.length
          this.pageSize = 3
          this.tableData = this.searchList.slice(0, 3)
          // 剩下的数据显示下一页
          this.type = 2
          console.log(this.currentPage);


        } else {
          // 没有查询到数据
          this.tableData = [];
          this.total = 1;
          this.pageSize = 1;
          this.type = 1;
        }
      } catch (error) {
        console.log(error);
      }
    },

    // 去添加数据
    toAdd() {
      this.$router.push('/goods/goodsAdd')
    },
// 编辑按钮 操作有二
    // 1. 显示弹窗 2.弹窗加载当行的数据
    handleEdit(index, row) {
      console.log(index, row);
      this.$refs.dialog.dialogVisible=true
      // 跟换弹窗的标题，，默认商品添加
      this.title='商品编辑'
      // 方式1.ref 将数据渲染到弹窗上
      // this.$refs.dialog.ruleForm=row
      // 方式2 ，porps 组件传值 过去之后接受，存在一个生命周期的执行顺序问题
      // 展开运算符，解决指向的同一个地址问题
      this.rowdata={...row}
      
    },
    // 删除按钮
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 删除接口
        try {
          const res = await delGoods({ id: row.id })
          // console.log(res);
          // 删除完数据，刷新页面 给出用户提醒
          this.$message({
            type: 'success',
            message: '数据库已成功移除该数据'
          })
          this.LoadGoodsList(1)
        } catch (error) {
          console.log(error);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    toDialog() {
      this.$refs.dialog.dialogVisible = true
      // console.log(this.$refs.dialog);
    }


  },
  created() {
    // 调用商品函数
    this.LoadGoodsList(1)
  },
}
</script>
<style lang="less" scoped>
.goodlist {
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
</style>
