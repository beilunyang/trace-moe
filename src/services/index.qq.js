import { encode } from "js-base64";

/* eslint-disable no-undef */
const init = () => {
  qq.cloud.init({
    env: 'tracemoe-qq-5gh6imzmeed3239d',
    traceUser: true
  });
};

qq.cloud.CDN =
  qq.cloud.CDN ||
  (async data => {
    const { filePath } = data;
    const res = await qq.cloud.uploadFile({
      filePath,
      cloudPath: encode(filePath)
    });
    if (res.fileID) {
      const result = await qq.cloud.getTempFileURL({
        fileList: [
          {
            fileID: res.fileID,
            maxAge: 60 * 5
          }
        ]
      });
      return result?.fileList?.[0]?.tempFileURL;
    }
  });

const search = async ({ url, filePath }) => {
  try {
    const res = await qq.cloud.callFunction({
      name: "search",
      data: {
        url,
        fileName: filePath,
        image:
          filePath &&
          (await qq.cloud.CDN({
            type: "filePath",
            filePath
          }))
      }
    });
    if (res.errMsg === "ok") {
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

    if (res.errMsg === "ok") {
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
