// 云函数入口文件
const CloudBase = require("@cloudbase/manager-node");
const { storage } = CloudBase.init({
  envId: process.env.ENV_ID
});

// 云函数入口函数
exports.main = async (event, context) => {
  await storage.deleteDirectory("/");
  return "ok!";
};
