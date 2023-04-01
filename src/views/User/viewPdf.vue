<template>
    <div>
        <!-- 显示PDF文件弹窗 -->
        <el-dialog
            title="pdf文件"
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="handleClose">

            <!-- 具体的pdf文件 -->
            <span>这是一段信息</span>
            <!-- <pdf src="../../../public/前端工程师面试题手册.pdf"> </pdf> -->


            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
            </el-dialog>
    </div>
</template>
<script>
// import pdf from 'vue-pdf'
  export default {
    components:{
        // pdf
    },
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>
<style lang="less" scoped>

</style>
