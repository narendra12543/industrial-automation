import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import FeaturedProductsCarousel from "./FeaturedProductsCarousel";
import { prisma } from "@/lib/prisma";

export default async function FeaturedProductsSection() {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
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

    take: 12,
  });

  if (!products.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 lg:py-10">
      {/* Background */}


      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-orange-100 blur-3xl" />

      <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-blue-100 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}

        <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-orange-200
                bg-orange-50
                px-4
                py-2
                text-sm
                font-medium
                text-orange-700
              "
            >
              <Star
                size={15}
                className="mr-2"
              />
              Featured Products
            </div>

            <h2 className="mt-5 text-3xl font-bold text-[#0F2747] sm:text-4xl">
              Our Most Popular Industrial Solutions
            </h2>
            <p className="mt-4 max-w-3xl text-slate-600 leading-7">
              Explore our range of automatic gates,
              industrial doors, boom barriers,
              loading bay equipment and entrance
              automation solutions designed for
              commercial and industrial applications
              across Pune, Maharashtra and India.
            </p>

          </div>

          <Link
            href="/products"
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              
              px-6
              py-3
              font-semibold
              text-[#0F2747]
              transition-all
              duration-300
            "
          >
            View All Products

            <ArrowRight
              size={18}
              className="ml-2"
            />
          </Link>
        </div>

        {/* Carousel */}

        <FeaturedProductsCarousel
          products={products}
        />
      </div>
    </section>
  );
}