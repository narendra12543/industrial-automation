import { z } from "zod";

export const createContactSchema =
  z.object({
    name: z.string().min(2),
    email: z.email(),
    mobile: z.string().min(10),

    companyName: z.string().optional(),
    categoryId: z.string().optional(),
    productIds: z
      .array(z.string())
      .min(1, "Please select product."),
    otherProductName: z.string().optional(),

    city: z.string().optional(),
    message: z.string().min(10),
    
  });

export type CreateContactInput =
  z.infer<typeof createContactSchema>;