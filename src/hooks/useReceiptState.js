import { useState, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { createDefaultReceiptData } from '../models/receiptTypes.js'

function setNestedValue(obj, path, value) {
  const keys = path.split('.')
  const result = { ...obj }
  let current = result
  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...current[keys[i]] }
    current = current[keys[i]]
  }
  current[keys[keys.length - 1]] = value
  return result
}

export function useReceiptState() {
  const [receiptData, setReceiptData] = useState(createDefaultReceiptData)

  const computed = useMemo(() => {
    const subtotal = receiptData.items.reduce((sum, item) => {
      const qty = Number(item.quantity) || 0
      const price = Number(item.unitPrice) || 0
      return sum + qty * price
    }, 0)

    let discountAmount = 0
    const dv = Number(receiptData.discountValue) || 0
    if (receiptData.discountType === 'flat') {
      discountAmount = Math.min(dv, subtotal)
    } else if (receiptData.discountType === 'percent') {
      discountAmount = subtotal * (Math.min(dv, 100) / 100)
    }

    const sstAmount = subtotal * (receiptData.sstRate / 100)
    const total = subtotal - discountAmount + sstAmount

    return { subtotal, discountAmount, sstAmount, total }
  }, [receiptData])

  function updateField(path, value) {
    setReceiptData(prev => setNestedValue(prev, path, value))
  }

  function addItem() {
    setReceiptData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { id: uuidv4(), description: '', quantity: 1, unitPrice: '' },
      ],
    }))
  }

  function removeItem(id) {
    setReceiptData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }))
  }

  function updateItem(id, field, value) {
    setReceiptData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }))
  }

  return {
    receiptData,
    computed,
    updateField,
    addItem,
    removeItem,
    updateItem,
  }
}
