import { z } from "zod";

export const createContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  mobile: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit mobile number."
    ),

  companyName: z
    .string()
    .trim()
    .min(2, "Company name is required.")
    .max(150, "Company name cannot exceed 150 characters."),

  categoryId: z
    .string()
    .optional()
    .or(z.literal("")),

  productIds: z
    .array(z.string())
    .min(1, "Please select at least one product."),

  otherProductName: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),

  city: z
    .string()
    .trim()
    .min(2, "City is required.")
    .max(150, "City cannot exceed 150 characters."),

  message: z
    .string()
    .trim()
    .max(2000, "Message cannot exceed 2000 characters.")
    .optional()
    .or(z.literal("")),
});

export type CreateContactInput =
  z.infer<typeof createContactSchema>;