import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ProductsHeroProps {
  totalProducts: number;
  totalCategories: number;
  featuredProducts: number;
}

export default function ProductsHero({
 
}: ProductsHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-8">
      

      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="
            h-full
            w-full
            bg-[linear-gradient(to_right,#0F2747_1px,transparent_1px),linear-gradient(to_bottom,#0F2747_1px,transparent_1px)]
            bg-[size:60px_60px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
      
        <h1 className="text-3xl font-bold text-[#0F2747] md:text-3xl">
          Industrial Automation Products
        </h1>
        
      </div>
    </section>
  );
}   