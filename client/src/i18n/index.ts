import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import namespaced translations for English
import enCommon from './locales/en/common.json'
import enNav from './locales/en/nav.json'
import enHome from './locales/en/home.json'
import enAbout from './locales/en/about.json'
import enMission from './locales/en/mission.json'
import enLeadership from './locales/en/leadership.json'
import enPrograms from './locales/en/programs.json'
import enVolunteer from './locales/en/volunteer.json'
import enDonate from './locales/en/donate.json'
import enPartner from './locales/en/partner.json'
import enContact from './locales/en/contact.json'

// Import namespaced translations for French
import frCommon from './locales/fr/common.json'
import frNav from './locales/fr/nav.json'
import frHome from './locales/fr/home.json'
import frAbout from './locales/fr/about.json'
import frMission from './locales/fr/mission.json'
import frLeadership from './locales/fr/leadership.json'
import frPrograms from './locales/fr/programs.json'
import frVolunteer from './locales/fr/volunteer.json'
import frDonate from './locales/fr/donate.json'
import frPartner from './locales/fr/partner.json'
import frContact from './locales/fr/contact.json'

// Import namespaced translations for French
import esCommon from './locales/es/common.json'
import esNav from './locales/es/nav.json'
import esHome from './locales/es/home.json'
import esAbout from './locales/es/about.json'
import esMission from './locales/es/mission.json'
import esLeadership from './locales/es/leadership.json'
import esPrograms from './locales/es/programs.json'
import esVolunteer from './locales/es/volunteer.json'
import esDonate from './locales/es/donate.json'
import esPartner from './locales/es/partner.json'
import esContact from './locales/es/contact.json'

// Add other languages (ar, sw, ha, yo, ig, pt, es, am) following same pattern

const resources = {
  en: {
    common: enCommon,
    nav: enNav,
    home: enHome,
    about: enAbout,
    mission: enMission,
    leadership: enLeadership,
    programs: enPrograms,
    volunteer: enVolunteer,
    donate: enDonate,
    partner: enPartner,
    contact: enContact
  },
  fr: {
    common: frCommon,
    nav: frNav,
    home: frHome,
    about: frAbout,
    mission: frMission,
    leadership: frLeadership,
    programs: frPrograms,
    volunteer: frVolunteer,
    donate: frDonate,
    partner: frPartner,
    contact: frContact
  },
  es: {
    common: esCommon,
    nav: esNav,
    home: esHome,
    about: esAbout,
    mission: esMission,
    leadership: esLeadership,
    programs: esPrograms,
    volunteer: esVolunteer,
    donate: esDonate,
    partner: esPartner,
    contact: esContact
  }
  // Add ar, sw, ha, yo, ig, pt, es, am here
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    ns: ['common', 'nav', 'home', 'about', 'mission', 'leadership', 'programs', 'volunteer', 'donate', 'partner', 'contact'],
    defaultNS: 'common',
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