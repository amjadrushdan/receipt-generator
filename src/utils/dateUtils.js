export function formatDate(isoDate, lang) {
  if (!isoDate) return ''
  const date = new Date(isoDate + 'T00:00:00') // avoid UTC offset shifting date
  const locale = lang === 'bm' ? 'ms-MY' : 'en-MY'
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
