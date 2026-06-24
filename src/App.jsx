import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import FloatingPill from './components/FloatingPill'
import MusicPlayer from './components/MusicPlayer'
import './App.css'

/* 页面级代码分割 — 按需加载 */
const HomePage = lazy(() => import('./pages/HomePage'))
const ExplorePage = lazy(() => import('./pages/ExplorePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

const PageLoader = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '100vh', background: 'var(--color-bg)', color: 'var(--color-text-muted)',
    fontSize: '14px', letterSpacing: '0.1em',
  }}>
    加载中...
  </div>
)

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app">
          <ScrollToTop />
          <Header />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Suspense>
          <MusicPlayer />
          <FloatingPill />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}
