import Mock from "mockjs";

// 自定义随机颜色生成函数
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

const fetchData = (num = 1000) => {
  return new Promise((resolve, reject) => {
    const items = [];
    for (let i = 0; i < num; i++) {
      items.push({
        id: i + 1, // 自增 ID
        title: Mock.mock("@ctitle(2, 7)"), // 随机生成 3 到 5 字的中文标题
        subTitle: Mock.mock("@ctitle(8, 13)"), // 随机生成 5 到 8 字的中文标题
        description: Mock.mock("@ctitle(15, 16)"), // 随机生成 5 到 8 字的中文标题
        // description: Mock.mock("@cparagraph(1, 1)"), // 随机生成 1 到 3 段中文文字
        image: getRandomColor(), // 生成唯一的随机图片
        color: getRandomColor(), // 生成唯一的随机颜色
        color2: getRandomColor(), // 生成唯一的随机颜色
        price: (Math.random() * 1000).toFixed(2), // 随机生成 1-1000 的价格，保留两位小数
        date: Mock.mock('@date("yyyy-MM-dd")'), // 随机日期
        address: Mock.mock("@county(true)"), // 随机中国地址
      });
    }
    resolve(items);
  });
};
export { fetchData };
