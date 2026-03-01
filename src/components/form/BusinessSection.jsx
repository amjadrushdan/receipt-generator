export default function BusinessSection({ data, onChange, t }) {
  const field = (key) => (e) => onChange(`business.${key}`, e.target.value)

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        {t.businessDetails}
      </h2>
      <Input label={t.businessName} value={data.name} onChange={field('name')} placeholder="e.g. Kedai Servis Jaya" />
      <Input label={t.businessAddress} value={data.address} onChange={field('address')} placeholder="No. 1, Jalan Maju..." multiline />
      <div className="grid grid-cols-2 gap-3">
        <Input label={t.businessPhone} value={data.phone} onChange={field('phone')} placeholder="01X-XXXXXXX" type="tel" />
        <Input label={t.businessEmail} value={data.email} onChange={field('email')} placeholder="email@domain.com" type="email" />
      </div>
      <Input label={t.regNo} value={data.registrationNo} onChange={field('registrationNo')} placeholder="e.g. 202301012345" />
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
