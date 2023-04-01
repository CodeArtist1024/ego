<template>
  <div class="layout">
    <!-- 左侧菜单 -->
    <mymenu class="menu" :collapse="iscollapse" ></mymenu>
    <!--右侧导航 -->
    <mycontent class="content" :collapse="iscollapse" @change="changeCollapse" :class="{active:iscollapse}"></mycontent>
  </div>
</template>

 
<script>
import mycontent from './content.vue'
import mymenu from './menu.vue';

export default {
 
  components: {
    mymenu,
    mycontent
  },
  data() {
    return {
      // 修改之前为false
      iscollapse:false
    }
  },
  methods: {
    changeCollapse(){
      this.iscollapse=!this.iscollapse
    }
  },
  

}


</script>
<style lang="less" scoped>
.layout {
  // display: flex;
  // background-color: #1b3554;

  .menu {
   position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    // width: 200px;
    min-height: 300px;
   background-color: #4a73be;
  }

  .content {
    // flex: 1;
    min-height: 1300px;
    margin-left: 200px;
    // background-color: rgb(42, 175, 175);
    transition:all 0.5s;
  }
  .active{
    margin-left:64px;
  }


}
</style>
