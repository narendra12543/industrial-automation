"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  createProductSchema,
  updateProductSchema,
  type CreateProductInput,
  type UpdateProductInput,
} from "@/validations/product";
import {
  validateProductImage,
  saveProductImage,
  deleteProductImageFromCloudinary,
} from "@/lib/uploads/product-image";



type ActionResponse = {
  success: boolean;
  message: string;
};

export async function createProduct(
  input: CreateProductInput
): Promise<ActionResponse> {
  try {
    const validatedData =
      createProductSchema.safeParse(input);

    if (!validatedData.success) {
      return {
        success: false,
        message:
          validatedData.error.issues[0]?.message ??
          "Invalid product data.",
      };
    }

    const {
      categoryId,
      name,
      slug,
      shortDescription,
      description,
      specifications,
      features,
      applications,
      brochureUrl,
      datasheetUrl,
      featured,
      isActive,
    } = validatedData.data;

    const existingName =
      await prisma.product.findFirst({
        where: {
          name,
        },
      });

    if (existingName) {
      return {
        success: false,
        message: "Product name already exists.",
      };
    }

    const existingSlug =
      await prisma.product.findUnique({
        where: {
          slug,
        },
      });

    if (existingSlug) {
      return {
        success: false,
        message: "Product slug already exists.",
      };
    }

    await prisma.product.create({
      data: {
        categoryId,
        name,
        slug,
        shortDescription:
          shortDescription?.trim() || null,
        description:
          description?.trim() || null,
        specifications:
          specifications ??
          Prisma.JsonNull,

        features:
          features ??
          Prisma.JsonNull,

        applications:
          applications ??
          Prisma.JsonNull,
        brochureUrl:
          brochureUrl?.trim() || null,
        datasheetUrl:
          datasheetUrl?.trim() || null,
        featured,
        isActive,
      },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product created successfully.",
    };
  } catch {
    return {
      success: false,
      message:
        "Failed to create product. Please try again.",
    };
  }
}

export async function updateProduct(
  input: UpdateProductInput
): Promise<ActionResponse> {
  try {
    const validatedData =
      updateProductSchema.safeParse(input);

    if (!validatedData.success) {
      return {
        success: false,
        message:
          validatedData.error.issues[0]?.message ??
          "Invalid product data.",
      };
    }

    const {
      id,
      categoryId,
      name,
      slug,
      shortDescription,
      description,
      specifications,
      features,
      applications,
      brochureUrl,
      datasheetUrl,
      featured,
      isActive,
    } = validatedData.data;

    const product =
      await prisma.product.findUnique({
        where: {
          id,
        },
      });

    if (!product) {
      return {
        success: false,
        message: "Product not found.",
      };
    }

    const duplicateName =
      await prisma.product.findFirst({
        where: {
          name,
          NOT: {
            id,
          },
        },
      });

    if (duplicateName) {
      return {
        success: false,
        message: "Product name already exists.",
      };
    }

    const duplicateSlug =
      await prisma.product.findFirst({
        where: {
          slug,
          NOT: {
            id,
          },
        },
      });

    if (duplicateSlug) {
      return {
        success: false,
        message: "Product slug already exists.",
      };
    }

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        categoryId,
        name,
        slug,
        shortDescription:
          shortDescription?.trim() || null,
        description:
          description?.trim() || null,
        specifications:
          specifications ??
          Prisma.JsonNull,
        
        features:
          features ??
          Prisma.JsonNull,

        applications:
          applications ??
          Prisma.JsonNull,
        brochureUrl:
          brochureUrl?.trim() || null,
        datasheetUrl:
          datasheetUrl?.trim() || null,
        featured,
        isActive,
      },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product updated successfully.",
    };
  } catch {
    return {
      success: false,
      message:
        "Failed to update product. Please try again.",
    };
  }
}

export async function deleteProduct(
  id: string
): Promise<ActionResponse> {
  try {
    if (!id) {
      return {
        success: false,
        message: "Product ID is required.",
      };
    }

    const product =
      await prisma.product.findUnique({
        where: {
          id,
        },
      });

    if (!product) {
      return {
        success: false,
        message: "Product not found.",
      };
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product deleted successfully.",
    };
  } catch {
    return {
      success: false,
      message:
        "Failed to delete product. Please try again.",
    };
  }
}

