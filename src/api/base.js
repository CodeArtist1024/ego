const base= {
    baseUrL:'http://localhost:7766',
    // 商品列表
    goodsList:'/foo/projectList',
    // 搜索商品
    goodsSearch:'/foo/search',
    // 商品类目选择
    category:'/foo/backend/itemCategory/selectItemCategoryByParentId',
    // 上传图片
    upload:'/foo/upload/',
    // 注册表单，添加商品
    addGoods:'/foo/backend/item/insertTbItem',
    // 删除商品
    delGoods:'/foo/backend/item/deleteItemById',
    // 修改商品
    updateGoods:'/foo/backend/item/updateTbItem',
    //登录
    login:'/foo/login',
    // 规格与参数
    params:'/foo/backend/itemParam/selectItemParamAll',
    // 添加规格参数
    addparams:'/foo/backend/itemParam/insertItemParam',
    // 商品类目求情添加到商品添加页面
    categoryData:'/foo/category/data',
    


}


export default base