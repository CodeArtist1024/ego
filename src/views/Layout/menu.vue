<template>
    <div>
        <!-- 开始自己写道测试组件 -->
        <!-- <ul>
            <li><router-link to="/">首页</router-link></li>
        </ul>
        <ul>
            <li> <router-link to="/goods">商品</router-link></li>
        </ul>
        <ul>
            <li><router-link to="/order">订单</router-link></li>
        </ul>
        <ul>
            <li> <router-link to="/params">参数</router-link></li>
        </ul> -->

        <!-- elementUL 导航组件 -->
        <!--  :collapse="collapse"   动态绑定显示与隐藏 -->
        <!--  :default-active="$route.path"   动态显示导航的高亮 -->
        <el-menu 
        router
        :default-active="$route.path"
        :collapse="collapse"
        class="el-menu-vertical-demo" 
        @open="handleOpen"
        @close="handleClose" 
        background-color="#4a73be" 
        text-color="#fff" 
        active-text-color="#ffd04b">

            <el-menu-item>
                <!-- <span slot="title">易购后台管理系统</span> -->
                <span>{{$t("title.message")}}</span>
                
            </el-menu-item>

            <el-menu-item index="/">
                <i class="el-icon-s-home"></i>
                <!--  -->
                <!-- <span slot="title">首页</span> -->
                <span slot="title">{{$t("menu.home")}}</span>
            </el-menu-item>

            <el-submenu index='/goods'>
                <template slot="title">
                    <i class="el-icon-s-goods"></i>
                    <!-- <span>商品管理</span> -->
                    <span>{{$t("menu.goods")}}</span>
                </template>
                <el-menu-item index="/goods/goodsAdd">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <!-- <span>添加商品</span> -->
                        <span>{{$t("menu.goodsadd")}}</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="/goods/goodsList">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <!-- <span>商品列表</span> -->
                        <span>{{$t("menu.goodslist")}}</span>
                    </template>
                </el-menu-item>
            </el-submenu>

            <el-menu-item index="/params">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <!-- 商品参数 -->
                    <span>{{$t("menu.params")}}</span>
                </template>
            </el-menu-item>


            <el-menu-item index="/order">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <!-- 订单管理 -->
                    <span>{{$t("menu.order")}}</span>
                </template>
            </el-menu-item>

            <!-- 规格与包装 -->
            <!-- <el-submenu index="/params">
                <template slot="title">
                    <i class="eel-icon-document-copy"></i>
                    规格与包装
                </template>
                <el-menu-item index="1-4-1">
                    <template slot="title">
                        <i class="el-icon-s-order"></i>
                        <span>商品规格</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="1-4-1">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>商品包装</span>
                    </template>
                </el-menu-item>
            </el-submenu> -->

            <el-menu-item index="/user">
                <i class="el-icon-user-solid"></i>
                <!-- <span slot="title">用户管理</span> -->
                <span>{{$t("menu.user")}}</span>
            </el-menu-item>

        </el-menu>
    </div>
</template>


<script>
export default {
    // 接受父组件的是否折叠
    props:['collapse'],
    data() {
        return {
            
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    created() {
        // console.log(this);
    },
}
</script>
<style lang="less" scoped>
.el-menu{
    border-right:0px
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    }
</style>
