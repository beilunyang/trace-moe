/* eslint-disable import/no-commonjs */
const cloud = require("qq-server-sdk");
const fetch = require("node-fetch");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

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
