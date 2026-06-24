import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import GlassSurface from './GlassSurface'
import './Hero.css'

export default function Hero() {
  const imgRef = useRef(null)
  const ctaRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    /* 遮罩揭开 */
    tl.fromTo(overlayRef.current, { opacity: 0.6 }, { opacity: 1, duration: 0.8 })
    /* 标题图片：压缩后弹入归位 */
    tl.fromTo(imgRef.current,
      { scale: 0.7, opacity: 0, y: 30 },
      { scale: 1.05, opacity: 1, y: 0, duration: 0.7, ease: 'power4.out' }, '-=0.3')
    tl.to(imgRef.current, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
    /* CTA 按钮延迟滑入 */
    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
    return () => tl.kill()
  }, [])

  return (
    <section id="hero" className="hero">
      <div className="hero__video-wrapper">
        <video className="hero__video hero__video--active" autoPlay muted loop playsInline preload="metadata" fetchpriority="low" poster="/images/jinbu.png">
          <source src="/images/video.mp4" type="video/mp4" />
        </video>
        <div className="hero__overlay" ref={overlayRef} />
      </div>
      <div className="hero__content">
        <img ref={imgRef} src="/images/jinbu.png" alt="进步" className="hero__center-image" />
        <button className="hero__cta" ref={ctaRef} onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}>
          <GlassSurface width="auto" height="54px" borderRadius={50} backgroundOpacity={0.08} blur={4} brightness={80} opacity={0.7} saturation={1.2} distortionScale={-80} redOffset={0} greenOffset={6} blueOffset={12} className="hero__cta-glass">
            <span className="hero__cta-inner">
              <span>浏览全部作品</span>
              <svg className="hero__cta-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4L10 16M10 16L5 11M10 16L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </GlassSurface>
        </button>
      </div>
    </section>
  )
}
