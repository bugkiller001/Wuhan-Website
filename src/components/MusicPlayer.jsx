import { useState, useRef, useEffect, useCallback, memo } from 'react'
import GlassSurface from './GlassSurface'
import './MusicPlayer.css'

const PLAYLIST = [
  { title: '爱在西元前', src: '/music/周杰伦 - 爱在西元前.mp3' },
  { title: '断了的弦', src: '/music/周杰伦+-+断了的弦.mp3' },
  { title: '爱琴海', src: '/music/爱琴海-周杰伦.mp3' },
  { title: '那天下雨了', src: '/music/那天下雨了-周杰伦.mp3' },
]

export default memo(function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [index, setIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const audioRef = useRef(null)

  const current = PLAYLIST[index]

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.volume = 0.5
    }
    const audio = audioRef.current
    audio.src = current.src

    const onEnded = () => handleNext()
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('ended', onEnded)
      audio.pause()
    }
  }, [index])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setPlaying(!playing)
  }, [playing])

  const handlePrev = () => {
    const newIdx = (index - 1 + PLAYLIST.length) % PLAYLIST.length
    setIndex(newIdx)
    setPlaying(true)
    setTimeout(() => audioRef.current?.play().catch(() => {}), 50)
  }

  const handleNext = () => {
    const newIdx = (index + 1) % PLAYLIST.length
    setIndex(newIdx)
    setPlaying(true)
    setTimeout(() => audioRef.current?.play().catch(() => {}), 50)
  }

  return (
    <div
      className="music-player"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <GlassSurface
        width="auto"
        height={52}
        borderRadius={50}
        backgroundOpacity={0.1}
        blur={5}
        brightness={70}
        opacity={0.75}
        saturation={1.3}
        distortionScale={-90}
        redOffset={0}
        greenOffset={6}
        blueOffset={12}
        className="music-player__glass"
      >
        <div className="music-player__inner">
          {/* 音乐图标 — 始终显示 */}
          <button className="music-player__btn music-player__btn--play" onClick={togglePlay} title={playing ? '暂停' : '播放'}>
            {playing ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* hover 展开：上一首 + 歌名 + 下一首 */}
          <div className={`music-player__extra${expanded ? ' music-player__extra--show' : ''}`}>
            <button className="music-player__btn" onClick={handlePrev} title="上一首">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            <span className="music-player__title">{current.title}</span>

            <button className="music-player__btn" onClick={handleNext} title="下一首">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>
        </div>
      </GlassSurface>
    </div>
  )
})
