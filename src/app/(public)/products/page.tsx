import { Metadata } from "next";

import { prisma } from "@/lib/prisma";

import ProductsHero from "@/components/public/products/ProductsHero";
import ProductsCatalog from "@/components/public/products/ProductsCatalog";
import ProductsCTA from "@/components/public/products/ProductsCTA";

export const metadata: Metadata = {
  title: "Aven Industrial Automation Products",

  description:
    "Explore Aven Automation's complete range of Industrial Automation and Industrial Entrance Automation products including Automatic Sliding Gates, Swing Gates, Telescopic Sliding Gates, High Speed Doors, Industrial Doors, Rolling Shutters, Boom Barriers, Dock Levelers, Dock Shelters, Conveyor Systems, Material Handling Equipment, Hangar Doors, Garage Doors and Automation Solutions across Pune, Maharashtra and India.",

  alternates: {
    canonical: "/products",
  },

  keywords: [
    // Brand
    "Aven Automation",
    "Aven Automation Products",
    "Industrial Automation Products",
    "Aven Industrial Automation",
    "aven industrial automation",
    "Aven Industrial Automation Pune",
    "Aven Industrial Automation Maharashtra",
    "Aven Industrial Automation India",

    // Gates
    "Automatic Sliding Gate",
    "Automatic Swing Gate",
    "Telescopic Sliding Gate",
    "Cantilever Sliding Gate",
    "Gate Automation",

    // Doors
    "Industrial Door",
    "Industrial Doors",
    "High Speed Door",
    "High Speed Roll Up Door",
    "Clean Room Door",
    "Anti Crash Door",
    "Sectional Overhead Door",
    "Transparent Sectional Door",
    "Garage Door",
    "Rolling Shutter",
    "Fire Rated Door",
    "Fire Shutter",
    "Steel Hangar Door",
    "Fabric Hangar Door",

    // Dock
    "Dock Leveler",
    "Hydraulic Dock Leveler",
    "Dock Shelter",
    "Dock Seal",
    "Loading Bay Equipment",

    // Parking
    "Boom Barrier",
    "Advertising Boom Barrier",
    "Folding Boom Barrier",
    "Automatic Bollards",
    "Road Blocker",
    "Swing Barrier",
    "Tripod Turnstile",
    "Speed Gate",

    // Conveyor
    "Industrial Conveyor",
    "Conveyor System",
    "Roller Bed Conveyor",
    "Gravity Roller Conveyor",
    "Powered Roller Conveyor",
    "Flat Belt Conveyor",
    "Modular Belt Conveyor",
    "Cleated Belt Conveyor",
    "Curved Belt Conveyor",
    "Incline Belt Conveyor",
    "Decline Belt Conveyor",
    "Sanitary Conveyor",
    "Wash Down Conveyor",
    "Specialty Conveyor",
    "Chain Conveyor",
    "Slat Conveyor",
    "Mesh Belt Conveyor",
    "Spiral Conveyor",
    "Assembly Line Conveyor",
    "Packing Conveyor",
    "Warehouse Conveyor",

    // Material Handling
    "Material Handling Equipment",
    "Material Handling System",
    "Factory Automation",
    "Warehouse Automation",

    // Location
    "Industrial Automation Pune",
    "Industrial Automation Maharashtra",
    "Industrial Automation India",
  ],
  openGraph: {
    title: "Industrial Automation Products | Aven Automation",
    description:
      "Automatic Gates, High Speed Doors, Industrial Doors, Boom Barriers, Conveyor Systems, Dock Equipment and Industrial Automation Products.",
    url: "https://avenautomation.in/products",
    siteName: "Aven Automation",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Industrial Automation Products | Aven Automation",
    description:
      "Explore Automatic Gates, Conveyor Systems, Industrial Doors and complete Industrial Automation Products.",
  },

  robots: {
    index: true,
    follow: true,
  },
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