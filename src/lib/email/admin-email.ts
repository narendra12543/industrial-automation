import { resend } from "@/lib/resend";

interface SendAdminEmailProps {
  customerName: string;
  customerEmail: string;
  mobile: string;
  productName: string;
  quantity: number;
  message?: string | null;
}

export async function sendAdminEmail({
  customerName,
  customerEmail,
  mobile,
  productName,
  quantity,
  message,
}: SendAdminEmailProps) {
  try {
    const result =
      await resend.emails.send({
        from:
          process.env.FROM_EMAIL!,

        to: [
          process.env.BUSINESS_EMAIL!,
          process.env.BUSINESS_EMAIL_2!,
        ],
       subject: `New Product Enquiry | ${customerName} | ${productName}`,

       replyTo: customerEmail,

        html: `
          <div style="font-family:Arial,sans-serif">
            
            <h2>
              New Lead Received
            </h2>

            <hr />

            <p>
              <strong>Customer:</strong>
              ${customerName}
            </p>

            <p>
              <strong>Email:</strong>
              ${customerEmail}
            </p>

            <p>
              <strong>Mobile:</strong>
              ${mobile}
            </p>

            <p>
              <strong>Product:</strong>
              ${productName}
            </p>

            <p>
              <strong>Quantity:</strong>
              ${quantity}
            </p>

            <p>
              <strong>Message:</strong>
              ${message ?? "-"}
            </p>

           

          </div>
        `,
      });

    console.log("SEND RESULT:", result);

      if (result.data?.id) {
        const details = await resend.emails.get(result.data.id);

        console.log(
          "EMAIL DETAILS:",
          JSON.stringify(details, null, 2)
        );
      }
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error(
      "Admin Email Error:",
      error
    );

    return {
      success: false,
    };
  }
}
