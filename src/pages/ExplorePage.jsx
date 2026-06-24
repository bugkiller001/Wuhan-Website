import { useState, useRef, useEffect } from 'react'
import GlassSurface from '../components/GlassSurface'
import SideRays from '../components/SideRays'
import { categories } from '../data/explore'
import './ExplorePage.css'

function WavyPath({ color }) {
  return (
    <svg className="wavy-path" viewBox="0 0 1000 80" preserveAspectRatio="none">
      <path
        d="M0 40 C80 10, 160 70, 250 40 C340 10, 420 70, 500 40 C580 10, 660 70, 750 40 C840 10, 920 70, 1000 40"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="12 6"
        opacity="0.5"
      />
      <circle cx="0" cy="40" r="6" fill={color} opacity="0.7" />
      <circle cx="250" cy="40" r="4" fill={color} opacity="0.5" />
      <circle cx="500" cy="40" r="6" fill={color} opacity="0.7" />
      <circle cx="750" cy="40" r="4" fill={color} opacity="0.5" />
      <circle cx="1000" cy="40" r="6" fill={color} opacity="0.7" />
    </svg>
  )
}

function CategoryNav({ categories, activeId, onSelect }) {
  return (
    <nav className="explore-nav">
      {categories.map((cat) => {
        const isActive = cat.id === activeId
        return (
          <button
            key={cat.id}
            className={`explore-nav__btn${isActive ? ' explore-nav__btn--active' : ''}`}
            onClick={() => onSelect(cat.id)}
            style={{ '--cat-color': cat.color }}
          >
            <GlassSurface
              width="auto"
              height={44}
              borderRadius={50}
              backgroundOpacity={isActive ? 0.15 : 0}
              blur={3}
              brightness={isActive ? 60 : 80}
              opacity={0.7}
              saturation={1.1}
              distortionScale={-50}
              redOffset={0}
              greenOffset={3}
              blueOffset={6}
              className="explore-nav__glass"
            >
              <span className="explore-nav__icon">{cat.icon}</span>
              <span className="explore-nav__label">{cat.label}</span>
            </GlassSurface>
          </button>
        )
      })}
    </nav>
  )
}

function DetailModal({ item, category, onClose }) {
  const overlayRef = useRef(null)
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="explore-modal" ref={overlayRef} onClick={onClose}>
      <div className="explore-modal__inner" onClick={(e) => e.stopPropagation()} style={{ '--cat-color': category.color }}>
        <button className="explore-modal__close" onClick={onClose}>✕</button>
        <div className="explore-modal__img">
          <img src={item.img} alt={item.name} />
        </div>
        <div className="explore-modal__body">
          <span className="explore-modal__cat">{category.icon} {category.label}</span>
          <h2 className="explore-modal__name">{item.name}</h2>
          <p className="explore-modal__desc">{item.desc}</p>
        </div>
      </div>
    </div>
  )
}

export default function ExplorePage() {
  const [activeId, setActiveId] = useState(categories[0].id)
  const [detail, setDetail] = useState(null)
  const sectionRefs = useRef({})

  const scrollTo = (id) => {
    setActiveId(id)
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="explore-page">
      {/* 页面头部 */}
      <div className="explore-hero">
        <SideRays
          className="explore-hero__rays"
          speed={2.5}
          rayColor1="#F4A460"
          rayColor2="#E8917E"
          intensity={1.5}
          spread={1.8}
          origin="top-right"
          saturation={1.2}
          blend={0.7}
          falloff={1.8}
          opacity={0.8}
        />
        <div className="explore-hero__content">
          <span className="explore-hero__emoji">🗺️</span>
          <h1 className="explore-hero__title">探索武汉</h1>
          <p className="explore-hero__sub">跟着小地图一起发现大武汉的有趣宝藏吧！</p>
        </div>
      </div>

      {/* 分类导航 */}
      <CategoryNav categories={categories} activeId={activeId} onSelect={scrollTo} />

      {/* 类别区域 */}
      {categories.map((cat) => (
        <section
          key={cat.id}
          className="explore-section"
          ref={(el) => (sectionRefs.current[cat.id] = el)}
          style={{ '--cat-bg': cat.bg }}
        >
          <div className="container">
            <div className="explore-section__head">
              <span className="explore-section__icon">{cat.icon}</span>
              <h2 className="explore-section__title" style={{ color: cat.color }}>{cat.label}</h2>
            </div>

            <WavyPath color={cat.color} />

            <div className="explore-cards">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="explore-card"
                  style={{ '--card-bg': cat.bg, '--card-color': cat.color }}
                  onClick={() => setDetail({ item, category: cat })}
                >
                  <div className="explore-card__img">
                    <img src={item.img} alt={item.name} loading="lazy" />
                  </div>
                  <div className="explore-card__name">{item.name}</div>
                  <div className="explore-card__hint">点击探索</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {detail && (
        <DetailModal
          item={detail.item}
          category={detail.category}
          onClose={() => setDetail(null)}
        />
      )}
    </div>
  )
}
