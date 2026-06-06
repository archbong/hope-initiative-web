import { useTranslation } from 'react-i18next'
import { Globe, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧', region: 'International' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', region: 'West & Central Africa' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', region: 'North Africa' },
  { code: 'sw', name: 'Kiswahili', flag: '🇹🇿', region: 'East Africa' },
  { code: 'ha', name: 'Hausa', flag: '🇳🇬', region: 'West Africa' },
  { code: 'yo', name: 'Yorùbá', flag: '🇳🇬', region: 'Nigeria' },
  { code: 'ig', name: 'Igbo', flag: '🇳🇬', region: 'Nigeria' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', region: 'Lusophone Africa' },
  { code: 'es', name: 'Español', flag: '🇪🇸', region: 'Equatorial Guinea' },
  { code: 'am', name: 'አማርኛ', flag: '🇪🇹', region: 'Ethiopia' }
]

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode)
    localStorage.setItem('preferred-language', langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Pure text link interface — completely removes the button profile */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 cursor-pointer py-1 text-slate-500 hover:text-slate-900 transition-colors duration-200 select-none group"
      >
        <Globe className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
        <span className="text-xs font-semibold tracking-wider uppercase">
          {currentLanguage.code}
        </span>
        <span className="text-xs text-slate-300">|</span>
        <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
          {currentLanguage.name}
        </span>
        <ChevronDown
          className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-slate-700' : ''
            }`}
        />
      </div>

      {/* Premium Multi-Column Contextual Overlay */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-[480px] bg-white rounded-2xl shadow-xl border border-slate-200/50 p-4 z-50 origin-top-right transform transition-all duration-200 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="mb-3 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Regional Language</span>
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-medium">10 Languages Available</span>
          </div>

          <div className="grid grid-cols-2 gap-1 max-h-[280px] overflow-y-auto">
            {languages.map((lang) => {
              const isSelected = i18n.language === lang.code
              return (
                <div
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`cursor-pointer px-3 py-2 rounded-xl transition-all duration-150 flex items-center space-x-3 ${isSelected
                      ? 'bg-slate-900 text-white font-medium'
                      : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <span className="text-lg filter drop-shadow-sm" role="img" aria-label={`${lang.name} flag`}>
                    {lang.flag}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold truncate">{lang.name}</div>
                    <div className={`text-[10px] truncate ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                      {lang.region}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher