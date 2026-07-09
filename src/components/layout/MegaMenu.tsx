"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Cog,
  ShieldCheck,
  DoorOpen,
  Warehouse,
  Zap,
  LayoutGrid,
  Package,
  ArrowUpRight,
} from "lucide-react";

interface ProductMegaMenuProps {
  categories: {
    id: string;
    name: string;
    products: {
      id: string;
      name: string;
      slug: string;
    }[];
  }[];

  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Pick an icon that matches the category name so the sidebar reads at a glance
function getCategoryIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("motor")) return Cog;
  if (n.includes("barrier")) return ShieldCheck;
  if (n.includes("gate")) return DoorOpen;
  if (n.includes("hangar")) return Warehouse;
  if (n.includes("speed")) return Zap;
  if (n.includes("sectional") || n.includes("overhead")) return LayoutGrid;
  return Package;
}

const ROW_HEIGHT = 44; // px — button height + gap, used by the sliding pill

export default function ProductMegaMenu({
  categories,
  open,
  setOpen,
}: ProductMegaMenuProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = categories[activeIndex];
  const isWide = (activeCategory?.products.length ?? 0) > 5;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setActiveIndex(0);
      }}
    >
      {/* Trigger */}

      <Link
        href="/products"
        onClick={() => setOpen(false)}
        className="
          flex
          items-center
          underline
          gap-1
          font-medium
          text-[#0F2747]
          transition
          hover:text-[#0F2747]
        "
      >
        Explore Products
      </Link>

      {/* Mega Menu */}

      <div
        className={`
          absolute
          top-full
          left-1/2
          -translate-x-[43%]
          mt-4
          ${isWide ? "w-[860px]" : "w-[580px]"}
          overflow-hidden
          rounded-[20px]
          border
          border-slate-200/70
          bg-white/95
          backdrop-blur-xl
          shadow-[0_20px_60px_-15px_rgba(15,39,71,0.25)]
          z-[60]
          transition-all
          duration-300
          ease-out
          ${
            open
              ? "visible opacity-100 translate-y-0"
              : "invisible opacity-0 -translate-y-2"
          }
        `}
      >
        {/* Background Effects — kept small and controlled, not oversized */}
        <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-orange-100/60 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-blue-100/60 blur-[90px]" />

        {/* Content */}

        <div className="relative z-10 flex">
          {/* Sidebar */}

          <div className="w-[190px] shrink-0 border-r border-slate-100 p-2.5">
            <div className="relative">
              {/* Sliding highlight pill — the signature element */}
              <div
                className="absolute left-0 right-0 rounded-xl bg-[#0F2747] transition-transform duration-300 ease-out"
                style={{
                  height: 38,
                  transform: `translateY(${activeIndex * ROW_HEIGHT}px)`,
                }}
              />

              {categories.map((category, idx) => {
                const Icon = getCategoryIcon(category.name);
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onFocus={() => setActiveIndex(idx)}
                    style={{ height: 38, marginBottom: ROW_HEIGHT - 38 }}
                    className="relative z-10 flex w-full items-center gap-2.5 rounded-xl px-3 text-left"
                  >
                    <Icon
                      className={`h-[15px] w-[15px] shrink-0 transition-colors duration-200 ${
                        isActive ? "text-orange-300" : "text-slate-400"
                      }`}
                    />

                    <span
                      className={`truncate text-[13px] font-medium transition-colors duration-200 ${
                        isActive ? "text-white" : "text-slate-600"
                      }`}
                    >
                      {category.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail Panel */}

          <div className="relative flex-1 p-5">
            {activeCategory && (
              <>
                <Link
                  href={`/products?category=${encodeURIComponent(
                    activeCategory.name
                  )}`}
                  onClick={() => setOpen(false)}
                  className="
                    absolute
                    right-5
                    top-5
                    flex
                    items-center
                    gap-1
                    text-[11px]
                    font-medium
                    text-slate-400
                    transition-colors
                    hover:text-orange-600
                  "
                >
                  View all
                  <ArrowUpRight className="h-3 w-3" />
                </Link>

                <div
                  className={`mt-0 grid gap-x-4 gap-y-0.5 ${
                    activeCategory.products.length > 5
                      ? "grid-cols-2"
                      : "grid-cols-1"
                  }`}
                >
                  {activeCategory.products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={() => setOpen(false)}
                      className="
                        group
                        flex
                        items-center
                        gap-2
                        rounded-lg
                        px-2.5
                        py-2
                        text-[13px]
                        text-slate-700
                        transition-all
                        duration-150
                        hover:bg-slate-50
                        hover:text-[#0F2747]
                      "
                    >
                      <span
                        className="
                          h-1
                          w-1
                          shrink-0
                          rounded-full
                          bg-slate-300
                          transition-colors
                          group-hover:bg-orange-500
                        "
                      />

                      <span className="truncate transition-transform duration-150 group-hover:translate-x-0.5">
                        {product.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}