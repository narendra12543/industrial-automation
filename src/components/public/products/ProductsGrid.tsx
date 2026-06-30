import ProductCard from "./ProductCard";
import { ProductType } from "@/types/product";

interface Props {
  products: ProductType[];
}

export default function ProductsGrid({
  products,
}: Props) {
  if (!products.length) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-2xl font-bold text-[#0F2747]">
          No Products Found
        </h3>

        <p className="mt-3 text-slate-600">
          Try another filter.
        </p>
      </div>
    );
  }

  return (
    <section
      id="products-grid"
      className="pb-20"
    >
      <div className="mx-auto max-w-3xl px-4">
        <div
          className="
            grid
            gap-10
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}