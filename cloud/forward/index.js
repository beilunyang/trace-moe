// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event) => {
  const res = await axios(event);
  console.log('[forward response]:', res);
  if (res.status >= 200 && res.status < 400) {
    console.log('[forward response data]:', res.data);
    return res.data;
  }
  return {
    code: 50000,
    message: '服务异常'
  }
}
