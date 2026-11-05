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
    "Motorized Sliding Gate",
    "Motorized Swing Gate",
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
    "Motorized Rolling Shutter",
    "Automatic Rolling Shutter",
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

    // Conveyor SEO Keywords - Pune
    "Industrial Conveyor Manufacturer in Pune",
    "Industrial Conveyor Supplier in Pune",
    "Conveyor System Manufacturer in Pune",
    "Conveyor System Supplier in Pune",
    "Roller Bed Conveyor Manufacturer in Pune",
    "Roller Bed Conveyor Supplier in Pune",
    "Gravity Roller Conveyor Manufacturer in Pune",
    "Gravity Roller Conveyor Supplier in Pune",
    "Powered Roller Conveyor Manufacturer in Pune",
    "Powered Roller Conveyor Supplier in Pune",
    "Flat Belt Conveyor Manufacturer in Pune",
    "Flat Belt Conveyor Supplier in Pune",
    "Modular Belt Conveyor Manufacturer in Pune",
    "Modular Belt Conveyor Supplier in Pune",
    "Cleated Belt Conveyor Manufacturer in Pune",
    "Cleated Belt Conveyor Supplier in Pune",
    "Curved Belt Conveyor Manufacturer in Pune",
    "Curved Belt Conveyor Supplier in Pune",
    "Incline Belt Conveyor Manufacturer in Pune",
    "Incline Belt Conveyor Supplier in Pune",
    "Decline Belt Conveyor Manufacturer in Pune",
    "Decline Belt Conveyor Supplier in Pune",
    "Sanitary Conveyor Manufacturer in Pune",
    "Sanitary Conveyor Supplier in Pune",
    "Wash Down Conveyor Manufacturer in Pune",
    "Wash Down Conveyor Supplier in Pune",
    "Specialty Conveyor Manufacturer in Pune",
    "Specialty Conveyor Supplier in Pune",
    "Chain Conveyor Manufacturer in Pune",
    "Chain Conveyor Supplier in Pune",
    "Slat Conveyor Manufacturer in Pune",
    "Slat Conveyor Supplier in Pune",
    "Mesh Belt Conveyor Manufacturer in Pune",
    "Mesh Belt Conveyor Supplier in Pune",
    "Spiral Conveyor Manufacturer in Pune",
    "Spiral Conveyor Supplier in Pune",
    "Assembly Line Conveyor Manufacturer in Pune",
    "Assembly Line Conveyor Supplier in Pune",
    "Packing Conveyor Manufacturer in Pune",
    "Packing Conveyor Supplier in Pune",
    "Warehouse Conveyor Manufacturer in Pune",
    "Warehouse Conveyor Supplier in Pune",

    // Conveyor SEO Keywords - Maharashtra
    "Industrial Conveyor Manufacturer in Maharashtra",
    "Industrial Conveyor Supplier in Maharashtra",
    "Conveyor System Manufacturer in Maharashtra",
    "Conveyor System Supplier in Maharashtra",
    "Roller Bed Conveyor Manufacturer in Maharashtra",
    "Roller Bed Conveyor Supplier in Maharashtra",
    "Gravity Roller Conveyor Manufacturer in Maharashtra",
    "Gravity Roller Conveyor Supplier in Maharashtra",
    "Powered Roller Conveyor Manufacturer in Maharashtra",
    "Powered Roller Conveyor Supplier in Maharashtra",
    "Flat Belt Conveyor Manufacturer in Maharashtra",
    "Flat Belt Conveyor Supplier in Maharashtra",
    "Modular Belt Conveyor Manufacturer in Maharashtra",
    "Modular Belt Conveyor Supplier in Maharashtra",
    "Cleated Belt Conveyor Manufacturer in Maharashtra",
    "Cleated Belt Conveyor Supplier in Maharashtra",
    "Curved Belt Conveyor Manufacturer in Maharashtra",
    "Curved Belt Conveyor Supplier in Maharashtra",
    "Incline Belt Conveyor Manufacturer in Maharashtra",
    "Incline Belt Conveyor Supplier in Maharashtra",
    "Decline Belt Conveyor Manufacturer in Maharashtra",
    "Decline Belt Conveyor Supplier in Maharashtra",
    "Sanitary Conveyor Manufacturer in Maharashtra",
    "Sanitary Conveyor Supplier in Maharashtra",
    "Wash Down Conveyor Manufacturer in Maharashtra",
    "Wash Down Conveyor Supplier in Maharashtra",
    "Specialty Conveyor Manufacturer in Maharashtra",
    "Specialty Conveyor Supplier in Maharashtra",
    "Chain Conveyor Manufacturer in Maharashtra",
    "Chain Conveyor Supplier in Maharashtra",
    "Slat Conveyor Manufacturer in Maharashtra",
    "Slat Conveyor Supplier in Maharashtra",
    "Mesh Belt Conveyor Manufacturer in Maharashtra",
    "Mesh Belt Conveyor Supplier in Maharashtra",
    "Spiral Conveyor Manufacturer in Maharashtra",
    "Spiral Conveyor Supplier in Maharashtra",
    "Assembly Line Conveyor Manufacturer in Maharashtra",
    "Assembly Line Conveyor Supplier in Maharashtra",
    "Packing Conveyor Manufacturer in Maharashtra",
    "Packing Conveyor Supplier in Maharashtra",
    "Warehouse Conveyor Manufacturer in Maharashtra",
    "Warehouse Conveyor Supplier in Maharashtra",

    // Conveyor SEO Keywords - India
    "Industrial Conveyor Manufacturer in India",
    "Industrial Conveyor Supplier in India",
    "Conveyor System Manufacturer in India",
    "Conveyor System Supplier in India",
    "Roller Bed Conveyor Manufacturer in India",
    "Roller Bed Conveyor Supplier in India",
    "Gravity Roller Conveyor Manufacturer in India",
    "Gravity Roller Conveyor Supplier in India",
    "Powered Roller Conveyor Manufacturer in India",
    "Powered Roller Conveyor Supplier in India",
    "Flat Belt Conveyor Manufacturer in India",
    "Flat Belt Conveyor Supplier in India",
    "Modular Belt Conveyor Manufacturer in India",
    "Modular Belt Conveyor Supplier in India",
    "Cleated Belt Conveyor Manufacturer in India",
    "Cleated Belt Conveyor Supplier in India",
    "Curved Belt Conveyor Manufacturer in India",
    "Curved Belt Conveyor Supplier in India",
    "Incline Belt Conveyor Manufacturer in India",
    "Incline Belt Conveyor Supplier in India",
    "Decline Belt Conveyor Manufacturer in India",
    "Decline Belt Conveyor Supplier in India",
    "Sanitary Conveyor Manufacturer in India",
    "Sanitary Conveyor Supplier in India",
    "Wash Down Conveyor Manufacturer in India",
    "Wash Down Conveyor Supplier in India",
    "Specialty Conveyor Manufacturer in India",
    "Specialty Conveyor Supplier in India",
    "Chain Conveyor Manufacturer in India",
    "Chain Conveyor Supplier in India",
    "Slat Conveyor Manufacturer in India",
    "Slat Conveyor Supplier in India",
    "Mesh Belt Conveyor Manufacturer in India",
    "Mesh Belt Conveyor Supplier in India",
    "Spiral Conveyor Manufacturer in India",
    "Spiral Conveyor Supplier in India",
    "Assembly Line Conveyor Manufacturer in India",
    "Assembly Line Conveyor Supplier in India",
    "Packing Conveyor Manufacturer in India",
    "Packing Conveyor Supplier in India",
    "Warehouse Conveyor Manufacturer in India",
    "Warehouse Conveyor Supplier in India",

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