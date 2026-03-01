import { formatRM } from '../../utils/currency.js'

export default function SummarySection({ data, computed, onChange, t }) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        {t.subtotal}
      </h2>

      {/* Subtotal display */}
      <div className="flex justify-between text-sm py-1 border-b border-gray-100">
        <span className="text-gray-500">{t.subtotal}</span>
        <span className="font-medium">{formatRM(computed.subtotal)}</span>
      </div>

      {/* Discount */}
      <div className="space-y-2">
        <div>
          <label className="block text-xs text-gray-500 mb-1">{t.discount}</label>
          <select
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white transition"
            value={data.discountType}
            onChange={(e) => onChange('discountType', e.target.value)}
          >
            <option value="none">{t.discountNone}</option>
            <option value="flat">{t.discountFlat}</option>
            <option value="percent">{t.discountPercent}</option>
          </select>
        </div>

        {data.discountType !== 'none' && (
          <input
            type="number"
            min="0"
            step="0.01"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition text-right"
            value={data.discountValue}
            onChange={(e) => onChange('discountValue', e.target.value)}
            placeholder={data.discountType === 'percent' ? '0' : '0.00'}
          />
        )}

        {data.discountType !== 'none' && computed.discountAmount > 0 && (
          <div className="flex justify-between text-sm text-red-500">
            <span>- {t.discountAmount}</span>
            <span>- {formatRM(computed.discountAmount)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center bg-blue-600 text-white rounded-lg px-4 py-3">
        <span className="font-bold text-sm">{t.total}</span>
        <span className="font-bold text-lg">{formatRM(computed.total)}</span>
      </div>

      {/* Payment method */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">{t.paymentMethod}</label>
        <select
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white transition"
          value={data.paymentMethod}
          onChange={(e) => onChange('paymentMethod', e.target.value)}
        >
          <option value="">—</option>
          <option value="Cash">{t.paymentCash}</option>
          <option value="DuitNow">{t.paymentDuitNow}</option>
          <option value="TnG">{t.paymentTnG}</option>
          <option value="Online Transfer">{t.paymentTransfer}</option>
          <option value="Other">{t.paymentOther}</option>
        </select>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">{t.notes}</label>
        <textarea
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition resize-none bg-white"
          rows={3}
          value={data.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder="e.g. Payment due upon receipt / Bayaran perlu dibuat segera"
        />
      </div>
    </div>
  )
}
