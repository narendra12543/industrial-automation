"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import {
  createEnquirySchema,
  updateEnquiryStatusSchema,
  type CreateEnquiryInput,
  type UpdateEnquiryStatusInput,
} from "@/validations/enquiry";


import { generateProductPdf } from "@/lib/pdf/product-pdf";

import { sendCustomerEmail } from "@/lib/email/customer-email";

import { sendAdminEmail } from "@/lib/email/admin-email";

import {
  generateCustomerWhatsappMessage,
  generateBusinessWhatsappMessage,
} from "@/lib/notifications/whatsapp";


import { Prisma } from "@prisma/client";

type ActionResponse = {
  success: boolean;
  message: string;
};

export async function createEnquiry(
  input: CreateEnquiryInput
): Promise<ActionResponse> {
  try {
    const validatedData =
      createEnquirySchema.safeParse(input);

    if (!validatedData.success) {
      return {
        success: false,
        message:
          validatedData.error.issues[0]?.message ??
          "Invalid enquiry data.",
      };
    }

    const session = await auth();
    if (!session?.user) {
      return {
        success: false,
        message: "Please login to submit enquiry.",
      };
    }

    const userId =
      session?.user?.id ?? null;

    const {
      productId,
      name,
      email,
      mobile,
      quantity,
      city,
      message,
    } = validatedData.data;

    const product =
    await prisma.product.findUnique({
        where: {
        id: productId,
        },

        include: {
        category: true,
        },
    });

    if (!product) {
      return {
        success: false,
        message: "Product not found.",
      };
    }

    await prisma.enquiry.create({
      data: {
        userId,
        productId,
        name,
        email,
        mobile,
        quantity,
        city:
          city?.trim() || null,
        message:
          message?.trim() || null,
        status: "NEW",
      },
    });

    try {
        const pdf =
        await generateProductPdf({
          productName:
            product.name,

          categoryName:
            product.category?.name ??
            "N/A",

          shortDescription:
            product.shortDescription ??
            "",

          description:
            product.description ??
            "",

          specifications:
            JSON.stringify(
              product.specifications ?? {}
            ),

          features:
            JSON.stringify(
              product.features ?? []
            ),

          applications:
            JSON.stringify(
              product.applications ?? []
            ),
        });

await sendCustomerEmail({
  customerEmail:
    email,

  customerName:
    name,

  productName:
    product.name,

  pdfBuffer:
    pdf,
});
        await sendAdminEmail({
            customerName:
            name,

            customerEmail:
            email,

            mobile,

            productName:
            product.name,

            quantity,

            message,
        });

        const customerWhatsapp =
            generateCustomerWhatsappMessage({
            customerName:
                name,

            productName:
                product.name,
            });

        const businessWhatsapp =
            generateBusinessWhatsappMessage({
            customerName:
                name,

            mobile,

            productName:
                product.name,

            quantity,
            });

        console.log(
            "Customer WhatsApp:",
            customerWhatsapp
        );

        console.log(
            "Business WhatsApp:",
            businessWhatsapp
        );
        } catch (error) {
        console.error(
            "Lead Automation Error:",
            error
        );
        }
    revalidatePath(
      "/admin/enquiries"
    );

    revalidatePath(
      "/dashboard/enquiries"
    );

    return {
      success: true,
      message:
        "Enquiry submitted successfully.",
    };
  } catch {
    return {
      success: false,
      message:
        "Failed to submit enquiry.",
    };
  }
}


