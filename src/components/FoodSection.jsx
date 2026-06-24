import { useState, useRef, useMemo, useEffect } from 'react'
import { gsap } from 'gsap'
import Masonry from './Masonry'
import { GlobalSpotlight } from './MagicBento'
import FoodDetail from './FoodDetail'
import { foods } from '../data/foods'
import './Gallery.css'

export default function FoodSection() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const [originRect, setOriginRect] = useState(null)

  const items = useMemo(
    () =>
      foods.map((f) => ({
        id: `food-${f.id}`,
        img: f.image,
        url: '#',
        height: f.height,
        ...f,
      })),
    []
  )

  const openDetail = (item) => {
    const el = document.querySelector(`[data-key="${item.id}"]`)
    if (el) setOriginRect(el.getBoundingClientRect())
    const idx = items.findIndex((i) => i.id === item.id)
    setActiveIndex(idx)
  }

  const closeDetail = () => {
    setActiveIndex(null)
    setOriginRect(null)
  }

  const prevItem = () => setActiveIndex((p) => (p - 1 + items.length) % items.length)
  const nextItem = () => setActiveIndex((p) => (p + 1) % items.length)

  useEffect(() => {
    const el = document.getElementById('food')
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const tl = gsap.timeline()
        tl.fromTo('#food .gallery__center-recommend', { opacity: 0, y: 30, letterSpacing: '0.5em' }, { opacity: 1, y: 0, letterSpacing: '0.12em', duration: 0.7, ease: 'power3.out' })
        tl.fromTo('#food .gallery__center-maybe', { opacity: 0, y: 24, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }, '-=0.35')
        obs.disconnect()
      }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="food" className="gallery food-section" ref={sectionRef}>
      <GlobalSpotlight
        containerRef={sectionRef}
        enabled={true}
        spotlightRadius={280}
        glowColor="184, 149, 106"
        cardSelector=".item-wrapper"
      />

      <div className="container">
        <div className="gallery__center-title">
          <span className="gallery__center-recommend">TASTE</span>
          <h2 className="gallery__center-maybe">武汉美食</h2>
        </div>

        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.03}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.96}
          blurToFocus={true}
          onItemClick={openDetail}
        />
      </div>

      {activeIndex !== null && (
        <FoodDetail
          food={items[activeIndex]}
          originRect={originRect}
          onClose={closeDetail}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </section>
  )
}
