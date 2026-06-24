import { useState, useEffect, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import GlassSurface from './GlassSurface'
import './Header.css'

export default memo(function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [scrolled, setScrolled] = useState(!isHome)

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    const handleScroll = () => setScrolled(window.scrollY > 60)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  const navLinks = [
    { label: '首页', to: '/' },
    { label: '探索武汉', to: '/explore' },
    { label: '关于我', to: '/about' },
  ]

  const glassPill = {
    blur: 6,
    brightness: 70,
    opacity: 0.85,
    saturation: scrolled ? 1.5 : 1,
    distortionScale: -100,
    redOffset: 0,
    greenOffset: 8,
    blueOffset: 16,
    backgroundOpacity: scrolled ? 0.12 : 0,
    borderRadius: 40,
  }

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner container">
        <GlassSurface
          {...glassPill}
          width="auto"
          height={scrolled ? '48px' : '56px'}
          className="header__pill header__pill--logo"
        >
          <Link to="/" className="header__logo">
            <img src="/images/logo.png" alt="武汉 Logo" className="header__logo-img" />
            <h1 className="header__title">武汉</h1>
          </Link>
        </GlassSurface>

        <GlassSurface
          {...glassPill}
          width="auto"
          height={scrolled ? '48px' : '56px'}
          className="header__pill header__pill--nav"
        >
          <nav className="header__nav">
            <ul className="header__nav-list">
              {navLinks.map((link) => (
                <li key={link.label} className="header__nav-item">
                  <Link
                    to={link.to}
                    className={`header__nav-link${
                      location.pathname === link.to ? ' header__nav-link--active' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </GlassSurface>
      </div>
    </header>
  )
})
