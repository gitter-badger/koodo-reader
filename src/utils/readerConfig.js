class readerConfig {
  // 获取默认的配置
  static getDefaultConfigObj() {
    return {
      theme: "rgba(255,254,252,1)",
      fontFamily: "Source Han Sans CN",
      fontWeight: 300,
      fontSize: 17, // 0 代表使用默认值
      lineHeight: 1.25, // 0 代表使用默认值
      column: 2, // 可取值为1, 2
      padding: 50, // 阅读区域与浏览器可视区域上下的间距
      disablePopup: false,
      progress: 0
    };
  }

  // 获取config对象
  static get() {
    let json = localStorage.getItem("config");

    return JSON.parse(json) || readerConfig.getDefaultConfigObj(); //若localstorage中不存在数据，就赋予默认值
  }

  // 更新config
  static set(key, value) {
    let json = localStorage.getItem("config"); //获取json格式的数据
    let config = JSON.parse(json) || readerConfig.getDefaultConfigObj(); //将json数据转换为对象
    config[key] = value;
    localStorage.setItem("config", JSON.stringify(config));
  }

  // 重置Config
  static resetConfig() {
    let json = JSON.stringify(readerConfig.getDefaultConfigObj()); //对象转json
    localStorage.setItem("config", json);
  }

  // 获取为文档默认应用的css样式
  static getDefaultCss() {
    let config = readerConfig.get();
    let colors = config.colors;

    let css1 = `::selection{background:#f3a6a68c}::-moz-selection{background:#f3a6a68c}[class*=color-]:hover{cursor:pointer;background-image:linear-gradient(0,rgba(0,0,0,.075),rgba(0,0,0,.075))}`;
    // console.log(config, "config");
    let css2 = [
      "a, article, cite, code, div, li, p, pre, span, table {",
      `    font-size: ${config.fontSize + "px"} !important;`,
      `    line-height: ${config.lineHeight} !important;`,
      `    letter-spacing: ${config.letterSpacing + "px"} !important;`,
      `    font-family: "${config.fontFamily}" !important;`,
      "}",
      "img {",
      "    max-width: 100% !important;",
      "}"
    ];
    // let css3 = [`padding:${config.padding} !important;`];

    return css1 + css2.join("\n");
  }
}
export const themeList = [
  { id: 1, theme: "rgba(235,255,231,1)" },
  { id: 2, theme: "rgba(75,75,75,1)" },
  { id: 3, theme: "rgba(242,219,187,1)" },
  { id: 4, theme: "rgba(255,254,252,1)" }
];
export const fontSizeList = [
  { id: 1, size: "小", num: 15 },
  { id: 2, size: "中", num: 17 },
  { id: 3, size: "大", num: 20 },
  { id: 4, size: "特大", num: 23 },
  { id: 5, size: "超大", num: 26 }
];
export const dropdownList = [
  {
    id: 1,
    title: "字体",
    value: "fontFamily",

    option: [
      { id: 1, name: "默认(思源黑体)", value: "Source Han Sans CN" },
      { id: 2, name: "思源宋体", value: "Source Han Serif CN" },
      { id: 3, name: "思源黑体", value: "Source Han Sans CN" },
      { id: 4, name: "微软雅黑", value: "Microsoft Yahei" },
      { id: 5, name: "黑体", value: "SimHei" },
      { id: 6, name: "Aril", value: "Aril" }
    ]
  },
  {
    id: 2,
    title: "行间距",
    value: "lineHeight",

    option: [
      { id: 1, name: "默认(1.25倍)", value: 1.25 },
      { id: 2, name: "1倍", value: 1 },
      {
        id: 3,
        name: "1.25倍",
        value: 1.25
      },
      { id: 4, name: "1.5倍", value: 1.5 },
      {
        id: 5,
        name: "1.75倍",
        value: 1.75
      },
      { id: 6, name: "2倍", value: 2 }
    ]
  },
  {
    id: 3,
    title: "页边距",
    value: "padding",

    option: [
      { id: 1, name: "默认(中等)", value: 50 },
      { id: 2, name: "超窄", value: 10 },
      { id: 3, name: "窄", value: 30 },
      { id: 4, name: "中等", value: 50 },
      { id: 5, name: "宽", value: 70 },
      { id: 6, name: "超宽", value: 90 }
    ]
  }
];
export default readerConfig;
