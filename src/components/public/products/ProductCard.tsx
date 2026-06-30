import Image from "next/image";
import Link from "next/link";

import { ProductType } from "@/types/product";

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const image =
    product.images?.[0]?.imageUrl ||
    "/placeholder-product.jpg";

  return (
  <div
    className="
      group
      overflow-hidden
      rounded-xl
      border
      max-w-[280px]
      border-slate-240
      bg-white
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      hover:border-slate-300
    "
  >
    {/* Image */}

    <Link href={`/products/${product.slug}`}>
      <div className="relative h-52 overflow-hidden bg-white">
        <Image
          src={image}
          alt={product.name}
          fill
          className="
            object-contain
            p-4
            transition-all
            duration-500
            group-hover:scale-105
          "
        />
        

        {/* {product.featured && (
          <span
            className="
              absolute
              left-2
              top-2
              rounded-md
              bg-gray-600
              px-2
              py-1
              text-[10px]
              font-semibold
              text-white
            "
          >
            Featured
          </span>
        )} */}
      </div>
    </Link>

    {/* Content */}

    <div className="p-3">

      <div className="mb-2">
        <span
          className="
            rounded-md
            bg-slate-100
            px-2
            py-1
            text-[10px]
            font-medium
            text-slate-600
          "
        >
          {product.category?.name}
        </span>
      </div>

      <Link href={`/products/${product.slug}`}>
        <h3
          className="
            line-clamp-2
            text-sm
            font-bold
            text-[#0F2747]
            transition-colors
            group-hover:text-gray-700
          "
        >
          {product.name}
        </h3>
      </Link>

      <p
        className="
          mt-2
          line-clamp-2
          text-xs
          text-slate-500
        "
      >
        {product.shortDescription}
      </p>

      <div className="mt-3 flex gap-2">

        <Link
          href={`/products/${product.slug}`}
          className="
            flex-1
            rounded-md
            border
            border-[#0F2747]
            py-2
            text-center
            text-xs
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
          className="
            flex-1
            rounded-md  
            bg-gray-600
            py-2
            text-center
            text-xs
            font-semibold
            text-white
            transition
            hover:bg-gray-700
          "
        >
          Enquire
        </Link>

      </div>
    </div>
  </div>
);
}