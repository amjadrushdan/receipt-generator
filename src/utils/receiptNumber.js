export function generateReceiptNumber() {
  const today = new Date()
  const datePart = today.toISOString().slice(0, 10).replace(/-/g, '')
  const stored = localStorage.getItem('rcpSeq')
  const seq = (parseInt(stored || '0') + 1).toString().padStart(3, '0')
  localStorage.setItem('rcpSeq', seq)
  return `RCP-${datePart}-${seq}`
}
