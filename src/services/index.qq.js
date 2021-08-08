/* eslint-disable no-undef */
const init = () => {
  console.log("cloud.DYNAMIC_CURRENT_ENV:", qq.cloud.DYNAMIC_CURRENT_ENV);
  qq.cloud.init({
    env: qq.cloud.DYNAMIC_CURRENT_ENV,
    traceUser: true
  });
};

const search = async ({ url, filePath }) => {
  try {
    qq.showLoading({
      title: "正在检索"
    });
    // TODO: 这里有问题，qq不支持cloud.CDN
    const res = await qq.cloud.callFunction({
      name: "search",
      data: {
        url,
        fileName: filePath,
        image:
          filePath &&
          qq.cloud.CDN({
            type: "filePath",
            filePath
          })
      }
    });

    if (res.errMsg === "cloud.callFunction:ok") {
      const { result } = res;
      if (result.code === 0) {
        qq.hideLoading();
        return result.data;
      }

      qq.showToast({
        title: result.message || "查询失败",
        icon: "fail"
      });

      return;
    }

    qq.showToast({
      title: "接口调用失败",
      icon: "fail"
    });
  } catch (err) {
    console.error(err);
    qq.showToast({
      title: "接口调用失败",
      icon: "fail"
    });
  }
};

const searchAnilist = async id => {
  try {
    const res = await qq.cloud.callFunction({
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

      qq.showToast({
        title: result.message || "查询失败",
        icon: "fail"
      });

      return;
    }

    qq.showToast({
      title: "接口调用失败",
      icon: "fail"
    });
  } catch (err) {
    qq.showToast({
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
