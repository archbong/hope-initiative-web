import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

// Import translations directly (instead of HTTP loading)
import en from './locales/en.json'
import fr from './locales/fr.json'
import ar from './locales/ar.json'
import sw from './locales/sw.json'
import ha from './locales/ha.json'
import yo from './locales/yo.json'
import ig from './locales/ig.json'
import pt from './locales/pt.json'
import es from './locales/es.json'
import am from './locales/am.json'

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  ar: { translation: ar },
  sw: { translation: sw },
  ha: { translation: ha },
  yo: { translation: yo },
  ig: { translation: ig },
  pt: { translation: pt },
  es: { translation: es },
  am: { translation: am }
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
      lookupQuerystring: 'lang',
    }
  })

export default i18n