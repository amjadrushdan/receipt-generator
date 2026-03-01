import ServiceReceipt from './ServiceReceipt.jsx'

// Registry: receipt type string → layout component
// To add a new receipt type: create a new component and add an entry here
export const receiptTypeComponents = {
  service: ServiceReceipt,
  // transport: TransportReceipt,  // future
  // retail: RetailReceipt,        // future
}
