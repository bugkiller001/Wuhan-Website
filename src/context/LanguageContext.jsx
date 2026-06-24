import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'zh')

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  const toggleLang = () => setLang((prev) => (prev === 'zh' ? 'en' : 'zh'))

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
