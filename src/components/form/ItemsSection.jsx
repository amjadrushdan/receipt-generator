import { formatRM } from '../../utils/currency.js'

export default function ItemsSection({ items, onAdd, onRemove, onUpdate, t }) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        {t.itemsTitle}
      </h2>

      <div className="space-y-2">
        {items.map((item, index) => (
          <ItemRow
            key={item.id}
            item={item}
            index={index}
            onUpdate={onUpdate}
            onRemove={onRemove}
            canRemove={items.length > 1}
            t={t}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="w-full border-2 border-dashed border-blue-300 text-blue-500 rounded-lg py-2 text-sm font-medium hover:border-blue-400 hover:bg-blue-50 transition"
      >
        {t.addItem}
      </button>
    </div>
  )
}

function ItemRow({ item, index, onUpdate, onRemove, canRemove, t }) {
  const qty = Number(item.quantity) || 0
  const price = Number(item.unitPrice) || 0
  const lineTotal = qty * price

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 font-medium">#{index + 1}</span>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="text-xs text-red-400 hover:text-red-600 transition"
          >
            {t.remove}
          </button>
        )}
      </div>

      <input
        type="text"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
        placeholder={t.description}
        value={item.description}
        onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
      />

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-xs text-gray-400 mb-1">{t.qty}</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition text-right"
            value={item.quantity}
            onChange={(e) => onUpdate(item.id, 'quantity', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">{t.unitPrice}</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition text-right"
            value={item.unitPrice}
            onChange={(e) => onUpdate(item.id, 'unitPrice', e.target.value)}
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">{t.lineTotal}</label>
          <div className="w-full border border-gray-100 bg-gray-50 rounded-lg px-3 py-2 text-sm text-right text-gray-600">
            {formatRM(lineTotal)}
          </div>
        </div>
      </div>
    </div>
  )
}
