export default function LanguageToggle({ lang, onToggle, t }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="no-print flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-300 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition"
      title="Toggle language / Tukar bahasa"
    >
      <span className={lang === 'en' ? 'text-blue-600 font-bold' : 'text-gray-400'}>EN</span>
      <span className="text-gray-300">|</span>
      <span className={lang === 'bm' ? 'text-blue-600 font-bold' : 'text-gray-400'}>BM</span>
    </button>
  )
}
