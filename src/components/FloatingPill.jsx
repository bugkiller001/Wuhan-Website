import { memo } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LanguageContext'
import GlassSurface from './GlassSurface'
import './FloatingPill.css'

export default memo(function FloatingPill() {
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang } = useLang()
  const isDark = theme === 'dark'

  return (
    <div className="floating-pill">
      <GlassSurface
        width="auto"
        height={48}
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
        className="floating-pill__glass"
      >
        <div className="floating-pill__inner">
          {/* 语言切换 */}
          <button
            className="floating-pill__btn"
            onClick={toggleLang}
            title={lang === 'zh' ? 'Switch to English' : '切换到中文'}
          >
            <span className="floating-pill__label">{lang === 'zh' ? '中' : 'EN'}</span>
          </button>

          <span className="floating-pill__divider" />

          {/* 深色模式切换 */}
          <button
            className="floating-pill__btn"
            onClick={toggleTheme}
            title={isDark ? '切换到亮色模式' : '切换到深色模式'}
          >
            {isDark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </GlassSurface>
    </div>
  )
})
