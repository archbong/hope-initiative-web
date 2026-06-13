import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import namespaced translations for English
import amCommon from './locales/am/common.json'
import amNav from './locales/am/nav.json'
import amHome from './locales/am/home.json'
import amAbout from './locales/am/about.json'
import amMission from './locales/am/mission.json'
import amLeadership from './locales/am/leadership.json'
import amPrograms from './locales/am/programs.json'
import amVolunteer from './locales/am/volunteer.json'
import amDonate from './locales/am/donate.json'
import amPartner from './locales/am/partner.json'
import amContact from './locales/am/contact.json'

// Import namespaced translations for English
import arCommon from './locales/ar/common.json'
import arNav from './locales/ar/nav.json'
import arHome from './locales/ar/home.json'
import arAbout from './locales/ar/about.json'
import arMission from './locales/ar/mission.json'
import arLeadership from './locales/ar/leadership.json'
import arPrograms from './locales/ar/programs.json'
import arVolunteer from './locales/ar/volunteer.json'
import arDonate from './locales/ar/donate.json'
import arPartner from './locales/ar/partner.json'
import arContact from './locales/ar/contact.json'

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

// Import namespaced translations for Espanol
import gknCommon from './locales/es/common.json'
import gknNav from './locales/gkn/nav.json'
import gknHome from './locales/gkn/home.json'
import gknAbout from './locales/gkn/about.json'
import gknMission from './locales/gkn/mission.json'
import gknLeadership from './locales/gkn/leadership.json'
import gknPrograms from './locales/gkn/programs.json'
import gknVolunteer from './locales/gkn/volunteer.json'
import gknDonate from './locales/gkn/donate.json'
import gknPartner from './locales/gkn/partner.json'
import gknContact from './locales/gkn/contact.json'

// Import namespaced translations for French
import haCommon from './locales/ha/common.json'
import haNav from './locales/ha/nav.json'
import haHome from './locales/ha/home.json'
import haAbout from './locales/ha/about.json'
import haMission from './locales/ha/mission.json'
import haLeadership from './locales/ha/leadership.json'
import haPrograms from './locales/ha/programs.json'
import haVolunteer from './locales/ha/volunteer.json'
import haDonate from './locales/ha/donate.json'
import haPartner from './locales/ha/partner.json'
import haContact from './locales/ha/contact.json'

// Import namespaced translations for French
import igCommon from './locales/ig/common.json'
import igNav from './locales/ig/nav.json'
import igHome from './locales/ig/home.json'
import igAbout from './locales/ig/about.json'
import igMission from './locales/ig/mission.json'
import igLeadership from './locales/ig/leadership.json'
import igPrograms from './locales/ig/programs.json'
import igVolunteer from './locales/ig/volunteer.json'
import igDonate from './locales/ig/donate.json'
import igPartner from './locales/ig/partner.json'
import igContact from './locales/ig/contact.json'

// Import namespaced translations for French
import ogoCommon from './locales/ogo/common.json'
import ogoNav from './locales/ogo/nav.json'
import ogoHome from './locales/ogo/home.json'
import ogoAbout from './locales/ogo/about.json'
import ogoMission from './locales/ogo/mission.json'
import ogoLeadership from './locales/ogo/leadership.json'
import ogoPrograms from './locales/ogo/programs.json'
import ogoVolunteer from './locales/ogo/volunteer.json'
import ogoDonate from './locales/ogo/donate.json'
import ogoPartner from './locales/ogo/partner.json'
import ogoContact from './locales/ogo/contact.json'

// Import namespaced translations for French
import ptCommon from './locales/pt/common.json'
import ptNav from './locales/pt/nav.json'
import ptHome from './locales/pt/home.json'
import ptAbout from './locales/pt/about.json'
import ptMission from './locales/pt/mission.json'
import ptLeadership from './locales/pt/leadership.json'
import ptPrograms from './locales/pt/programs.json'
import ptVolunteer from './locales/pt/volunteer.json'
import ptDonate from './locales/pt/donate.json'
import ptPartner from './locales/pt/partner.json'
import ptContact from './locales/pt/contact.json'

