<template>
  <div>
    <el-button type="primary" @click="ViewPDF" round> 显示pdf</el-button>

    <!-- pdf组件 -->
    <ViewPDF ref="pdf"></ViewPDF>
  </div>
</template>


<script>
import ViewPDF from './viewPdf.vue'
  export default {
    components:{
      ViewPDF
    },
  data () {
    return {
    }
  },
  methods: {
    ViewPDF(){
      this.$refs.pdf.dialogVisible=true
    }
  },
}
</script>
<style lang="less" scoped>

</style>
