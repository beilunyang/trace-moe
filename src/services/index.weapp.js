/* eslint-disable no-undef */
const init = () => {
  console.log("cloud.DYNAMIC_CURRENT_ENV:", wx.cloud.DYNAMIC_CURRENT_ENV);
  wx.cloud.init({
    env: wx.cloud.DYNAMIC_CURRENT_ENV,
    traceUser: true
  });
};

const search = async ({ url, filePath }) => {
  try {
    wx.showLoading({
      title: "正在检索"
    });

    const res = await wx.cloud.callFunction({
      name: "search",
      data: {
        url,
        fileName: filePath,
        image:
          filePath &&
          wx.cloud.CDN({
            type: "filePath",
            filePath
          })
      }
    });

    if (res.errMsg === "cloud.callFunction:ok") {
      const { result } = res;
      if (result.code === 0) {
        wx.hideLoading();
        return result.data;
      }

      wx.showToast({
        title: result.message || "查询失败",
        icon: "fail"
      });

      return;
    }

    wx.showToast({
      title: "接口调用失败",
      icon: "fail"
    });
  } catch (err) {
    wx.showToast({
      title: "接口调用失败",
      icon: "fail"
    });
  }
};

export default {
  init,
  search
};
