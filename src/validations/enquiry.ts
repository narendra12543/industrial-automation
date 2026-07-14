import { z } from "zod";

export const enquiryStatusEnum = z.enum([
  "NEW",
  "CONTACTED",
  "QUOTATION_SENT",
  "NEGOTIATION",
  "WON",
  "LOST",
]);

export const createEnquirySchema = z.object({
  productId: z
    .string()
    .min(
      1,
      "Product is required."
    ),

  name: z
    .string()
    .trim()
    .min(
      2,
      "Name must be at least 2 characters."
    )
    .max(
      150,
      "Name cannot exceed 150 characters."
    ),

  email: z
    .string()
    .trim()
    .email(
      "Valid email address is required."
    ),

 mobile: z
  .string()
  .trim()
  .regex(
    /^[6-9]\d{9}$/,
    "Please enter a valid 10-digit mobile number."
  ),

  quantity: z
    .number()
    .min(
        1,
        "Quantity must be at least 1."
    ),

  city: z
    .string()
    .trim()
    .min(
      2,
      "City is required."
    )
    .max(
      150,
      "City cannot exceed 150 characters."
    ),

  message: z
    .string()
    .trim()
    .max(
      2000,
      "Message cannot exceed 2000 characters."
    )
    .optional()
    .or(z.literal("")),
});

export const updateEnquiryStatusSchema =
  z.object({
    id: z
      .string()
      .min(
        1,
        "Enquiry ID is required."
      ),

    status:
      enquiryStatusEnum,
  });

export const enquirySearchSchema =
  z.object({
    search: z
      .string()
      .trim()
      .optional(),

    status:
      enquiryStatusEnum.optional(),

    page: z
      .number()
      .int()
      .min(
        1,
        "Page must be at least 1."
      )
      .optional(),

    limit: z
      .number()
      .int()
      .min(
        1,
        "Limit must be at least 1."
      )
      .max(
        100,
        "Limit cannot exceed 100."
      )
      .optional(),
  });

export type CreateEnquiryInput =
  z.infer<
    typeof createEnquirySchema
  >;

export type UpdateEnquiryStatusInput =
  z.infer<
    typeof updateEnquiryStatusSchema
  >;

export type EnquirySearchInput =
  z.infer<
    typeof enquirySearchSchema
  >;