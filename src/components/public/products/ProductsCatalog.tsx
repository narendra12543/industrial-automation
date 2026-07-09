"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import SearchAndFilters from "./SearchAndFilters";
import ProductsGrid from "./ProductsGrid";
import Pagination from "./Pagination";
import { ProductType } from "@/types/product";
import ProductSidebar from "./ProductSidebar";

interface ProductsCatalogProps {
  products: ProductType[];
  categories: {
    id: string;
    name: string;
    products: {
      id: string;
      name: string;
      slug: string;
    }[];
  }[];
}

const PRODUCTS_PER_PAGE = 12;

export default function ProductsCatalog({
  products,
  categories,
}: ProductsCatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("q") || "";

  const initialCategory = searchParams.get("category") || "all";

  const initialPage = Number(searchParams.get("page") || "1");

  const [search, setSearch] = useState(initialSearch);

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const [currentPage, setCurrentPage] = useState(initialPage);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category?.name?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (selectedProductId) {
      result = result.filter((product) => product.id === selectedProductId);
    }

    return result;
  }, [products, search, selectedProductId]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  const updateUrl = (q: string, category: string, page: number) => {
    const params = new URLSearchParams();

    if (q) {
      params.set("q", q);
    }

    if (category && category !== "all") {
      params.set("category", category);
    }

    params.set("page", page.toString());

    router.push(`/products?${params.toString()}`);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);

    updateUrl(value, "all", 1);
  };

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage(1);
  };

  const handleShowAllProducts = () => {
    setSelectedProductId(null);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    updateUrl(search, "All", page);
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-white">
      <SearchAndFilters
        search={search}
        selectedCategory="all"
        categories={categories.map((c) => c.name)}
        onSearchChange={handleSearchChange}
        onCategoryChange={() => {}}
      />

      <div className="mx-auto max-w-7xl px-4 py-2">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          <ProductSidebar
            categories={categories}
            selectedProductId={selectedProductId}
            onProductSelect={handleProductSelect}
            onShowAllProducts={handleShowAllProducts}
          />

          <div className="lg:border-l lg:border-slate-200 lg:pl-10">
            <div className="hidden md:block mb-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                Our Catalogue
              </span>

              <h2 className="mt-1 text-xl font-bold text-[#0F2747] sm:text-2xl">
                Built for Performance, Designed for Reliability
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                Explore our range of Aven  Industrial automation engineered for
                durability, security, and seamless integration across barriers, gates,
                and high-speed door systems.
              </p>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-slate-200 via-slate-200 to-transparent" />
            </div>

            <ProductsGrid products={paginatedProducts} />

            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}