export async function getProducts() {
  try {
    return await prisma.product.findMany({
      include: {
        category: true,
        _count: {
          select: {
            images: true,
            enquiries: true,
            downloads: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch {
    return [];
  }
}

export async function getProductById(
  id: string
) {
  try {
    if (!id) {
      return null;
    }

    return await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });
  } catch {
    return null;
  }
}

export async function getActiveCategories() {
  try {
    return await prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  } catch {
    return [];
  }
}

export type ProductWithRelations = Awaited<
  ReturnType<typeof getProducts>
>[number];

export async function uploadProductImage(
  productId: string,
  file: File
): Promise<{
  success: boolean;
  message: string;
  image?: {
    id: string;
    productId: string;
    imageUrl: string;
    sortOrder: number;
    cloudinaryPublicId: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}> {
  try {
    if (!productId) {
      return {
        success: false,
        message: "Product ID is required.",
      };
    }

    const product =
      await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

    if (!product) {
      return {
        success: false,
        message: "Product not found.",
      };
    }

    const validation =
      await validateProductImage(file);

    if (!validation.success) {
      return {
        success: false,
        message:
          validation.message ??
          "Invalid image.",
      };
    }

    const {
      imageUrl,
      publicId,
    } = await saveProductImage(
      productId,
      file
    );

    const lastImage =
      await prisma.productImage.findFirst({
        where: {
          productId,
        },
        orderBy: {
          sortOrder: "desc",
        },
      });

    const existingPrimary =
      await prisma.productImage.findFirst({
        where: {
          productId,
          isPrimary: true,
        },
      });
    const image =
      await prisma.productImage.create({
        data: {
          productId,
          imageUrl,
          cloudinaryPublicId: publicId,
          sortOrder:
            (lastImage?.sortOrder ?? -1) + 1,
          isPrimary: !existingPrimary,
        },
      });

    revalidatePath(
      `/admin/products/${productId}/images`
    );

    return {
      success: true,
      message:
        "Product image uploaded successfully.",
      image,
    };
  } catch {
    return {
      success: false,
      message:
        "Failed to upload image.",
    };
  }
}

export async function getProductImages(
  productId: string
) {
  try {
    if (!productId) {
      return [];
    }

    return await prisma.productImage.findMany({
      where: {
        productId,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });
  } catch {
    return [];
  }
}

export async function getPublicProducts() {
  try {
    return await prisma.product.findMany({
      where: {
        isActive: true,
      },
      include: {
        category: true,
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch {
    return [];
  }
}

export async function getProductBySlug(
  slug: string
) {
  try {
    return await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        category: true,
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });
  } catch {
    return null;
  }
}

export async function getRelatedProducts(
  categoryId: string,
  currentProductId: string
) {
  try {
    return await prisma.product.findMany({
      where: {
        categoryId,
        isActive: true,
        NOT: {
          id: currentProductId,
        },
      },
      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
      take: 4,
    });
  } catch {
    return [];
  }
}


export async function deleteProductImage(
  imageId: string
): Promise<ActionResponse> {
  try {
    if (!imageId) {
      return {
        success: false,
        message: "Image ID is required.",
      };
    }

    const image =
      await prisma.productImage.findUnique({
        where: {
          id: imageId,
        },
      });

    if (!image) {
      return {
        success: false,
        message: "Image not found.",
      };
    }

    if (image.cloudinaryPublicId) {
        await deleteProductImageFromCloudinary(
          image.cloudinaryPublicId
        );
      }
      
    await prisma.productImage.delete({
      where: {
        id: imageId,
      },
    });

    revalidatePath(
      `/admin/products/${image.productId}/images`
    );

    return {
      success: true,
      message: "Image deleted successfully.",
    };
  } catch {
    return {
      success: false,
      message: "Failed to delete image.",
    };
  }
}

export async function updateImageSortOrder(
  images: {
    id: string;
    sortOrder: number;
  }[]
): Promise<ActionResponse> {
  try {
    if (images.length === 0) {
      return {
        success: false,
        message: "No images provided.",
      };
    }

    await prisma.$transaction(
      images.map((image) =>
        prisma.productImage.update({
          where: {
            id: image.id,
          },
          data: {
            sortOrder: image.sortOrder,
          },
        })
      )
    );

    revalidatePath("/admin/products");

    return {
      success: true,
      message:
        "Image order updated successfully.",
    };
  } catch {
    return {
      success: false,
      message:
        "Failed to update image order.",
    };
  }
}
export async function setPrimaryImage(
  imageId: string
): Promise<ActionResponse> {
  try {
    const image =
      await prisma.productImage.findUnique({
        where: {
          id: imageId,
        },
      });

    if (!image) {
      return {
        success: false,
        message: "Image not found.",
      };
    }

    await prisma.$transaction([
      prisma.productImage.updateMany({
        where: {
          productId: image.productId,
        },
        data: {
          isPrimary: false,
        },
      }),

      prisma.productImage.update({
        where: {
          id: imageId,
        },
        data: {
          isPrimary: true,
        },
      }),
    ]);

    revalidatePath(
      `/admin/products/${image.productId}/images`
    );

    return {
      success: true,
      message:
        "Primary image updated successfully.",
    };
  } catch {
    return {
      success: false,
      message:
        "Failed to update primary image.",
    };
  }
}

export async function updateImageAltText(
  imageId: string,
  altText: string
): Promise<ActionResponse> {
  try {
    if (altText.length > 255) {
      return {
        success: false,
        message:
          "Alt text cannot exceed 255 characters.",
      };
    }

    const image =
      await prisma.productImage.findUnique({
        where: {
          id: imageId,
        },
      });

    if (!image) {
      return {
        success: false,
        message: "Image not found.",
      };
    }

    await prisma.productImage.update({
      where: {
        id: imageId,
      },
      data: {
        altText:
          altText.trim() || null,
      },
    });

    revalidatePath(
      `/admin/products/${image.productId}/images`
    );

    return {
      success: true,
      message:
        "Alt text updated successfully.",
    };
  } catch {
    return {
      success: false,
      message:
        "Failed to update alt text.",
    };
  }
}

