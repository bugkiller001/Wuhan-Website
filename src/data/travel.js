function spotImage(day, idx) {
  const ext = (day === 3 || idx !== 3) ? 'png' : 'jpg'
  return `/images/view/day${day}/${idx}.${ext}`
}

export const days = [
  {
    id: 'day1',
    label: 'DAY 1',
    title: '汉口老城漫游',
    color: '#E8815C',
    bgColor: '#FDF4ED',
    spots: [
      {
        id: 'gude',
        name: '古德寺',
        image: spotImage(1, 1),
        desc: '混合欧亚风格的百年佛寺，独特的建筑美学吸引无数年轻人打卡拍照。',
        mapUrl: 'https://uri.amap.com/navigation?to=%E5%8F%A4%E5%BE%B7%E5%AF%BA,%E6%AD%A6%E6%B1%89%E5%B8%82',
      },
      {
        id: 'lihuang',
        name: '黎黄陂路',
        image: spotImage(1, 2),
        desc: '汉口最美老街，咖啡馆与老建筑交织，每一步都是文艺慢时光。',
        mapUrl: 'https://uri.amap.com/navigation?to=%E9%BB%8E%E9%BB%84%E9%99%82%E8%B7%AF,%E6%AD%A6%E6%B1%89%E5%B8%82',
      },
      {
        id: 'jianghan',
        name: '江汉路步行街',
        image: spotImage(1, 3),
        desc: '百年商业老街，从民国建筑到现代商场的时空穿越之旅。',
        mapUrl: 'https://uri.amap.com/navigation?to=%E6%B1%9F%E6%B1%89%E8%B7%AF%E6%AD%A5%E8%A1%8C%E8%A1%97,%E6%AD%A6%E6%B1%89%E5%B8%82',
      },
      {
        id: 'jiangguan',
        name: '江汉关博物馆',
        image: spotImage(1, 4),
        desc: '百年钟楼诉说汉口开埠风云，登顶俯瞰两江交汇的壮丽景色。',
        mapUrl: 'https://uri.amap.com/navigation?to=%E6%B1%9F%E6%B1%89%E5%85%B3%E5%8D%9A%E7%89%A9%E9%A6%86,%E6%AD%A6%E6%B1%89%E5%B8%82',
      },
      {
        id: 'jiangtan',
        name: '汉口江滩',
        image: spotImage(1, 5),
        desc: '十里江滩连绵，夕阳下芦苇摇曳，是武汉人最爱的城市后花园。',
        mapUrl: 'https://uri.amap.com/navigation?to=%E6%B1%89%E5%8F%A3%E6%B1%9F%E6%BB%A9,%E6%AD%A6%E6%B1%89%E5%B8%82',
      },
    ],
  },
  {
    id: 'day2',
    label: 'DAY 2',
    title: '武昌人文之旅',
    color: '#6BA587',
    bgColor: '#EEF5F1',
    spots: [
      {
        id: 'bowuguan',
        name: '湖北省博物馆',
        image: spotImage(2, 1),
        desc: '曾侯乙编钟在此回响千年，越王勾践剑锋芒依旧震撼人心。',
        mapUrl: 'https://uri.amap.com/navigation?to=%E6%B9%96%E5%8C%97%E7%9C%81%E5%8D%9A%E7%89%A9%E9%A6%86,%E6%AD%A6%E6%B1%89%E5%B8%82',
      },
      {
        id: 'meishuguan',
        name: '湖北省美术馆',
        image: spotImage(2, 2),
        desc: '现代艺术与荆楚文化的碰撞之地，定期举办国内外大型展览。',
        mapUrl: 'https://uri.amap.com/navigation?to=%E6%B9%96%E5%8C%97%E7%9C%81%E7%BE%8E%E6%9C%AF%E9%A6%86,%E6%AD%A6%E6%B1%89%E5%B8%82',
      },
      {
        id: 'donghu',
        name: '东湖绿道',
        image: spotImage(2, 3),
        desc: '中国最美绿道之一，骑行穿梭于湖光山色之间，微风拂面惬意十足。',
        mapUrl: 'https://uri.amap.com/navigation?to=%E4%B8%9C%E6%B9%96%E7%BB%BF%E9%81%93,%E6%AD%A6%E6%B1%89%E5%B8%82',
      },
      {
        id: 'wuda',
        name: '武汉大学',
        image: spotImage(2, 4),
        desc: '珞珈山下的百年学府，樱花大道如雪纷飞，书香与青春在此定格。',
        mapUrl: 'https://uri.amap.com/navigation?to=%E6%AD%A6%E6%B1%89%E5%A4%A7%E5%AD%A6,%E6%AD%A6%E6%B1%89%E5%B8%82',
      },
      {
        id: 'lingbo',
        name: '凌波门',
        image: spotImage(2, 5),
        desc: '东湖边的最美栈桥，日落时分水面倒映金色余晖，浪漫至极。',
        mapUrl: 'https://uri.amap.com/navigation?to=%E5%87%8C%E6%B3%A2%E9%97%A8,%E6%AD%A6%E6%B1%89%E5%B8%82',
      },
    ],
  },
  {
    id: 'day3',
    label: 'DAY 3',
    title: '地标经典巡礼',
    color: '#5B9ECF',
    bgColor: '#EDF4FA',
    spots: [
      {
        id: 'tanhualin',
        name: '昙华林',
        image: spotImage(3, 1),
        desc: '武昌最文艺的老街区，独立书店与创意小店藏在青石板路两旁。',
        mapUrl: 'https://uri.amap.com/navigation?to=%E6%98%99%E5%8D%8E%E6%9E%97,%E6%AD%A6%E6%B1%89%E5%B8%82',
      },
      {
        id: 'liangdao',
        name: '粮道街',
        image: spotImage(3, 2),
        desc: '武汉最地道的美食街之一，家家排队的苍蝇馆子藏着最正宗的汉味。',
        mapUrl: 'https://uri.amap.com/navigation?to=%E7%B2%AE%E9%81%93%E8%A1%97,%E6%AD%A6%E6%B1%89%E5%B8%82',
      },
      {
        id: 'huanghelou',
        name: '黄鹤楼',
        image: spotImage(3, 3),
        desc: '天下江山第一楼，登楼远眺长江两岸风光尽收眼底，千年诗意在此回荡。',
        mapUrl: 'https://uri.amap.com/navigation?to=%E9%BB%84%E9%B9%A4%E6%A5%BC,%E6%AD%A6%E6%B1%89%E5%B8%82',
      },
      {
        id: 'bridge',
        name: '长江大桥',
        image: spotImage(3, 4),
        desc: '万里长江第一桥，上层公路下层铁路，钢铁巨龙横跨天堑震撼人心。',
        mapUrl: 'https://uri.amap.com/navigation?to=%E6%AD%A6%E6%B1%89%E9%95%BF%E6%B1%9F%E5%A4%A7%E6%A1%A5,%E6%AD%A6%E6%B1%89%E5%B8%82',
      },
      {
        id: 'ferry',
        name: '武汉轮渡',
        image: spotImage(3, 5),
        desc: '1.5元坐一次长江轮渡，江风拂面看两岸灯火，是最浪漫的武汉体验。',
        mapUrl: 'https://uri.amap.com/navigation?to=%E6%AD%A6%E6%B1%89%E8%BD%AE%E6%B8%A1,%E6%AD%A6%E6%B1%89%E5%B8%82',
      },
    ],
  },
]
