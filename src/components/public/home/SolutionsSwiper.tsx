"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Industrial Automation",
    image: "/images/hero-bg.png",
  },
  {
    title: "Gate Automation",
    image: "/images/gate-automation.png",
  },
  {
    title: "Boom Barriers",
    image: "/images/boom-barrier.png",
  },
  {
    title: "Rolling Shutters",
    image: "/images/rolling-shutter.png",
  },
];

export default function SolutionsSwiper() {
  return (
    <section className="relative overflow-hidden bg-white py-2 lg:py-2">
      {/* Background Blur */}

      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-orange-100 blur-3xl" />

      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Heading */}

        <div className="mb-2 text-center">
          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-orange-200
              bg-orange-50
              px-4
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-orange-700
              sm:text-sm
            "
          >
            Industrial Automation Solutions
          </span>

          <h2
            className="
              mx-auto
              mt-1
              max-w-3xl
              text-center
              text-3xl
              font-extrabold
              leading-tight
              text-[#0F2747]
              sm:text-xl
              lg:text-3xl
            "
          >
            Smart Industrial Automation
            <br      />
            Solutions For Modern Manufacturing
          </h2>

          {/* <p
            className="
              mx-auto
              mt-5
              max-w-3xl
              text-sm
              leading-7
              text-slate-600
              sm:text-base
              lg:text-md
            "
          >
            Discover premium industrial automation solutions including gate
            automation, boom barriers, rolling shutters and advanced automation
            systems engineered for industrial, commercial and infrastructure
            applications.
          </p> */}
        </div>

        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop
          className="overflow-hidden rounded-3xl shadow-2xl"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div
                className="
                  relative
                  h-[360px]
                  sm:h-[430px]
                  lg:h-[520px]
                  overflow-hidden
                "
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover"
                />

                {/* Dark Overlay */}

                <div className="absolute inset-0 bg-gradient-to-r from-[#0F2747]/85 via-[#0F2747]/45 to-transparent" />

                {/* Content */}

                <div className="absolute inset-0 flex items-center">
                  <div
                    className="
                      max-w-xl
                      px-6
                      sm:px-10
                      lg:px-14
                      text-white
                    "
                  >
                    {/* Badge */}

                    <span
                      className="
                        inline-flex
                        rounded-full
                        bg-orange-500
                        px-4
                        py-2
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-wide
                        text-white
                        shadow-lg
                        sm:text-sm
                      "
                    >
                      Industrial Automation Solution
                    </span>

                    {/* Title */}

                    <h2
                      className="
                        mt-4
                        max-w-lg
                        text-3xl
                        font-extrabold
                        leading-tight
                        text-white
                        sm:text-4=3xl
                        lg:text-3xl
                      "
                    >
                      {slide.title}
                    </h2>

                    {/* Description */}

                    <p
                      className="
                        mt-2
                        max-w-md
                        text-sm
                        leading-6
                        text-slate-100
                        sm:text-base
                        sm:leading-7
                        lg:text-sm
                        lg:leading-8
                      "
                    >
                      Premium industrial automation solutions engineered for
                      reliability, safety, productivity and long-term
                      operational excellence across manufacturing, commercial
                      and infrastructure applications.
                    </p>

                    {/* Button */}

                    <div className="mt-7">
                      <Link
                        href="/products"
                        className="
                          group
                          inline-flex
                          items-center
                          rounded-xl
                          bg-white
                          px-5
                          py-3
                          text-sm
                          font-semibold
                          text-[#0F2747]
                          shadow-xl
                          transition-all
                          duration-300
                          hover:-translate-y-1
                         
                          hover:text-[#0F2747]
                          hover:shadow-2xl
                          sm:px-7
                          sm:py-3.5
                          sm:text-base
                        "
                      >
                        Explore Products
                        <ArrowRight
                          size={18}
                          className="
                            ml-2
                            transition-transform
                            duration-300
                            group-hover:translate-x-2
                          "
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
