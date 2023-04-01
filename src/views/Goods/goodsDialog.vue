<template>
    <div class="goodsdialog">
        <!-- 动态绑定title -->
        <el-dialog :title="title" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
            <!-- 弹出form表单 -->
            <!-- 提交数据表单 -->
            <div class="myfrom">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="类目选择" prop="category">
                        <el-button v-model="ruleForm.category" @click="innerVisible = true">选择类目</el-button>
                        <!--绑定字段  -->
                        {{ ruleForm.category }}
                    </el-form-item>

                    <el-form-item label="商品名称" prop="title">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="price">
                        <el-input v-model="ruleForm.price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" prop="num">
                        <el-input v-model="ruleForm.num"></el-input>
                    </el-form-item>
                    <el-form-item label="商品卖点" prop="sellPoint">
                        <el-input v-model="ruleForm.sellPoint"></el-input>
                    </el-form-item>
                    <el-form-item label="商品图片" prop="image">
                        <el-button @click="innerVisibleImg = true">上传图片</el-button>
                        <!-- 展示上坪图片 -->
                        <!--绑定上传图片  -->
                        <img :src="ruleForm.image" width="100px" style="paddingLeft: 20px;">
                        <!-- {{ ruleForm.category }} -->
                    </el-form-item>

                    <el-form-item label="商品描述" prop="descs">
                        <!-- 使用一个富文本编译器 -->
                        <wangeditor @sendEditor="getEditor" ref="wangeditor"></wangeditor>

                    </el-form-item>

                        <!-- 规格参数  -->
                    <el-form-item label="规格参数" prop="paramsInfo" v-if="isShowParams">   
                       
       <!-- 表单开始 -->
        <!-- [{title:'',value:'',children:[{title:'',value:''}]}] -->
        <el-form ref="dynForm" label-width="100px" class="demo-dynamic">
          <el-form-item
            v-for="(item, index) in paramsInfo"
            :label="item.title"
            :key="index"
            :prop="item.value"
           
          >
            <!-- 按钮 -->
            <div class="buttons">
              <el-input v-model="item.value"></el-input>
            </div>

            <!-- 内层表单项，遍历children -->
            <el-form-item
              v-for="(ele, i) in item.children"
              :label="ele.title"
              :key="i"
              :prop="ele.value"
            >
              <!-- 按钮 -->
              <div class="buttons">
                <el-input v-model="ele.value"></el-input>
              </div>
            </el-form-item>
          </el-form-item>
        </el-form>
        <!-- 表单结束 -->


                    </el-form-item>
                    <!-- 富文本编译器的按钮 -->
                    <!-- <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                        <el-button @click="resetForm('ruleForm')">取消</el-button>
                    </el-form-item> -->
                </el-form>
            </div>
            <!-- 表单的按钮 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>


            <!-- 内层嵌套的dialog  类目选择 -->
            <el-dialog width="50%" title="类目选择" :visible.sync="innerVisible" append-to-body>
                <!-- 树形结构 -->
                <!-- 父组件接收子组件传递过来的node点击数据 -->
                <tree @sendTreeData="getTreeDate"></tree>

                <!--弹窗内的取消 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="innerVisible = false">取 消</el-button>
                    <el-button type="primary" @click="showTreeData">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 内层嵌套的dialog  上传图片 -->
            <el-dialog width="50%" title="图片选择" :visible.sync="innerVisibleImg" append-to-body>

                <!-- 添加图片上传模块 -->
                <uplodeImg @sendImg="getImg"></uplodeImg>

                <!-- 上传图片底部按钮 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="innerVisibleImg = false">取 消</el-button>
                    <el-button type="primary" @click="showImg">确 定</el-button>
                </span>
            </el-dialog>

        </el-dialog>

    </div>
</template>


