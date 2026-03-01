import { useState } from 'react'
import { useReceiptState } from './hooks/useReceiptState.js'
import { useTranslation } from './i18n/index.js'
import ReceiptForm from './components/form/ReceiptForm.jsx'
import ReceiptPreview from './components/preview/ReceiptPreview.jsx'
import LanguageToggle from './components/ui/LanguageToggle.jsx'
import PrintButton from './components/ui/PrintButton.jsx'

export default function App() {
  const [lang, setLang] = useState('en')
  const [previewOpen, setPreviewOpen] = useState(false)
  const t = useTranslation(lang)
  const { receiptData, computed, updateField, addItem, removeItem, updateItem } = useReceiptState()

  function toggleLang() {
    setLang(l => (l === 'en' ? 'bm' : 'en'))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="no-print bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h1 className="font-bold text-gray-800 text-base">{t.appTitle}</h1>
          </div>
          <LanguageToggle lang={lang} onToggle={toggleLang} t={t} />
        </div>
      </header>

      {/* Main layout */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">

          {/* Form panel */}
          <div className="no-print w-full md:w-1/2">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <ReceiptForm
                receiptData={receiptData}
                computed={computed}
                onChange={updateField}
                onAddItem={addItem}
                onRemoveItem={removeItem}
                onUpdateItem={updateItem}
                t={t}
              />
            </div>
          </div>

          {/* Preview panel */}
          <div className="w-full md:w-1/2">
            {/* Mobile: collapsible preview toggle */}
            <div className="no-print md:hidden mb-3">
              <button
                type="button"
                onClick={() => setPreviewOpen(o => !o)}
                className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-sm font-medium text-gray-600 flex items-center justify-between shadow-sm"
              >
                <span>👁 {previewOpen ? 'Hide Preview' : 'Show Preview'}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${previewOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Preview — always visible on desktop, toggle on mobile */}
            <div className={`md:block ${previewOpen ? 'block' : 'hidden'}`}>
              <ReceiptPreview
                receiptData={receiptData}
                computed={computed}
                lang={lang}
                t={t}
              />
            </div>

            {/* Print button — sticky on mobile, normal on desktop */}
            <div className="no-print mt-4 md:mt-4 sticky bottom-4 md:static">
              <PrintButton t={t} />
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="no-print text-center text-xs text-gray-400 py-6">
        {t.appTitle} &mdash; Free &amp; No login required
      </footer>
    </div>
  )
}
