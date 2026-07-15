"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowRight } from "lucide-react";
import { ProductType } from "@/types/product";

interface Props {
  products: ProductType[];
}

function getAboutText(productName: string, category?: string) {
  return `${productName} is a premium ${
    category ?? "industrial automation"
  } solution designed to deliver reliable performance, enhanced safety and long-term durability for industrial, commercial and residential applications. Engineered using high-quality components to ensure smooth operation even in demanding environments, with complete supply, installation, testing and after-sales support from Aven Automation.`;
}

export default function ProductsGrid({ products }: Props) {
  if (!products.length) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-2xl font-bold text-[#0F2747]">No Products Found</h3>
        <p className="mt-3 text-slate-600">Try another filter.</p>
      </div>
    );
  }

  return (
    <section id="products-grid" className="pb-16 sm:pb-20">
      <div className="flex flex-col gap-10 sm:gap-16 md:gap-20">
        {products.map((product, index) => (
          <ProductRow key={product.id} product={product} reverse={index % 2 !== 0} />
        ))}
      </div>
    </section>
  );
}

function ProductRow({ product, reverse }: { product: ProductType; reverse: boolean }) {
  const image = product.images?.[0]?.imageUrl;
  const aboutText = getAboutText(product.name, product.category?.name);

  const rowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`group flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center gap-5 transition-all duration-700 ease-out sm:gap-8 md:gap-16 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {/* Image side */}
      <div className="w-full md:w-1/2">
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-[0_8px_24px_-8px_rgba(15,39,71,0.15)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_25px_60px_-15px_rgba(15,39,71,0.3)] sm:rounded-2xl">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              width={700}
              height={500}
              className="h-56 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:h-80 md:h-96"
            />
          ) : (
            <div className="flex h-56 items-center justify-center text-slate-300 sm:h-80 md:h-96">
              No Image
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </div>
      </div>

      {/* Text side */}
      <div className="w-full md:w-1/2">
        {product.category?.name && (
          <span className="inline-block rounded-full bg-[#0F2747]/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#0F2747] transition-colors duration-300 group-hover:bg-[#0F2747]/10 sm:px-3 sm:text-[11px]">
            {product.category.name}
          </span>
        )}

        <h3 className="mt-3 text-xl font-bold leading-snug text-[#0F2747] transition-colors duration-300 sm:mt-4 sm:text-2xl md:text-2xl">
          {product.name}
        </h3>

        <div className="mt-2.5 h-px w-12 bg-[#0F2747]/20 transition-all duration-500 group-hover:w-20 sm:mt-3 sm:w-16" />

        <p className="mt-2 text-[13px] leading-relaxed text-slate-600 sm:mt-3 sm:text-sm md:text-[15px]">
          {aboutText}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#0F2747]/20 px-3.5 py-2 text-xs font-semibold text-[#0F2747] transition-all duration-300 hover:bg-[#0F2747]/5 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
          >
            View Details
            <ArrowRight
              size={13}
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:size-[14px]"
            />
          </Link>

          <Link
            href={`/products/${product.slug}#enquiry`}
            className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#0F2747] px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-[#0F2747]/20 transition-all duration-300 hover:bg-[#0F2747]/90 hover:shadow-lg hover:shadow-[#0F2747]/30 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
          >
            <MessageCircle size={13} className="shrink-0 sm:size-[14px]" />
            Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
}