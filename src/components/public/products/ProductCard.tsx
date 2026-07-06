import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { ProductType } from "@/types/product";

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image =
    product.images?.[0]?.imageUrl || "/placeholder-product.jpg";

  return (
    <div
      className="
        group
        relative
        mx-auto max-w-[240px] w-full
        overflow-hidden
        rounded-lg
        border
        border-slate-400
        bg-white
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-slate-300
        hover:shadow-lg
      "
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-36 overflow-hidden bg-slate-50">
          <Image
            src={image}
            alt={product.name}
            fill
            className="
              object-contain
              p-3
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-3">
        <span
          className="
            inline-block
            rounded
            bg-slate-100
            px-1.5
            py-0.5
            text-[9px]
            font-semibold
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          {product.category?.name}
        </span>

        <Link href={`/products/${product.slug}`}>
          <h3
            className="
              mt-1.5
              line-clamp-2
              text-[13px]
              font-bold
              leading-snug
              text-[#0F2747]
              transition-colors
              group-hover:text-slate-700
            "
          >
            {product.name}
          </h3>
        </Link>

        {product.shortDescription && (
          <p className="mt-1 line-clamp-1 text-[11px] text-slate-500">
            {product.shortDescription}
          </p>
        )}

        {/* Actions */}
        <div className="mt-2.5 flex items-center gap-1.5">
          <Link
            href={`/products/${product.slug}`}
            className="
              flex-1
              rounded-md
              border
              border-[#0F2747]
              py-1.5
              text-center
              text-[11px]
              font-semibold
              text-[#0F2747]
              transition
              hover:bg-[#0F2747]
              hover:text-white
            "
          >
            View Details
          </Link>

          <Link
            href={`/products/${product.slug}#enquiry`}
            aria-label="Enquire Now"
            className="
              group/enquire
              flex
              h-[30px]
              w-[30px]
              shrink-0
              items-center
              justify-center
              gap-0
              hover:gap-1.5
              overflow-hidden
              rounded-md
              bg-[#0F2747]
              px-0
              text-white
              transition-all
              duration-300
              ease-in-out
              hover:w-[110px]
              hover:px-2.5
              hover:bg-[#0F2747]
            "
          >
            <MessageCircle size={14} strokeWidth={2.2} className="shrink-0" />

            <span
              className="
                max-w-0
                overflow-hidden
                whitespace-nowrap
                text-[11px]
                font-semibold
                opacity-0
                transition-all
                duration-300
                ease-in-out
                group-hover/enquire:max-w-[80px]
                group-hover/enquire:opacity-100
              "
            >
              Enquire Now
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}