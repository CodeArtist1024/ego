<template>
    <div>
        <h2>登录</h2>
        
        <button @click="toLogin">登录</button>
    </div>
</template>


<script>

export default {
    data() {
        return {
        }
    },
    methods: {
        // 触发接口函数中的acton
        // 接受的字段：  username,password
        toLogin(){
            this.$store.dispatch('userModule/toLogin',{username:'admin',password:'123'})
        }
    },
    created() {
    },
    mounted() {
    },
}


</script>
<style lang="scss" scoped></style>