export async function updateEnquiryStatus(
  input: UpdateEnquiryStatusInput
): Promise<ActionResponse> {
  try {
    const validatedData =
      updateEnquiryStatusSchema.safeParse(
        input
      );

    if (!validatedData.success) {
      return {
        success: false,
        message:
          validatedData.error.issues[0]
            ?.message ??
          "Invalid status data.",
      };
    }

    const {
      id,
      status,
    } = validatedData.data;

    const enquiry =
      await prisma.enquiry.findUnique({
        where: {
          id,
        },
      });

    if (!enquiry) {
      return {
        success: false,
        message:
          "Enquiry not found.",
      };
    }

    await prisma.enquiry.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    revalidatePath(
      "/admin/enquiries"
    );

    revalidatePath(
      `/admin/enquiries/${id}`
    );

    return {
      success: true,
      message:
        "Enquiry status updated successfully.",
    };
  } catch {
    return {
      success: false,
      message:
        "Failed to update enquiry status.",
    };
  }
}

export async function getEnquiries({
  search = "",
  status,
  page = 1,
  limit = 10,
}: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  try {
    const where: Prisma.EnquiryWhereInput = {};
    if (
  status &&
  status !== "ALL"
) {
  where.status = status as never;
}

if (search) {
  where.OR = [
    {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    {
      email: {
        contains: search,
        mode: "insensitive",
      },
    },
    {
      mobile: {
        contains: search,
        mode: "insensitive",
      },
    },
    {
      product: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    },
  ];
}
    const totalCount =
      await prisma.enquiry.count({
        where,
      });

    const enquiries =
      await prisma.enquiry.findMany({
        where,

        include: {
          user: true,

          product: true,
        },

        orderBy: {
          createdAt:
            "desc",
        },

        skip:
          (page - 1) *
          limit,

        take: limit,
      });

    return {
      enquiries,

      totalCount,

      totalPages:
        Math.ceil(
          totalCount /
            limit
        ),
    };
  } catch {
    return {
      enquiries: [],

      totalCount: 0,

      totalPages: 0,
    };
  }
}

export async function getEnquiryById(
  id: string
) {
  try {
    if (!id) {
      return null;
    }

    return await prisma.enquiry.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        product: {
          include: {
            category: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
}

export async function getUserEnquiries(
  userId: string
) {
  try {
    if (!userId) {
      return [];
    }

    return await prisma.enquiry.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch {
    return [];
  }
}

export async function deleteEnquiry(
  id: string
): Promise<ActionResponse> {
  try {
    if (!id) {
      return {
        success: false,
        message:
          "Enquiry ID is required.",
      };
    }

    const enquiry =
      await prisma.enquiry.findUnique({
        where: {
          id,
        },
      });

    if (!enquiry) {
      return {
        success: false,
        message:
          "Enquiry not found.",
      };
    }

    await prisma.enquiry.delete({
      where: {
        id,
      },
    });

    revalidatePath(
      "/admin/enquiries"
    );

    return {
      success: true,
      message:
        "Enquiry deleted successfully.",
    };
  } catch {
    return {
      success: false,
      message:
        "Failed to delete enquiry.",
    };
  }
}

export async function getEnquiryStats() {
  try {
    const [
      totalEnquiries,
      newEnquiries,
      contactedEnquiries,
      quotationSent,
      negotiation,
      won,
      lost,
    ] = await Promise.all([
      prisma.enquiry.count(),

      prisma.enquiry.count({
        where: {
          status: "NEW",
        },
      }),

      prisma.enquiry.count({
        where: {
          status: "CONTACTED",
        },
      }),

      prisma.enquiry.count({
        where: {
          status:
            "QUOTATION_SENT",
        },
      }),

      prisma.enquiry.count({
        where: {
          status:
            "NEGOTIATION",
        },
      }),

      prisma.enquiry.count({
        where: {
          status: "WON",
        },
      }),

      prisma.enquiry.count({
        where: {
          status: "LOST",
        },
      }),
    ]);

    return {
      totalEnquiries,
      newEnquiries,
      contactedEnquiries,
      quotationSent,
      negotiation,
      won,
      lost,
    };
  } catch {
    return {
      totalEnquiries: 0,
      newEnquiries: 0,
      contactedEnquiries: 0,
      quotationSent: 0,
      negotiation: 0,
      won: 0,
      lost: 0,
    };
  }
}   


export async function getFilteredEnquiryStats({
  search = "",
  status,
}: {
  search?: string;
  status?: string;
}) {
  try {
    const where: Prisma.EnquiryWhereInput = {};

    if (
      status &&
      status !== "ALL"
    ) {
      where.status = status as never;
    }

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          mobile: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const enquiries =
      await prisma.enquiry.findMany({
        where,
      });

    return {
      totalEnquiries:
        enquiries.length,

      newEnquiries:
        enquiries.filter(
          (e) => e.status === "NEW"
        ).length,

      contactedEnquiries:
        enquiries.filter(
          (e) =>
            e.status ===
            "CONTACTED"
        ).length,

      quotationSent:
        enquiries.filter(
          (e) =>
            e.status ===
            "QUOTATION_SENT"
        ).length,

      negotiation:
        enquiries.filter(
          (e) =>
            e.status ===
            "NEGOTIATION"
        ).length,

      won:
        enquiries.filter(
          (e) => e.status === "WON"
        ).length,

      lost:
        enquiries.filter(
          (e) => e.status === "LOST"
        ).length,
    };
  } catch {
    return {
      totalEnquiries: 0,
      newEnquiries: 0,
      contactedEnquiries: 0,
      quotationSent: 0,
      negotiation: 0,
      won: 0,
      lost: 0,
    };
  }
}

export async function getEnquiryAnalytics() {
  try {
    const now = new Date();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const weekStart = new Date();
    weekStart.setDate(
      weekStart.getDate() - 7
    );

    const monthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const [
      totalEnquiries,
      todayEnquiries,
      thisWeekEnquiries,
      thisMonthEnquiries,
      newEnquiries,
      contactedEnquiries,
      quotationSentEnquiries,
      negotiationEnquiries,
      wonEnquiries,
      lostEnquiries,
    ] = await Promise.all([
      prisma.enquiry.count(),

      prisma.enquiry.count({
        where: {
          createdAt: {
            gte: todayStart,
          },
        },
      }),

      prisma.enquiry.count({
        where: {
          createdAt: {
            gte: weekStart,
          },
        },
      }),

      prisma.enquiry.count({
        where: {
          createdAt: {
            gte: monthStart,
          },
        },
      }),

      prisma.enquiry.count({
        where: {
          status: "NEW",
        },
      }),

      prisma.enquiry.count({
        where: {
          status: "CONTACTED",
        },
      }),

      prisma.enquiry.count({
        where: {
          status:
            "QUOTATION_SENT",
        },
      }),

      prisma.enquiry.count({
        where: {
          status:
            "NEGOTIATION",
        },
      }),

      prisma.enquiry.count({
        where: {
          status: "WON",
        },
      }),

      prisma.enquiry.count({
        where: {
          status: "LOST",
        },
      }),
    ]);

    const conversionRate =
      totalEnquiries > 0
        ? (
            (wonEnquiries /
              totalEnquiries) *
            100
          ).toFixed(2)
        : "0.00";

    return {
      totalEnquiries,
      todayEnquiries,
      thisWeekEnquiries,
      thisMonthEnquiries,
      newEnquiries,
      contactedEnquiries,
      quotationSentEnquiries,
      negotiationEnquiries,
      wonEnquiries,
      lostEnquiries,
      conversionRate,
    };
  } catch {
    return {
      totalEnquiries: 0,
      todayEnquiries: 0,
      thisWeekEnquiries: 0,
      thisMonthEnquiries: 0,
      newEnquiries: 0,
      contactedEnquiries: 0,
      quotationSentEnquiries: 0,
      negotiationEnquiries: 0,
      wonEnquiries: 0,
      lostEnquiries: 0,
      conversionRate: "0.00",
    };
  }
}

export async function getRecentEnquiries() {
  try {
    return await prisma.enquiry.findMany({
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
  } catch {
    return [];
  }
}