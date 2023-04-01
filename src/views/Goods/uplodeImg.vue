<template>
    <div>

        <!-- on-success	文件上传成功时的钩子	function(response, file, fileList) -->
        <el-upload
            class="upload-demo"
            ref="upload"
            :action="url"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            :on-success="onSuccess"
            >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
    </div>
</template>
<script>
export default {
    
}
</script>
<script>
import base from '@/api/base.js'
  export default {
    data() {
      return {
        fileList: [],
        // 上传文件路径
        url:base.upload
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    //   文件上传成功时的钩子
      onSuccess(response ,file, fileList){
        
        // 图片上传后的位置    upload\\1679984882241-create-vue3-2.png 
        console.log(response, file, fileList);
        let imgUrl=base.baseUrL+'/'+response.url.slice(7)
        // console.log(imgUrl);
        this.$emit('sendImg',imgUrl)
        // 显示弹窗消息
        this.$message({
          showClose: true,
          message: '恭喜你，上传图片成功',
          type: 'success'
        });

      }
    }
  }
</script>