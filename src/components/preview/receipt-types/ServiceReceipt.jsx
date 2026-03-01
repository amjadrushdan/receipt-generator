import { formatRM } from '../../../utils/currency.js'
import { formatDate } from '../../../utils/dateUtils.js'

export default function ServiceReceipt({ data, computed, lang, t }) {
  const hasDiscount = data.discountType !== 'none' && computed.discountAmount > 0

  return (
    <div className="font-sans text-gray-800 text-sm">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-gray-800">
        {data.business.logoUrl && (
          <img
            src={data.business.logoUrl}
            alt="logo"
            className="h-12 mx-auto mb-2 object-contain"
          />
        )}
        <h1 className="text-xl font-bold uppercase tracking-widest">
          {data.business.name || '—'}
        </h1>
        {data.business.address && (
          <p className="text-xs text-gray-500 mt-1 whitespace-pre-line">{data.business.address}</p>
        )}
        <div className="flex justify-center gap-4 text-xs text-gray-500 mt-1 flex-wrap">
          {data.business.phone && <span>{data.business.phone}</span>}
          {data.business.email && <span>{data.business.email}</span>}
          {data.business.registrationNo && <span>SSM: {data.business.registrationNo}</span>}
        </div>
      </div>

      {/* Receipt title + metadata */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-bold uppercase tracking-widest text-blue-600">
            {t.invoiceTitle}
          </h2>
          <p className="text-xs text-gray-500">{t.receiptNo}: <span className="font-medium text-gray-700">{data.receiptNumber || '—'}</span></p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">{t.date}</p>
          <p className="font-medium text-gray-700">{formatDate(data.date, lang) || '—'}</p>
        </div>
      </div>

      {/* Billed to */}
      {(data.customer.name || data.customer.phone || data.customer.address) && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">{t.billedTo}</p>
          {data.customer.name && <p className="font-semibold">{data.customer.name}</p>}
          {data.customer.phone && <p className="text-xs text-gray-500">{data.customer.phone}</p>}
          {data.customer.email && <p className="text-xs text-gray-500">{data.customer.email}</p>}
          {data.customer.address && (
            <p className="text-xs text-gray-500 whitespace-pre-line">{data.customer.address}</p>
          )}
        </div>
      )}

      {/* Items table */}
      <table className="w-full mb-4 text-sm">
        <thead>
          <tr className="border-b-2 border-gray-800">
            <th className="text-left py-2 font-semibold">{t.description}</th>
            <th className="text-right py-2 font-semibold w-10">{t.qty}</th>
            <th className="text-right py-2 font-semibold w-24">RM</th>
            <th className="text-right py-2 font-semibold w-24">{t.lineTotal}</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => {
            const qty = Number(item.quantity) || 0
            const price = Number(item.unitPrice) || 0
            const lineTotal = qty * price
            return (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-2 pr-2">{item.description || '—'}</td>
                <td className="py-2 text-right text-gray-600">{qty}</td>
                <td className="py-2 text-right text-gray-600">{formatRM(price)}</td>
                <td className="py-2 text-right font-medium">{formatRM(lineTotal)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Totals */}
      <div className="ml-auto w-64 space-y-1 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">{t.subtotal}</span>
          <span>{formatRM(computed.subtotal)}</span>
        </div>
        {hasDiscount && (
          <div className="flex justify-between text-sm text-red-500">
            <span>- {t.discountAmount}</span>
            <span>- {formatRM(computed.discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-base pt-2 border-t-2 border-gray-800">
          <span>{t.total}</span>
          <span>{formatRM(computed.total)}</span>
        </div>
      </div>

      {/* Payment method */}
      {data.paymentMethod && (
        <div className="text-sm mb-3">
          <span className="text-gray-500">{t.paymentMethod}: </span>
          <span className="font-medium">{data.paymentMethod}</span>
        </div>
      )}

      {/* Notes */}
      {data.notes && (
        <div className="border-t border-gray-200 pt-3 mt-3 text-xs text-gray-500 whitespace-pre-line">
          {data.notes}
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-6 pt-4 border-t border-gray-200 text-xs text-gray-400">
        {t.thankYou}
      </div>
    </div>
  )
}
