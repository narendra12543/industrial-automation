"use server";

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

export async function createContact(data: {
  name: string;
  email: string;
  mobile: string;
  companyName?: string;
  categoryId?: string;
  productIds: string[];
  otherProductName?: string;
  city?: string;
  message: string;
}) {
  try {
    console.log("Saving Contact...");

    await prisma.contactMessage.create({
      data,
    });

    console.log("Contact Saved Successfully");
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: data.productIds.filter(
            (id) => id !== "other"
          ),
        },
      },
      select: {
        name: true,
      },
    });

    const productNames = products
      .map((product) => product.name)
      .join(", ");

    // Customer Email

    console.log("Sending Customer Email...");

    const customerEmailResponse =
      await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: data.email,
        subject: "Thank You For Contacting Us",
        html: `
          <div style="font-family:Arial,sans-serif">
            <h2>Thank You ${data.name}</h2>

            <p>
              We have received your message.
            </p>

            <p>
              Our automation team will
              contact you shortly.
            </p>

            <br/>

            <p>
              Regards,<br/>
              Industrial Automation Solutions
            </p>
          </div>
        `,
      });

    console.log(
      "Customer Email Response:",
      customerEmailResponse
    );

    // Business Email

    console.log("Sending Business Email...");

    const businessEmailResponse =
      await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: process.env.BUSINESS_EMAIL!,
        subject: "New Contact Form Submission",
        html: `
          <div style="font-family:Arial,sans-serif">

            <h2>
              New Contact Message
            </h2>

            <hr/>

            <p>
              <strong>Name:</strong>
              ${data.name}
            </p>

            <p>
              <strong>Email:</strong>
              ${data.email}
            </p>

            <p>
              <strong>Mobile:</strong>
              ${data.mobile}
            </p>

            <p>
              <strong>Company:</strong>
              ${data.companyName ?? "-"}
            </p>

            <p>
              <strong>Products:</strong>
              ${productNames || "-"}
            </p>

            ${
              data.otherProductName
                ? `
            <p>
              <strong>Other Product:</strong>
              ${data.otherProductName}
            </p>
            `
                : ""
            }

            <p>
              <strong>City:</strong>
              ${data.city ?? "-"}
            </p>

            <p>
              <strong>Message:</strong>
              ${data.message}
            </p>

          </div>
        `,
      });

    console.log(
      "Business Email Response:",
      businessEmailResponse
    );

    return {
      success: true,
      message:
        "Message submitted successfully.",
    };
  } catch (error) {
    console.error(
      "Create Contact Error:",
      error
    );

    return {
      success: false,
      message:
        "Failed to submit message.",
    };
  }
}