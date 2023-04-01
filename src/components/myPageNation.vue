<template>
    <div class="page">

        <!-- layout	组件布局，子组件名用逗号分隔	String	sizes, prev, pager, next, jumper, ->, total, slot	'prev, pager, next, jumper, ->, total' -->
        <el-pagination background layout=" total, prev, pager, next, jumper" :total="total" :pageSize="pageSize"
            @current-change="getcurrentPage">
        </el-pagination>
    </div>
</template>


<script>
export default {
    props: {
        total: {
            type: Number,
            default: 10
        },
        pageSize: {
            type: Number,
            default: 1
        },
        currentPage:{
            type:Number,
            default:1
        }

    },
    data() {
        return {

        }
    },
    methods: {
        getcurrentPage(num) {
            // console.log(num);
            this.$emit('changeCurrentPage', num)
        }
    },
}
</script>
<style lang="less" scoped>
.page {
    text-align: center;
    margin-top: 20px;
}
</style>
