export const backgroundColors = [
  { id: 1, theme: "rgba(235,255,231,1)" },
  { id: 2, theme: "rgba(75,75,75,1)" },
  { id: 3, theme: "rgba(242,219,187,1)" },
  { id: 4, theme: "rgba(255,254,252,1)" }
];
export const fontSizeDescription = [
  { id: 1, size: "小", num: 15 },
  { id: 2, size: "中", num: 17 },
  { id: 3, size: "大", num: 20 },
  { id: 4, size: "特大", num: 23 },
  { id: 5, size: "超大", num: 26 }
];
export const paragraphCharacterConfig = [
  {
    id: 1,
    title: "字体",
    defaultId: 3,

    option: [
      { id: 1, name: "楷体" },
      { id: 2, name: "宋体" },
      { id: 3, name: "微软雅黑" },
      { id: 4, name: "黑体" },
      { id: 5, name: "思源黑体" }
    ]
  },
  {
    id: 2,
    title: "字体粗细",
    defaultId: 2,

    option: [
      { id: 1, name: "细" },
      { id: 2, name: "中等" },
      { id: 3, name: "粗" }
    ]
  },
  {
    id: 3,
    title: "行间距",
    defaultId: 3,

    option: [
      { id: 1, name: "0倍" },
      { id: 2, name: "0.5倍" },
      { id: 3, name: "1倍" },
      { id: 4, name: "1.5倍" },
      { id: 5, name: "2倍" }
    ]
  },
  {
    id: 4,
    title: "页边距",
    defaultId: 3,

    option: [
      { id: 1, name: "超窄" },
      { id: 2, name: "窄" },
      { id: 3, name: "中等" },
      { id: 4, name: "宽" },
      { id: 5, name: "超宽" }
    ]
  },
  {
    id: 5,
    title: "字间距",
    defaultId: 2,
    option: [
      { id: 1, name: "窄" },
      { id: 2, name: "中等" },
      { id: 3, name: "宽" }
    ]
  }
];
