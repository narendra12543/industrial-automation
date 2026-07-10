import { Metadata } from "next";

import { prisma } from "@/lib/prisma";

import ProductsHero from "@/components/public/products/ProductsHero";
import ProductsCatalog from "@/components/public/products/ProductsCatalog";
import ProductsCTA from "@/components/public/products/ProductsCTA";

export const metadata: Metadata = {
  title: "Products",

  description:
    "Explore Industrial Entrance Automation products including Automatic Sliding Gates, Swing Gates, High Speed Doors, Industrial Doors, Boom Barriers, Hangar Doors, Automation Motors and complete industrial automation solutions from Aven Automation.",

  alternates: {
    canonical: "/products",
  },

  keywords: [
    "Industrial Automation Products",
    "Industrial Entrance Automation Products",

    "Automatic Sliding Gate",
    "Automatic Swing Gate",
    "Telescopic Sliding Gate",

    "Roll Up Door",
    "High Speed Door",
    "Industrial Door",
    "Garage Door",

    "Boom Barrier",
    "Automatic Swing Barrier",
    "Automatic Rising Bollard",

    "Rolling Shutter",
    "Motorized Rolling Shutter",
    "Gear Operated Rolling Shutter",

    "Manual Sliding Door",
    "Motorized Sliding Door",

    "Dock Leveler",
    "Dock Shelter",

    "Inclined Belt Conveyor",
    "Flat Belt Conveyor",

    "Industrial Automation Products India",
    "Aven Automation",
  ],
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