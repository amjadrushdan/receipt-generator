import { en } from './en.js'
import { bm } from './bm.js'

const translations = { en, bm }

export function useTranslation(lang) {
  return translations[lang] ?? translations['en']
}
