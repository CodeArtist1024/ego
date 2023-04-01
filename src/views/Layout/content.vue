<template>
  <div class="content">
    <div class="header">
      <!-- 导航推出与缩进按钮 -->
      <!-- 展开   添加点击事件，让祖父组件控制显示与隐藏-->
      <i class="iconfont icon-zhedie2" @click="changeCollapse" v-if="collapse"></i>
      <!-- 缩进 -->
      <i class="iconfont icon-zhedie1" @click="changeCollapse" v-else></i>

      <!-- 头部右侧区域 -->
      <div class="header-right">
        <!--切换语言的下拉列表 -->
        <el-dropdown @command="changeLanguage">
          <span class="el-dropdown-link">
           切换语言
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">外文</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        
        <div class="user">
          <span>
            <!-- 欢迎 &nbsp; -->
            {{$t("title.welcome")}}
             {{ userinfo.username }}
            </span>
          <i class="el-icon-switch-button" @click="exit"></i>
        </div>
      </div>


    </div>

    <!-- 二级路由出口 -->
    <router-view></router-view>
  </div>
</template>


<script>
import { mapState ,mapActions} from 'vuex'
import router from '@/router'
export default {
  props: ['collapse'],
  data() {
    return {

    }
  },
  computed:{
    ...mapState('userModule',['userinfo'])

  },
  methods: {
    // 添加点击事件，让祖父组件控制显示与隐藏
    changeCollapse() {
      this.$emit('change')
    },
    changeLanguage(command){
      this.$i18n.locale=command
    },
    // 退出登录
    exit(){
      this.$store.commit('userModule/delUser')

      // 清除本次存储
      localStorage.removeItem('user')
      
      router.push('/login')
    }
  },
  created() {
  },
}

</script>
<style lang="less" scoped>
.content {

  .header {
    height: 70px;
    background-color: #4a73be;

    .header-right {
      line-height: 70px;
      float: right;
      .el-dropdown{
        i{
          font-size: 20px;
        }
      }
      .user {
        color: #fff;
        font-size: 20px;
        float: right;

        span {
          margin-left: 20px;
        }

        i {
          margin: 0 40px;
          font-size: 20px;
        }
      }
    }

    i {
      font-size: 32px;
      line-height: 70px
    }
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>
