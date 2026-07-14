"use server";

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { CustomerContactTemplate } from "@/emails/customer-contact-template";
import { ContactMessage } from "@prisma/client";
import { appendToSheet } from "@/lib/google-sheet";

export type ContactMessageWithProducts = ContactMessage & {
  productNames: string;
};

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
          in: data.productIds.filter((id) => id !== "other"),
        },
      },
      select: {
        name: true,
      },
    });

    const productNames = products.map((product) => product.name).join(", ");

    // Customer Email

    console.log("Sending Customer Email...");

    const customerEmailResponse = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: data.email,
      subject: "Thank You for Contacting Aven Automation",
      react: CustomerContactTemplate({
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        company: data.companyName,
        city: data.city,
        products: productNames || data.otherProductName || "-",
        message: data.message,
      }),
    });

    console.log(
      "Customer Email Response:",
      customerEmailResponse
    );

    // Business Email

    console.log("Sending Business Email...");

    const businessEmailResponse = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: [
        process.env.BUSINESS_EMAIL!,
        process.env.BUSINESS_EMAIL_2!,
      ],
      subject: `New Contact | ${data.name}`,

     replyTo: data.email,
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

    console.log("Business Email Response:", businessEmailResponse);

      if (businessEmailResponse.data?.id) {
        const details = await resend.emails.get(
          businessEmailResponse.data.id
        );

        console.log(
          "EMAIL DETAILS:",
          JSON.stringify(details, null, 2)
        );
      }

    console.log(
      "Business Email Response:",
      businessEmailResponse
    );

    try {
      console.log("Google Sheet Started");
      await appendToSheet(
        process.env.GOOGLE_CONTACT_SHEET!,
        [
          new Date().toLocaleString("en-IN"),
          data.name,
          data.email,
          data.mobile,
          data.companyName ?? "",
          data.city ?? "",
          productNames || "",
          data.otherProductName ?? "",
          data.message,
        ]
      );
      console.log("Google Sheet Success");
      
    } catch (error) {
      console.error("Google Sheet Contact Error:", error);
    }
    return {
      success: true,
      message: "Message submitted successfully.",
    };
  } catch (error) {
    console.error("Create Contact Error:", error);

    return {
      success: false,
      message: "Failed to submit message.",
    };
  }
}

interface GetContactMessagesParams {
  search?: string;
  page?: number;
  limit?: number;
}

export async function getContactMessages({
  search = "",
  page = 1,
  limit = 10,
}: GetContactMessagesParams): Promise<{
  messages: ContactMessageWithProducts[];
  totalCount: number;
  totalPages: number;
}> {
  try {
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
            { mobile: { contains: search, mode: "insensitive" as const } },
            {
              companyName: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            { city: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const totalCount = await prisma.contactMessage.count({ where });

    const totalPages = Math.ceil(totalCount / limit);

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    const allProductIds: string[] = messages.flatMap(
      (message) => (message.productIds as string[]) ?? []
    );

    const products = allProductIds.length
      ? await prisma.product.findMany({
          where: {
            id: {
              in: allProductIds,
            },
          },
          select: {
            id: true,
            name: true,
          },
        })
      : [];

    const productMap = new Map(
      products.map((product) => [product.id, product.name])
    );

    const enrichedMessages = messages.map((message) => ({
      ...message,
      productNames: ((message.productIds as string[]) ?? [])
        .map((id) => productMap.get(id))
        .filter((name): name is string => Boolean(name))
        .join(", "),
    }));

    return {
      messages: enrichedMessages,
      totalCount,
      totalPages,
    };
  } catch (error) {
    console.error("Get Contact Messages Error:", error);

    return {
      messages: [],
      totalCount: 0,
      totalPages: 0,
    };
  }
}

export async function getRecentContactMessages(limitCount = 5) {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: limitCount,
    });

    return messages;
  } catch (error) {
    console.error("Get Recent Contact Messages Error:", error);

    return [];
  }
}

export async function getContactMessageStats() {
  try {
    const totalMessages = await prisma.contactMessage.count();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todayMessages = await prisma.contactMessage.count({
      where: {
        createdAt: {
          gte: startOfToday,
        },
      },
    });

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    const weekMessages = await prisma.contactMessage.count({
      where: {
        createdAt: {
          gte: startOfWeek,
        },
      },
    });

    return {
      totalMessages,
      todayMessages,
      weekMessages,
    };
  } catch (error) {
    console.error("Get Contact Message Stats Error:", error);

    return {
      totalMessages: 0,
      todayMessages: 0,
      weekMessages: 0,
    };
  }
}