import { useState, useRef, useEffect } from 'react'
import { days } from '../data/travel'
import './TravelSection.css'

/* 每张卡片的偏移量（营造不规则布局） */
const OFFSETS = [
  { x: 0, y: 0, rot: -0.8 },
  { x: 18, y: -6, rot: 1.2 },
  { x: -12, y: 4, rot: -0.5 },
  { x: 10, y: -2, rot: 1.8 },
  { x: -6, y: 8, rot: -1.5 },
]

function encodeMapUrl(name) {
  const encoded = encodeURIComponent(name + ',武汉市')
  return `https://uri.amap.com/navigation?to=${encoded}`
}

export default function TravelSection() {
  const [selectedImage, setSelectedImage] = useState(null)
  const dayRefs = useRef([])

  return (
    <section className="travel" id="travel">
      <div className="container">
        <h2 className="travel__title">三日漫游指南</h2>
        <p className="travel__sub">用脚步丈量江城，三天玩转武汉精华</p>

        {days.map((day, di) => (
          <div
            key={day.id}
            className="travel-day"
            ref={(el) => (dayRefs.current[di] = el)}
            style={{ '--day-color': day.color, '--day-bg': day.bgColor }}
          >
            {/* 日标题 */}
            <div className="travel-day__head">
              <span className="travel-day__label" style={{ color: day.color }}>
                {day.label}
              </span>
              <h3 className="travel-day__title">{day.title}</h3>
            </div>

            {/* 卡片 + SVG 连线 */}
            <div className="travel-day__cards">
              <svg className="travel-day__lines" viewBox="0 0 1000 280" preserveAspectRatio="none">
                <path
                  d={generateCurvePath(OFFSETS)}
                  fill="none"
                  stroke={day.color}
                  strokeWidth="2.5"
                  strokeDasharray="8 4"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>

              {day.spots.map((spot, si) => (
                <div
                  key={spot.id}
                  className="travel-card"
                  style={{
                    '--offset-x': `${OFFSETS[si].x}px`,
                    '--offset-y': `${OFFSETS[si].y}px`,
                    '--card-rot': `${OFFSETS[si].rot}deg`,
                  }}
                >
                  <div className="travel-card__inner">
                    {/* 序号标签 */}
                    <span
                      className="travel-card__num"
                      style={{ background: day.color }}
                    >
                      {si + 1}
                    </span>

                    {/* 图片 */}
                    <div
                      className="travel-card__img"
                      onClick={() => setSelectedImage(spot)}
                    >
                      <img src={spot.image} alt={spot.name} loading="lazy" />
                    </div>

                    {/* 底部信息 */}
                    <div className="travel-card__info">
                      <h4 className="travel-card__name">{spot.name}</h4>
                      <a
                        className="travel-card__map"
                        href={encodeMapUrl(spot.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="地图导航"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <span>导航</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 灯箱 */}
      {selectedImage && (
        <div className="travel-lightbox" onClick={() => setSelectedImage(null)}>
          <div className="travel-lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <button className="travel-lightbox__close" onClick={() => setSelectedImage(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <img src={selectedImage.image} alt={selectedImage.name} />
            <div className="travel-lightbox__text">
              <h3>{selectedImage.name}</h3>
              <p>{selectedImage.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

/* 生成连接 5 张卡片的曲线路径 */
function generateCurvePath(offsets) {
  /* 5 张卡片中心点 X 坐标均匀分布 */
  const cx = [140, 340, 500, 670, 850]
  const cyBase = 130
  const points = offsets.map((o, i) => ({
    x: cx[i] + o.x * 0.5,
    y: cyBase + (i % 2 === 0 ? -30 : 30) + o.y * 0.5,
  }))

  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const cur = points[i]
    const cpx1 = prev.x + (cur.x - prev.x) * 0.35
    const cpy1 = prev.y + (i % 2 === 0 ? -50 : 50)
    const cpx2 = cur.x - (cur.x - prev.x) * 0.35
    const cpy2 = cur.y + (i % 2 === 0 ? 50 : -50)
    d += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${cur.x} ${cur.y}`
  }
  return d
}
