import { v2 as cloudinary } from "cloudinary";
import cloudinaryClient from "@/lib/cloudinary";
import type { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function validateProductImage(
  file: File
): Promise<{
  success: boolean;
  message?: string;
}> {
  if (!file) {
    return {
      success: false,
      message: "Image file is required.",
    };
  }

  if (
    !ALLOWED_TYPES.includes(
      file.type as (typeof ALLOWED_TYPES)[number]
    )
  ) {
    return {
      success: false,
      message:
        "Only JPG, JPEG, PNG and WEBP images are allowed.",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      message:
        "Image size cannot exceed 10 MB.",
    };
  }

  return {
    success: true,
  };
}

export async function saveProductImage(
  productId: string,
  file: File
): Promise<{
  imageUrl: string;
  publicId: string;
}> {
  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const uploadStream =
      cloudinaryClient.uploader.upload_stream(
        {
          folder: "industrial-automation/products",

          public_id: `product-${productId}-${Date.now()}`,

          overwrite: false,

          resource_type: "image",
        },
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined
        ) => {
          if (error || !result) {
            reject(
              new Error("Failed to upload image.")
            );
            return;
          }

          resolve({
            imageUrl: result.secure_url,
            publicId: result.public_id,
          });
        }
      );

    uploadStream.end(buffer);
  });
}

export async function deleteProductImageFromCloudinary(
  publicId: string
) {
  if (!publicId) return;

  await cloudinaryClient.uploader.destroy(
    publicId,
    {
      resource_type: "image",
    }
  );
}