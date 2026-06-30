"use client";

import { useState } from "react";
import {
  Minus,
  Plus,
} from "lucide-react";

interface ProductSidebarProps {
  categories: {
    id: string;
    name: string;
    products: {
      id: string;
      name: string;
      slug: string;
    }[];
  }[];

  selectedProductId: string | null;

  onProductSelect: (
    productId: string
  ) => void;

  onShowAllProducts: () => void;
}

export default function ProductSidebar({
  categories,
  selectedProductId,
  onProductSelect,
  onShowAllProducts,
}: ProductSidebarProps) {
  const [openCategory, setOpenCategory] =
    useState<string | null>(null);

  const toggleCategory = (
    categoryId: string
  ) => {
    setOpenCategory((prev) =>
      prev === categoryId
        ? null
        : categoryId
    );
  };

  return (
    <aside
      className="
        sticky
        top-24
        hidden
        h-fit
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        lg:block
      "
    >
      {/* Header */}

      <div className="border-b bg-[#0F2747] px-5 py-3 rounded-t-2xl text-white">
        
        <h2 className="text-base tracking-wide">
          Product Categories
        </h2>
      </div>

      <div>

        {/* All Products */}

        <button
          onClick={onShowAllProducts}
          className="
            w-full
            border-b
            border-slate-200
            px-5
            py-4
            text-left
            text-[14px]
            font-semibold
            text-black
            transition
            hover:bg-slate-50
          "
        >
          All Products
        </button>

        {categories.map((category) => (
          <div
            key={category.id}
            className="
              overflow-hidden
              border-b
              border-slate-200
            "
          >
            {/* Category */}

            <button
              onClick={() =>
                toggleCategory(category.id)
              }
              className="
                flex
                w-full
                items-center
                justify-between
                px-5
                py-2
                text-[14px]
                font-semibold
                text-black
                transition
                hover:bg-slate-50
              "
            >
              <span>
                {category.name}
              </span>

              {openCategory ===
              category.id ? (
                <Minus size={18} />
              ) : (
                <Plus size={18} />
              )}
            </button>

            {/* Products */}

            <div
              className={`
                overflow-hidden
                transition-all
                duration-300
                ${
                  openCategory ===
                  category.id
                    ? "max-h-[600px]"
                    : "max-h-0"
                }
              `}
            >
              <div className="bg-white px-5 pb-4 ">
                {category.products.length === 0 ? (
                  <p className="py-2 text-sm text-slate-500">
                    No products available
                  </p>
                ) : (
                  category.products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        onProductSelect(product.id);

                        document
                          .getElementById("products-grid")
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }}
                      className={`
                        block
                        w-full
                        py-1
                        text-left
                        text-[14px]
                        transition

                        ${
                          selectedProductId === product.id
                            ? "font-semibold text-black"
                            : "text-slate-700 hover:text-[#0F2747]"
                        }
                      `}
                    >
                      - {product.name}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}