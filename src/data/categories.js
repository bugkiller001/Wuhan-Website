const H = [520, 340, 440, 360, 400, 300, 380, 480, 320, 500, 370, 420]

function makeItems(seed, heights) {
  return heights.map((h, i) => ({
    image: `https://picsum.photos/seed/${seed}${i}/800/${Math.round(h * 1.4)}`,
    height: h,
  }))
}

export const categories = [
  {
    id: 'bridge',
    label: '长江大桥',
    desc: '万里长江第一桥，贯通南北的钢铁脊梁',
    items: makeItems('bridge', H),
  },
  {
    id: 'eastlake',
    label: '东湖',
    desc: '中国最大城中湖，碧波万顷的城市绿肺',
    items: makeItems('eastlake', [460, 380, 500, 320, 420, 360, 480, 340, 400, 520, 350, 440]),
  },
  {
    id: 'food',
    label: '美食',
    desc: '汉味小吃第一巷，舌尖上的过早文化',
    items: makeItems('whfood', [340, 460, 380, 500, 320, 420, 360, 480, 400, 520, 350, 440]),
  },
  {
    id: 'lihuangpi',
    label: '黎黄陂路',
    desc: '百年老街的光影，汉口慢时光的缩影',
    items: makeItems('lihuang', [400, 320, 480, 360, 520, 340, 440, 380, 500, 350, 420, 460]),
  },
  {
    id: 'jianghan',
    label: '江汉路',
    desc: '百年商业街，武汉繁华的见证者',
    items: makeItems('jianghan', [480, 360, 420, 500, 340, 460, 380, 520, 350, 400, 440, 320]),
  },
  {
    id: 'huanghelou',
    label: '黄鹤楼',
    desc: '天下江山第一楼，千年诗篇的守望之地',
    items: makeItems('yellowcr', [500, 380, 440, 320, 460, 360, 520, 340, 480, 400, 350, 420]),
  },
  {
    id: 'river',
    label: '长江美景',
    desc: '大江东去，日夜奔流不息的江城画卷',
    items: makeItems('yangtze', [520, 340, 480, 360, 420, 500, 320, 460, 380, 440, 350, 400]),
  },
]

export const defaultCategory = categories[0]
