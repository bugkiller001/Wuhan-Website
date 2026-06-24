import { lazy, Suspense, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Gallery.css'

const DomeGallery = lazy(() => import('./DomeGallery'))

const IMAGES = [
  '/images/gy_img/1.png','/images/gy_img/2.png','/images/gy_img/3.png','/images/gy_img/4.png',
  '/images/gy_img/5.png','/images/gy_img/6.png','/images/gy_img/7.png','/images/gy_img/8.png',
  '/images/gy_img/9.png','/images/gy_img/10.png','/images/gy_img/11.png','/images/gy_img/12.png',
  '/images/gy_img/13.jpg','/images/gy_img/13.png','/images/gy_img/14.jpg','/images/gy_img/14.png',
  '/images/gy_img/15.png','/images/gy_img/16.png','/images/gy_img/17.png','/images/gy_img/18.png',
  '/images/gy_img/19.png','/images/gy_img/20.png',
]

export default function GallerySection() {
  const titleRef = useRef(null)

  useEffect(() => {
    const el = document.getElementById('gallery')
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const tl = gsap.timeline()
        tl.fromTo('#gallery .gallery__center-recommend', { opacity: 0, y: 40, letterSpacing: '0.5em' }, { opacity: 1, y: 0, letterSpacing: '0.12em', duration: 0.8, ease: 'power3.out' })
        tl.fromTo('#gallery .gallery__center-maybe', { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        obs.disconnect()
      }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="gallery" className="gallery-dome">
      <div className="gallery__center-title" ref={titleRef}>
        <span className="gallery__center-recommend">RECOMMEND</span>
        <h2 className="gallery__center-maybe">也许你喜欢</h2>
      </div>
      <div className="gallery-dome__stage">
        <Suspense fallback={<div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>加载中...</div>}>
          <DomeGallery images={IMAGES} fit={0.45} minRadius={350} maxVerticalRotationDeg={20} segments={26} grayscale={false} imageBorderRadius="10px" openedImageBorderRadius="14px" openedImageWidth="70vw" openedImageHeight="70vh" />
        </Suspense>
      </div>
    </section>
  )
}
