import { Metadata } from "next";

import { prisma } from "@/lib/prisma";

import ProductsHero from "@/components/public/products/ProductsHero";
import ProductsCatalog from "@/components/public/products/ProductsCatalog";
import ProductsCTA from "@/components/public/products/ProductsCTA";

export const metadata: Metadata = {
  title: "Industrial Automation Products",
  description:
    "Explore our complete range of industrial automation products and solutions.",
};

export default async function ProductsPage() {
  const products =
    await prisma.product.findMany({
      where: {
        isActive: true,
      },

      include: {
        category: true,
        images: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  const categories =
  await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },

    include: {
      products: {
        where: {
          isActive: true,
        },

        orderBy: {
          name: "asc",
        },

        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  const featuredProducts =
    products.filter(
      (product) =>
        product.featured === true
    );

  return (
    <>
    
      <ProductsHero
        totalProducts={
          products.length
        }
        totalCategories={
          categories.length
        }
        featuredProducts={
          featuredProducts.length
        }
      />

      <ProductsCatalog
        products={products}
        categories={categories}
      />

      <ProductsCTA />
    </>
  );
} 