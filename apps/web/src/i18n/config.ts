import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import koUi from '../locales/ko.json'
import esUi from '../locales/es.json'
import navKo from '../locales/nav.ko.json'
import navEs from '../locales/nav.es.json'

const STORAGE_KEY = 'nexus_locale'

function readStoredLng(): 'ko' | 'es' {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'es' || v === 'ko') return v
  } catch {
    /* ignore */
  }
  return 'ko'
}

export function persistLocale(lng: 'ko' | 'es') {
  try {
    localStorage.setItem(STORAGE_KEY, lng)
  } catch {
    /* ignore */
  }
}

const initial = readStoredLng()
document.documentElement.lang = initial === 'es' ? 'es' : 'ko'

void i18n.use(initReactI18next).init({
  lng: initial,
  fallbackLng: 'ko',
  supportedLngs: ['ko', 'es'],
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  resources: {
    ko: {
      translation: {
        ...koUi,
        nav: navKo as Record<string, string>,
      },
    },
    es: {
      translation: {
        ...esUi,
        nav: navEs as Record<string, string>,
      },
    },
  },
})

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng === 'es' ? 'es' : 'ko'
  if (lng === 'ko' || lng === 'es') persistLocale(lng)
})

export default i18n
