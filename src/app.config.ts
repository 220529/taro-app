export default defineAppConfig({
  pages: ["pages/index/index", "pages/mine/index"],
  subpackages: [
    {
      root: "subpackages",
      pages: ["virtualized/index", "test/index"],
    },
  ],
  preloadRule: {
    "pages/index/index": {
      network: "all",
      packages: ["subpackages"],
    },
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#8a8a8a",
    selectedColor: "#2c2c2c",
    backgroundColor: "#fafafa",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "./assets/tab-bar/home.png",
        selectedIconPath: "./assets/tab-bar/home-active.png",
        text: "首页",
      },
      {
        pagePath: "pages/mine/index",
        iconPath: "./assets/tab-bar/mine.png",
        selectedIconPath: "./assets/tab-bar/mine-active.png",
        text: "我的",
      },
    ],
  },
});
