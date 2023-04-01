<template>
    <div>
        <el-tree :props="props" :load="loadNode" lazy accordion @node-click="nodeClick">
        </el-tree>
    </div>
</template>


<script>
import { getCategory } from "@/api";
export default {
    data() {
        return {
            props: {
                label: 'name',
                children: 'zones',
                isLeaf: 'leaf'
            },
        };
    },
    methods: {
        /**
         * 
         * @param {*} node  节点
         * @param {*} resolve 成功返回的数据
         */
        async loadNode(node, resolve) {
            // console.log(node);
            if (node.level === 0) {
                // 加载第0层数据
                // console.log(node);
                // 接口请求函数,处理第0层
                try {
                    const res = await getCategory()
                    // console.log(res);
                    if (res.status==200) {
                        return resolve(res.result);
                    } else {
                        return resolve([])
                    }
                } catch (error) {
                    console.log(error);
                }
                // return resolve([{name:'AAA'},{name:'BBB'}])
            }
            // 加载第一层数据
            if (node.level > 0) {

                try {
                    // 传递的数据是第二层加载的数据
                    const res = await getCategory({ id: node.data.cid })
                    // console.log(res);
                    if (res.status == 200) {
                        return resolve(res.result)
                    } else {
                        // 没有数据，返回一个空数组
                        return resolve([])
                    }
                } catch (error) {
                    console.log(error);
                }


            }

        },
        // 接受点击的node数据
        nodeClick(treeObj){
            // 自定义事件给父组件发送
            this.$emit('sendTreeData',treeObj)
            // console.log(treeObj);
        }
    }
};
</script>
<style lang="less" scoped></style>