// Import namespaced translations for French
import swCommon from './locales/sw/common.json'
import swNav from './locales/sw/nav.json'
import swHome from './locales/sw/home.json'
import swAbout from './locales/sw/about.json'
import swMission from './locales/sw/mission.json'
import swLeadership from './locales/sw/leadership.json'
import swPrograms from './locales/sw/programs.json'
import swVolunteer from './locales/sw/volunteer.json'
import swDonate from './locales/sw/donate.json'
import swPartner from './locales/sw/partner.json'
import swContact from './locales/sw/contact.json'

// Import namespaced translations for French
import yoCommon from './locales/yo/common.json'
import yoNav from './locales/yo/nav.json'
import yoHome from './locales/yo/home.json'
import yoAbout from './locales/yo/about.json'
import yoMission from './locales/yo/mission.json'
import yoLeadership from './locales/yo/leadership.json'
import yoPrograms from './locales/yo/programs.json'
import yoVolunteer from './locales/yo/volunteer.json'
import yoDonate from './locales/yo/donate.json'
import yoPartner from './locales/yo/partner.json'
import yoContact from './locales/yo/contact.json'

// Add other languages (ar, sw, ha, yo, ig, pt, es, am) following same pattern

const resources = {
  am: {
    common: amCommon,
    nav: amNav,
    home: amHome,
    about: amAbout,
    mission: amMission,
    leadership: amLeadership,
    programs: amPrograms,
    volunteer: amVolunteer,
    donate: amDonate,
    partner: amPartner,
    contact: amContact
  },
  ar: {
    common: arCommon,
    nav: arNav,
    home: arHome,
    about: arAbout,
    mission: arMission,
    leadership: arLeadership,
    programs: arPrograms,
    volunteer: arVolunteer,
    donate: arDonate,
    partner: arPartner,
    contact: arContact
  },
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
  }, es: {
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
  gkn: {
    common: gknCommon,
    nav: gknNav,
    home: gknHome,
    about: gknAbout,
    mission: gknMission,
    leadership: gknLeadership,
    programs: gknPrograms,
    volunteer: gknVolunteer,
    donate: gknDonate,
    partner: gknPartner,
    contact: gknContact
  },
  ha: {
    common: haCommon,
    nav: haNav,
    home: haHome,
    about: haAbout,
    mission: haMission,
    leadership: haLeadership,
    programs: haPrograms,
    volunteer: haVolunteer,
    donate: haDonate,
    partner: haPartner,
    contact: haContact
  },
  ig: {
    common: igCommon,
    nav: igNav,
    home: igHome,
    about: igAbout,
    mission: igMission,
    leadership: igLeadership,
    programs: igPrograms,
    volunteer: igVolunteer,
    donate: igDonate,
    partner: igPartner,
    contact: igContact
  },
  ogo: {
    common: ogoCommon,
    nav: ogoNav,
    home: ogoHome,
    about: ogoAbout,
    mission: ogoMission,
    leadership: ogoLeadership,
    programs: ogoPrograms,
    volunteer: ogoVolunteer,
    donate: ogoDonate,
    partner: ogoPartner,
    contact: ogoContact
  },
  pt: {
    common: ptCommon,
    nav: ptNav,
    home: ptHome,
    about: ptAbout,
    mission: ptMission,
    leadership: ptLeadership,
    programs: ptPrograms,
    volunteer: ptVolunteer,
    donate: ptDonate,
    partner: ptPartner,
    contact: ptContact
  },
  sw: {
    common: swCommon,
    nav: swNav,
    home: swHome,
    about: swAbout,
    mission: swMission,
    leadership: swLeadership,
    programs: swPrograms,
    volunteer: swVolunteer,
    donate: swDonate,
    partner: swPartner,
    contact: swContact
  },
  yo: {
    common: yoCommon,
    nav: yoNav,
    home: yoHome,
    about: yoAbout,
    mission: yoMission,
    leadership: yoLeadership,
    programs: yoPrograms,
    volunteer: yoVolunteer,
    donate: yoDonate,
    partner: yoPartner,
    contact: yoContact
  },
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