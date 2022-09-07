/* eslint-disable import/no-commonjs */
// 云函数入口文件
const cloud = require("wx-server-sdk");
const fetch = require("node-fetch");
const FormData = require("form-data");

cloud.init();

// 云函数入口函数
exports.main = async event => {
  let { url, image, fileName, anilistID } = event;
  const endpoint = `https://api.trace.moe/search?cutBorders&anilistInfo${
    anilistID ? "&anilistID=" + anilistID : ""
  }${url ? "&url=" + encodeURIComponent(url) : ""}`;

  let params = {};

  if (url) {
    params = {
      method: "GET"
    };
  }

  if (image) {
    const result = await fetch(image, {
      method: "GET"
    });

    if (result.ok) {
      const form = new FormData();
      form.append("image", await result.buffer(), { filename: fileName });
      params = {
        method: "POST",
        body: form
      };
    }
  }

  const startTime = Date.now();
  const res = await fetch(endpoint, params);
  const endTime = Date.now();

  const data = await res.json();

  if (res.ok) {
    return {
      code: 0,
      data: {
        ...data,
        time: (endTime - startTime) / 1000
      }
    };
  }

  return {
    code: 10000,
    data,
    message: "服务异常"
  };
};
