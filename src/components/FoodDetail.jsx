import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './FoodDetail.css'

export default function FoodDetail({ food, originRect, onClose, onPrev, onNext }) {
  const overlayRef = useRef(null)
  const innerRef = useRef(null)
  const textRef = useRef(null)
  const tlRef = useRef(null)
  const [imgSize, setImgSize] = useState(null)
  const [phase, setPhase] = useState('loading') // loading -> ready -> closing

  /* 加载图片获取尺寸 */
  useEffect(() => {
    setPhase('loading')
    setImgSize(null)
    const img = new Image()
    img.src = food.image
    img.onload = () => {
      const maxW = window.innerWidth * 0.45
      const maxH = window.innerHeight * 0.7
      const ratio = img.naturalWidth / img.naturalHeight
      let w = img.naturalWidth
      let h = img.naturalHeight
      if (w > maxW) { w = maxW; h = w / ratio }
      if (h > maxH) { h = maxH; w = h * ratio }
      setImgSize({ w: Math.round(w), h: Math.round(h) })
    }
  }, [food.image])

  /* 图片尺寸就绪后播放入场动画 */
  useEffect(() => {
    if (!imgSize) return
    if (tlRef.current) tlRef.current.kill()

    /* 等一帧确保 DOM 完成渲染 */
    const raf = requestAnimationFrame(() => {
      const overlay = overlayRef.current
      const inner = innerRef.current
      const text = textRef.current
      if (!overlay || !inner || !text) return

      const finalRect = inner.getBoundingClientRect()

      /* 起始位置：从缩略图 */
      const fromX = originRect
        ? originRect.left - finalRect.left + (originRect.width - finalRect.width) / 2
        : 0
      const fromY = originRect
        ? originRect.top - finalRect.top + (originRect.height - finalRect.height) / 2
        : -60
      const fromSX = originRect ? originRect.width / finalRect.width : 0.3
      const fromSY = originRect ? originRect.height / finalRect.height : 0.3

      gsap.set(overlay, { opacity: 0 })
      gsap.set(inner, {
        x: fromX,
        y: fromY,
        scaleX: fromSX,
        scaleY: fromSY,
        opacity: 0.5,
      })
      gsap.set(text, { opacity: 0, y: 24 })

      tlRef.current = gsap.timeline({
        onComplete: () => setPhase('ready'),
      })
      /* 背景淡入 */
      tlRef.current.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      /* 图片从缩略图飞到最终位置 */
      tlRef.current.to(
        inner,
        { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      )
      /* 文字稍后淡入 */
      tlRef.current.to(text, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.25')
    })

    return () => {
      cancelAnimationFrame(raf)
      if (tlRef.current) tlRef.current.kill()
    }
  }, [imgSize, originRect])

  /* 退场：缩放回缩略图 */
  const handleClose = () => {
    if (phase === 'closing') return
    setPhase('closing')
    if (tlRef.current) tlRef.current.kill()

    const overlay = overlayRef.current
    const inner = innerRef.current
    const text = textRef.current
    if (!overlay || !inner || !text) { onClose(); return }

    const finalRect = inner.getBoundingClientRect()

    const toX = originRect
      ? originRect.left - finalRect.left + (originRect.width - finalRect.width) / 2
      : 0
    const toY = originRect
      ? originRect.top - finalRect.top + (originRect.height - finalRect.height) / 2
      : -60
    const toSX = originRect ? originRect.width / finalRect.width : 0.3
    const toSY = originRect ? originRect.height / finalRect.height : 0.3

    tlRef.current = gsap.timeline({ onComplete: onClose })
    tlRef.current.to(text, { opacity: 0, duration: 0.2 })
    tlRef.current.to(
      inner,
      { x: toX, y: toY, scaleX: toSX, scaleY: toSY, opacity: 0.2, duration: 0.55, ease: 'power3.in' },
      '-=0.1'
    )
    tlRef.current.to(overlay, { opacity: 0, duration: 0.3 }, '-=0.35')
  }

  /* 键盘 */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowLeft' && phase === 'ready') onPrev()
      if (e.key === 'ArrowRight' && phase === 'ready') onNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [phase, onPrev, onNext])

  return (
    <div className="food-detail" ref={overlayRef} onClick={handleClose}>
      {imgSize && (
        <div className="food-detail__inner" ref={innerRef} onClick={(e) => e.stopPropagation()}>
          <button className="food-detail__close" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="food-detail__body">
            <div className="food-detail__image" style={{ width: imgSize.w, minWidth: imgSize.w }}>
              <img src={food.image} alt={food.name} />
            </div>
            <div className="food-detail__text" ref={textRef}>
              <h2 className="food-detail__label">美食</h2>
              <h3 className="food-detail__name">{food.name}</h3>
              <p className="food-detail__desc">{food.description}</p>
            </div>
          </div>

          {phase === 'ready' && (
            <>
              <button className="food-detail__arrow food-detail__arrow--left" onClick={onPrev}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="food-detail__arrow food-detail__arrow--right" onClick={onNext}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
