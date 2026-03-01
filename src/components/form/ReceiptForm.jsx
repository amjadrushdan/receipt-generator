import BusinessSection from './BusinessSection.jsx'
import CustomerSection from './CustomerSection.jsx'
import ItemsSection from './ItemsSection.jsx'
import SummarySection from './SummarySection.jsx'

export default function ReceiptForm({ receiptData, computed, onChange, onAddItem, onRemoveItem, onUpdateItem, t }) {
  return (
    <div className="space-y-6">
      <BusinessSection
        data={receiptData.business}
        onChange={onChange}
        t={t}
      />
      <div className="border-t border-gray-200" />
      <CustomerSection
        data={receiptData.customer}
        receiptNumber={receiptData.receiptNumber}
        date={receiptData.date}
        onChange={onChange}
        t={t}
      />
      <div className="border-t border-gray-200" />
      <ItemsSection
        items={receiptData.items}
        onAdd={onAddItem}
        onRemove={onRemoveItem}
        onUpdate={onUpdateItem}
        t={t}
      />
      <div className="border-t border-gray-200" />
      <SummarySection
        data={receiptData}
        computed={computed}
        onChange={onChange}
        t={t}
      />
    </div>
  )
}
