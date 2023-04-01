<template>
  <div>
    <!-- 外部弹窗 -->
    <el-dialog title="编辑商品参数" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">

      <!-- 树型结构 -->
      <tree @sendTreeData="getTreeDate"></tree>


      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true" :disabled="isdisabled">确 定</el-button>
      </span>

      <!-- 内弹窗 start -->
      <el-dialog width="40%" title="商品规格参数配置" :visible.sync="innerVisible" append-to-body>
        <div>当前选择的节点：{{treeData.name}}</div>
        <el-button type="primary" @click="addDomain">新增域名</el-button>
        <hr />
        <!-- 表单开始 -->
        <!-- [{title:'',value:'',children:[{title:'',value:''}]}] -->
        <el-form :model="dyForm" ref="dynForm" label-width="100px" class="demo-dynamic">
          <el-form-item
            v-for="(domain, index) in dyForm.domains"
            :label="domain.title"
            :key="index"
            :prop="domain.title"
            :rules="{
                required: true, 
                message: '不能为空',
                trigger: 'blur'
                }"
          >
            <!-- 按钮 -->
            <div class="buttons">
              <el-input v-model="domain.title"></el-input>
              <el-button @click.prevent="addChildDomain(index)">添加子项</el-button>
              <el-button @click.prevent="removeDomain(index)">删除</el-button>
            </div>

            <!-- 内层表单项，遍历children -->
            <el-form-item
              v-for="(item, i) in domain.children"
              :label="item.title"
              :key="i"
              :prop="item.title"
            >
              <!-- 按钮 -->
              <div class="buttons">
                <el-input v-model="item.title"></el-input>
                <el-button @click.prevent="removeChildDomain(index,i)">删除子项</el-button>
              </div>
            </el-form-item>
          </el-form-item>
        </el-form>
        <!-- 表单结束 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm">取 消</el-button>
          <el-button type="primary" :disabled="isdisabled" @click="submitForm">确定</el-button>
        </span>
      </el-dialog>

      <!-- 内弹窗 end -->
      <!-- 内弹窗 end -->



    </el-dialog>
  </div>
</template>
<script>
import { addParams } from '@/api'
import tree from '../Goods/tree.vue';
export default {
  components: {
    tree
  },

  data() {
    return {
      dialogVisible: false,
      isdisabled: true, //按钮是否可以点击
      treeData: {},
      innerVisible: false,
      // 动态form的数据
      dyForm: {
        // 内部数据格式
        //[{"value":"","title":"配置","children":[{"value":"","title":"111"}]}]
        domains: [
          {
          title: '',
          value: '',
          // 添加子项
          children: [
            {
            title: '',
            value: '',
          }
        ]
        }, {
          title: '',
          value: '',
          children:[]
        }
        ],

      }
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    //   监听子组件的treedata数据
    getTreeDate(data) {
      console.log(data);
      this.treeData = data
      this.isdisabled = false
    },
    //   动态表单中的方法
    submitForm(formName) {
      this.$refs.dynForm.validate( async (valid) => {
        if (valid) {

        //  发送网络网络请求
          try {
            const res = await addParams({
              itemCatId: this.treeData.cid,
              specsName: this.treeData.name,
              content: JSON.stringify(this.dyForm.domains)
            })
            if(res.status=='200'){
                // 1、友情提醒
                this.$message.success('添加成功！');
                // 2、关闭窗口 外 、内 窗口
                this.innerVisible=false;
                this.dialogVisible=false;
                // 3、刷新列表页面
                this.$parent.getparams(1);
                // 4、清空动态表单
                this.dyForm.domains=[];
            }else{
                 this.$message.error('添加失败！');
            }
            console.log(res);
          } catch (error) {
            console.log(error);
          }
        
        } else {
          console.log('添加类目选择，网络请求失败');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 删除一级
    removeDomain(index) {
      
        this.dyForm.domains.splice(index, 1)
        
    },
    // 删除二级
    // 参数有二 前者 父的下标 后者 子的下标
    removeChildDomain(index,i){
      this.dyForm.domains[index].children.splice(i, 1)
      // this.dyForm.domains[index].children.splice(i, 1);
    },
    // 新增规格参数 一级
    addDomain() {
      this.dyForm.domains.push({
        title:'',
        value: '',
        children:''
      });
    },
    // 新增规格参数 二级
    addChildDomain(index){
      this.dyForm.domains[index].children.push({title:"",value:""})
    }
  }
};
</script>
<style lang="less" scoped>
hr {
  margin: 10px 0;
}
.buttons {
  display: flex;
  input {
    flex: 1;
  }
  button {
    margin-left: 10px;
  }
}
</style>