<script>
import tree from './tree.vue'
import uplodeImg from './uplodeImg.vue'
import wangeditor from '@/components/wangeditor.vue'
// 引入提交接口请求函数  修改接口  展示具体类目
import { addGoods ,updateGoods ,categoryData} from '@/api/index'
export default {
    components: {
        tree,
        uplodeImg,
        wangeditor,
    },
    props: {
        title: {
            type: String,
            default: '商品添加'
        },
        rowdata: {
            typeof: Object,
            default: {}
        }
    },

    data() {
        return {
            dialogVisible: false,
            innerVisible: false,
            innerVisibleImg: false,//上传图片默认是不可见的
            // title:'商品添加',
            // rowdata:{},
            isShowParams:false,
            paramsInfo:[],
            treeData: {},
            imgUrl: '',
            ruleForm: {
                id:'',
                cid:'',
                category: '',
                title: '',
                price: '',
                num: '',
                sellPoint: '',
                image: '',
                descs: '',
                paramsInfo:''
            },
            rules: {
                title: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                    { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '请输入商品价格', trigger: 'blur' },
                ],
                num: [
                    { required: true, message: '请输入商品数量', trigger: 'blur' },
                ],

            }
        };
    },
    // 侦听器对父子传递的rowdata侦听
    watch: {
        rowdata(val) {
            //父组件的数据 接受到子组件中  
            this.ruleForm = this.rowdata
            // 获取富文本编译器的内容 挂载之前已经监听了数据变化，所以要延迟获取DOM
            this.$nextTick(() => {
                this.$refs.wangeditor.editor.txt.html(val.descs)
            })
            // 是否显示后台规格参数
            if(val.paramsInfo){
                this.isShowParams=true
                this.paramsInfo=JSON.parse(val.paramsInfo)
            }
        }
    },
    methods: {

        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                    // this.resetForm()
                })
                .catch(_ => { });
        },
        /**
     * 显示tree数据
     */
        async showTreeData() {
            this.innerVisible = false;
            //显示tree数据
            this.ruleForm.category = this.treeData.name;
            this.ruleForm.cid = this.treeData.cid

            // 请求后端类目接口，请求成功后显示
            
            try {
                const res = await categoryData({cid:this.ruleForm.cid})
                if(res.status==200 && res.result.length>0){
                    // console.log(res);
                    this.isShowParams=true
                    let info  = res.result[res.result.length-1]
                    // console.log(info);
                    this.paramsInfo = JSON.parse(info.paramData)
                    // console.log(this.paramsInfo);
                }
                else{
                    this.isShowParams=false
                }
            } catch (error) {
               console.log(error);
            }
        },
        // < !--父组件接收子组件传递过来的node点击数据 -- >
        getTreeDate(valid) {
            console.log(valid);
            this.treeData = valid
        },
        // 父组件接受子组件接受过来的传递的上传服务器图片地址
        getImg(valid) {
            this.imgUrl = valid
            // console.log(this.imgUrl);
        },
        // 将上传的图片显示出来
        showImg() {
            // 1. 图片显示
            this.ruleForm.image = this.imgUrl
            // 2.关闭内测弹窗
            this.innerVisibleImg = false
        },
        // 父组件接收富文本框数据
        getEditor(val) {
            this.ruleForm.descs = val
            // console.log(this.ruleForm.descs);
        },
        // 提交表单
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    // 合并对象
                    Object.assign(this.ruleForm,{paramsInfo:JSON.stringify(this.paramsInfo)})
                    // console.log(this.ruleForm);
                    // alert('商品添加成功');

                    if (this.title === '商品添加') {
                        try {
                            const res = await addGoods(this.ruleForm)
                            // 商品添加
                            if (res.status == 200) {
                                // 1.提示用户
                                this.$message({
                                    type: 'success',
                                    message: '添加商品成功！'
                                })
                                // 2.关闭页面
                                this.dialogVisible = false
                                // 3. 刷新表单
                                this.$parent.LoadGoodsList(1)
                                // 4. 清空
                                this.resetForm()

                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }else{
                        // 商品编辑
                        console.log('商品编辑');
                        try {
                            const res = await updateGoods(this.ruleForm)
                            if (res.status == 200) {
                                // 1.提示用户
                                this.$message({
                                    type: 'success',
                                    message: '添加修改成功！'
                                })
                                // 2.关闭页面
                                this.dialogVisible = false
                                // 3. 刷新表单
                                this.$parent.LoadGoodsList(1)
                                // 4. 清空
                                this.resetForm()

                            }
                        } catch (error) {
                            this.$message.error('修改数据失败')
                            console.log(error);
                        }
                    }
                } else {
                    console.log('商品添加失败');
                    return false;
                }
            });
        },
        //重置表单 
        resetForm(formName) {
            // 清空富文本框
            this.dialogVisible = false
            // 清空一个方法
            // this.resetForm()
            this.ruleForm = {
                category: '',
                title: '',
                price: '',
                num: '',
                sellPoint: '',
                image: '',
                descs: '',
            }
            this.$refs.wangeditor.editor.txt.clear()
            // 清空规格参数配置
            this.paramsInfo=[]
            this.isShowParams=false
            
        },
    }
};
</script>
<style lang="less" scoped></style>
