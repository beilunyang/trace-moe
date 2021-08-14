/* eslint-disable no-undef */
const init = () => {
  wx.cloud.init({
    env: wx.cloud.DYNAMIC_CURRENT_ENV,
    traceUser: true
  });
};

const search = async ({ url, filePath }) => {
  try {
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

const searchAnilist = async id => {
  try {
    const res = await wx.cloud.callFunction({
      name: "searchAnilist",
      data: {
        query: `{
          Media(id: ${id}, type: ANIME) {
            id
            title {
              native
              romaji
              english
            }
            coverImage {
              large
            }
            genres
            episodes
            averageScore
            startDate {
              day
              month
              year
            }
            endDate {
              day
              month
              year
            }
          }
        }`
      }
    });

    if (res.errMsg === "cloud.callFunction:ok") {
      const { result } = res;
      if (result.code === 0) {
        return result.data.Media;
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
  search,
  searchAnilist
};
