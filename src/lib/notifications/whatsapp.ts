interface CustomerWhatsappProps {
  customerName: string;
  productName: string;
}

interface BusinessWhatsappProps {
  customerName: string;
  mobile: string;
  productName: string;
  quantity: number;
}

export function generateCustomerWhatsappMessage({
  customerName,
  productName,
}: CustomerWhatsappProps) {
  return `
Hello ${customerName},

Thank you for your enquiry.

We have received your request for:

${productName}

Our team will contact you shortly.

Regards,
Aven Industrial automation
`;
}

export function generateBusinessWhatsappMessage({
  customerName,
  mobile,
  productName,
  quantity,
}: BusinessWhatsappProps) {
  return `
New Lead Received

Customer: ${customerName}

Mobile: ${mobile}

Product: ${productName}

Quantity: ${quantity}

Please follow up with customer.
`;
}