export default {
  pages: ["pages/home/index", "pages/detail/index", "pages/result/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  supportedMaterials: [
    {
      materialType: "image/*",
      name: "用${nickname}识别番剧名",
      desc: "以图搜番|智能识别图片截图所属动漫番剧名称",
      path: "pages/result/index"
    }
  ]
};
