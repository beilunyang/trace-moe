/* eslint-disable import/no-commonjs */
// 云函数入口文件
const cloud = require("wx-server-sdk");
const fetch = require("node-fetch");

cloud.init();

// 云函数入口函数
exports.main = async event => {
  const { query } = event;
  const res = await fetch("https://trace.moe/anilist/", {
    method: "POST",
    body: JSON.stringify({
      query
    }),
    headers: { "Content-Type": "application/json" }
  });

  if (res.ok) {
    return {
      code: 0,
      data: (await res.json()).data
    };
  }

  return {
    code: 10001,
    message: "查询番剧信息失败"
  };
};
