export default function CustomerSection({ data, receiptNumber, date, onChange, t }) {
  const field = (key) => (e) => onChange(`customer.${key}`, e.target.value)

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        {t.customerDetails}
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">{t.receiptNo}</label>
          <input
            type="text"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white transition"
            value={receiptNumber}
            onChange={(e) => onChange('receiptNumber', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">{t.date}</label>
          <input
            type="date"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white transition"
            value={date}
            onChange={(e) => onChange('date', e.target.value)}
          />
        </div>
      </div>
      <Input label={t.customerName} value={data.name} onChange={field('name')} placeholder="e.g. Ahmad bin Ali" />
      <div className="grid grid-cols-2 gap-3">
        <Input label={t.customerPhone} value={data.phone} onChange={field('phone')} placeholder="01X-XXXXXXX" type="tel" />
        <Input label={t.customerEmail} value={data.email} onChange={field('email')} placeholder="email@domain.com" type="email" />
      </div>
      <Input label={t.customerAddress} value={data.address} onChange={field('address')} placeholder="Alamat pelanggan..." multiline />
    </div>
  )
}

function Input({ label, value, onChange, placeholder, type = 'text', multiline = false }) {
  const base = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white transition'
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      {multiline ? (
        <textarea
          className={`${base} resize-none`}
          rows={2}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          className={base}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  )
}
