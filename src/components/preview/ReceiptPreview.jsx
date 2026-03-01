import { receiptTypeComponents } from './receipt-types/index.js'

export default function ReceiptPreview({ receiptData, computed, lang, t }) {
  const Component = receiptTypeComponents[receiptData.receiptType] ?? receiptTypeComponents['service']

  return (
    <div
      id="receipt-preview"
      className="bg-white rounded-xl shadow-md p-6 md:p-8 min-h-[500px]"
    >
      <Component data={receiptData} computed={computed} lang={lang} t={t} />
    </div>
  )
}
