"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import FeaturedProductCard from "./FeaturedProductCard";

import "swiper/css";
import "swiper/css/navigation";

interface FeaturedProductsCarouselProps {
  products: {
    id: string;
    name: string;
    slug: string;
    shortDescription: string | null;
    featured: boolean;
    category: {
      name: string;
    } | null;
    images: {
      imageUrl: string;
      altText: string | null;
      isPrimary: boolean;
    }[];
  }[];
}

export default function FeaturedProductsCarousel({
  products,
}: FeaturedProductsCarouselProps) {
  return (
    <div className="relative">
      {/* Left Arrow */}

      <button
        className="
          featured-prev
          absolute
          left-0
          top-1/2
          z-20
          hidden
          h-12
          w-12
          -translate-x-5
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-slate-200
          bg-white
          text-[#0F2747]
          shadow-xl
          transition-all
          duration-300
          hover:scale-110
          hover:border-orange-500
          hover:bg-orange-500
          hover:text-white
          lg:flex
        "
      >
        <ChevronLeft size={22} />
      </button>

      {/* Right Arrow */}

      <button
        className="
          featured-next
          absolute
          right-0
          top-1/2
          z-20
          hidden
          h-12
          w-12
          translate-x-5
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-slate-200
          bg-white
          text-[#0F2747]
          shadow-xl
          transition-all
          duration-300
          hover:scale-110
          hover:border-orange-500
          hover:bg-orange-500
          hover:text-white
          lg:flex
        "
      >
        <ChevronRight size={22} />
      </button>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: ".featured-prev",
          nextEl: ".featured-next",
        }}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        speed={700}
        grabCursor
        loop={products.length > 4}
        spaceBetween={12}

        breakpoints={{
          0: {
            slidesPerView: 1.1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 14,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <FeaturedProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}