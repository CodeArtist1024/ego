
// 导出所有的接口请求函数

import req from './req'
import base from './base'

/**
 * 请求商品的列表数据
 * @param {页码} params 
 * @returns 
 */
export const getGoodList =(params)=>req.get(base.goodsList,{params})

/**
 * 定义搜索
 * @param {*} params  {search:xxx}
 * @returns 
 */
export const getSearchList = (params)=>req.get(base.goodsSearch,{params});

/**
 * 
 * @param {*} params 获取类目选择接口
 * @returns 
 */
export const getCategory =(params)=>req.get(base.category,{params})
/**
 * 
 * @param {*} params  添加商品上传参数
 * @returns 
 */
export const addGoods = (params)=>req.get(base.addGoods,{params})

/**
 * 
 * @param {*} params  删除数据接口
 * @returns 
 */
export const delGoods = (params)=>req.get(base.delGoods,{params})

/**
 * 
 * @param {*} params  修改表单信息
 * @returns 
 */
export const updateGoods = (params)=>req.get(base.updateGoods,{params})

/**
 *post 请求的参数的传递：
 1. 直接传对象
 2. 后台设置 拼接字符串
 * 接受的字段：username,password password=123&username=admin
 * @param {*} params 
 * @returns 
 */
export const login = (params) =>{
    // console.log(params);
    // console.log(base.login);
   return req.post(base.login,params)
}

export const params = (params) => req.get(base.params,{params}) 

/**
 * 
 * @param {*} params   添加类目选择
 * @returns 
 */
export const addParams = (params) =>req.get(base.addparams,{params})

/**
 * 
 * @param {*} params  商品类目选择，添加到商品添加页面
 * @returns 
 */
export const categoryData = (params)=>req.get(base.categoryData,{params})

