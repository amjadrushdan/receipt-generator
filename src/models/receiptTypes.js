import { v4 as uuidv4 } from 'uuid'
import { generateReceiptNumber } from '../utils/receiptNumber.js'

export const receiptTypeConfig = {
  service: {
    label: { en: 'Service Invoice', bm: 'Invois Perkhidmatan' },
    showFields: {
      registrationNo: true,
      customerAddress: true,
      paymentMethod: true,
      notes: true,
    },
    itemDescriptionLabel: { en: 'Service Description', bm: 'Keterangan Perkhidmatan' },
  },
  // Future receipt types — add entry here + new component in receipt-types/
  // transport: { ... }
  // retail: { ... }
  // medical: { ... }
}

export function createDefaultReceiptData() {
  return {
    receiptType: 'service',
    receiptNumber: generateReceiptNumber(),
    date: new Date().toISOString().slice(0, 10),

    business: {
      name: '',
      address: '',
      phone: '',
      email: '',
      registrationNo: '',
      logoUrl: '',
    },

    customer: {
      name: '',
      phone: '',
      email: '',
      address: '',
    },

    items: [
      { id: uuidv4(), description: '', quantity: 1, unitPrice: '', lineTotal: 0 },
    ],

    discountType: 'none',   // 'none' | 'flat' | 'percent'
    discountValue: '',

    // SST fields — reserved, not shown in UI yet
    sstRate: 0,

    paymentMethod: '',
    notes: '',
  }
}
