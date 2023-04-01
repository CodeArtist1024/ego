<template>
    <!-- 开始加入富文本编辑器 -->
    <div id="main">
        <!-- <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p> -->
    </div>
</template>
<script>
import E from 'wangeditor'
export default {
    data() {
        return {
            editor:{}
        }
    },
    mounted() {
        this.editor = new E('#main')
        //自动失去焦点
        this.editor.config.focus=false
        // 回调函数，当输入的内容变化后。触发
        this.editor.config.onchange=(newHtml)=>{
            // console.log('新的数据',newHtml);
            // 自定义事件发送数据
            this.$emit('sendEditor',newHtml)
        }



        this.editor.create()
    },
}
</script>
<style lang="less" scoped></style>
