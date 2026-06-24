import { useState, useRef, useMemo } from 'react'
import Masonry from '../components/Masonry'
import GlassSurface from '../components/GlassSurface'
import Particles from '../components/Particles'
import { GlobalSpotlight } from '../components/MagicBento'
import { categories, defaultCategory } from '../data/categories'
import './SubPage.css'

export default function GalleryPage() {
  const [activeId, setActiveId] = useState(defaultCategory.id)
  const sectionRef = useRef(null)
  const activeCategory = categories.find((c) => c.id === activeId)

  const items = useMemo(() => {
    const cat = categories.find((c) => c.id === activeId)
    return (cat?.items || []).map((item, i) => ({
      id: `${activeId}-${i + 1}`,
      img: item.image,
      url: '#',
      height: item.height,
    }))
  }, [activeId])

  return (
    <section className="sub-page gallery-page" ref={sectionRef}>
      <Particles
        particleCount={120}
        particleSpread={8}
        speed={0.06}
        particleBaseSize={80}
        sizeRandomness={0.8}
        alphaParticles={true}
        disableRotation={false}
        cameraDistance={18}
        particleColors={['#b8956a', '#d4c4a8']}
      />
      <GlobalSpotlight
        containerRef={sectionRef}
        enabled={true}
        spotlightRadius={300}
        glowColor="184, 149, 106"
        cardSelector=".item-wrapper"
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="gallery-page__head">
          <div className="gallery-page__titles">
            <span className="gallery-page__kicker">素材库</span>
            <h1 className="gallery-page__title">武汉 · 影像素材</h1>
            <p className="gallery-page__desc">
              精心整理的城市影像素材，按主题分类，方便查找使用。
            </p>
          </div>

          <nav className="gallery-page__nav">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`gallery-page__pill${cat.id === activeId ? ' gallery-page__pill--active' : ''}`}
                onClick={() => setActiveId(cat.id)}
              >
                <GlassSurface
                  width="auto"
                  height={36}
                  borderRadius={50}
                  backgroundOpacity={cat.id === activeId ? 0.2 : 0.05}
                  blur={3}
                  brightness={cat.id === activeId ? 60 : 80}
                  opacity={0.75}
                  saturation={1.1}
                  distortionScale={-60}
                  redOffset={0}
                  greenOffset={4}
                  blueOffset={8}
                  className="gallery-page__glass"
                >
                  <span className="gallery-page__pill-text">{cat.label}</span>
                </GlassSurface>
              </button>
            ))}
          </nav>
        </div>

        <Masonry
          key={activeId}
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.03}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.96}
          blurToFocus={true}
          itemClassName="magic-glow-card magic-glow-card--border-glow"
        />
      </div>
    </section>
  )
}
