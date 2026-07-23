"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

type Slide = {
  title: string;
  tag: string;
  image: string;
};

const slides: Slide[] = [
  {
    title: "Industrial Automation",
    tag: "Process Systems",
    image: "/images/industrial.png",
  },
  {
    title: "Gate Automation",
    tag: "Access Control",
    image: "/images/gate-automation.png",
  },
  {
    title: "Boom Barriers",
    tag: "Traffic Management",
    image: "/images/boom-barrier.png",
  },
  {
    title: "Rolling Shutters",
    tag: "Facility Security",
    image: "/images/rolling-shutter.png",
  },
];

const AUTOPLAY_DELAY = 4200;

export default function SolutionsSwiper() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const goTo = (i: number) => {
    swiperRef.current?.slideToLoop(i);
  };

  return (
    <section className="relative overflow-hidden bg-white py-2 lg:py-6">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-orange-100/70 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0F2747 1px, transparent 1px), linear-gradient(90deg, #0F2747 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Slide stage */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={900}
            autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
            loop
            onSwiper={(s) => (swiperRef.current = s)}
            onSlideChange={(s) => setActive(s.realIndex)}
            onAutoplayTimeLeft={(_s, _time, p) => setProgress(1 - p)}
            className="overflow-hidden rounded-[28px] shadow-[0_30px_60px_-15px_rgba(15,39,71,0.35)] ring-1 ring-black/5"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.title}>
                <div className="relative overflow-hidden">
                  {/* Background image + overlays — absolutely filled behind the flex content below */}
                  <div className="absolute inset-0">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A1B33]/92 via-[#0F2747]/55 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B33]/80 via-[#0A1B33]/10 to-[#0A1B33]/60" />
                  </div>

                  {/* Flex column drives the slide's actual height — masthead and content
                      are in normal flow, so they can never overlap regardless of width */}
                  <div className="relative z-10 flex min-h-[420px] flex-col sm:min-h-[480px] lg:min-h-[580px]">
                    {/* Top-of-image masthead — persistent across slides */}
                    <div className="flex flex-col items-center px-6 pt-5 text-center sm:px-10 sm:pt-5 lg:px-16 lg:pt-5">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300 backdrop-blur-md sm:text-xs">
                        Aven Industrial automation
                      </span>

                      <h2 className="mx-auto mt-4 max-w-2xl text-xl font-extrabold leading-[1.15] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)] sm:mt-6 sm:text-2xl lg:text-3xl">
                        Smart Industrial Automation{" "}
                        <span className="text-orange-400">Solutions</span> For
                        Modern Manufacturing...
                      </h2>
                    </div>

                    {/* Spacer — pushes content to the bottom without overlapping the masthead */}
                    <div className="flex-1" />

                    {/* Content */}
                    <div className="px-6 pb-18 sm:px-10 sm:pb-20 lg:px-16 lg:pb-36">
                      <div className="max-w-xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-300 backdrop-blur-md ring-1 ring-white/20 sm:text-xs">
                          {slide.tag}
                        </span>

                        <h3 className="mt-4 max-w-lg text-xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-2xl lg:text-2xl">
                          {slide.title}
                        </h3>

                        <p className="mt-3 max-w-md text-sm leading-6 text-slate-200/90 sm:text-base sm:leading-7">
                          Engineered for reliability, safety and long-term
                          operational excellence across manufacturing,
                          commercial and infrastructure applications.
                        </p>

                        <div className="mt-6">
                          <Link
                            href="/products"
                            className="group inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0F2747] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:px-7 sm:py-3.5 sm:text-base"
                          >
                            Explore Products
                            <ArrowRight
                              size={18}
                              className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom controls: dot pagination with live progress — normal flow, below the slide box */}
          <div className="mt-6 flex items-center justify-center gap-2.5">
            {slides.map((slide, i) => (
              <button
                key={slide.title}
                onClick={() => goTo(i)}
                aria-label={`Go to ${slide.title}`}
                className={`relative h-2 overflow-hidden rounded-full transition-all duration-500 ${
                  active === i
                    ? "w-8 bg-slate-200"
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
              >
                {active === i && (
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-orange-300"
                    style={{ width: `${progress * 100}%` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}