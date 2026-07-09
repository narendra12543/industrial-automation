import { render } from "@react-email/render";

import { resend } from "@/lib/resend";
import { EnquiryConfirmationTemplate } from "@/emails/enquiry-confirmation";

interface SendCustomerEmailProps {
  customerEmail: string;
  customerName: string;
  productName: string;
  categoryName?: string;
  pdfBuffer: Uint8Array;
}

export async function sendCustomerEmail({
  customerEmail,
  customerName,
  productName,
  categoryName,
  pdfBuffer,
}: SendCustomerEmailProps) {
  try {
    console.log("Sending customer email to:", customerEmail);

    const html = await render(
      EnquiryConfirmationTemplate({
        customerName,
        productName,
        categoryName,
      })
    );

    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL!,

      to: customerEmail,

      subject: `Enquiry Received - ${productName}`,

      html,

      attachments: [
        {
          filename: `${productName}.pdf`,
          content: Buffer.from(pdfBuffer),
        },
      ],
    });

    console.log("CUSTOMER EMAIL RESULT:");
    console.log(result);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("CUSTOMER EMAIL ERROR:");
    console.error(error);

    return {
      success: false,
    };
  }
}