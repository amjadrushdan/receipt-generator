export function formatRM(amount) {
  const num = Number(amount)
  if (isNaN(num)) return 'RM 0.00'
  return `RM ${num.toFixed(2)}`
}
