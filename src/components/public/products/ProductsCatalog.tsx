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
    <>
      <SearchAndFilters
        search={search}
        selectedCategory="all"
        categories={categories.map((c) => c.name)}
        onSearchChange={handleSearchChange}
        onCategoryChange={() => {}}
      />

      <div className="mx-auto max-w-7xl px-4 ">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <ProductSidebar
            categories={categories}
            selectedProductId={selectedProductId}
            onProductSelect={handleProductSelect}
            onShowAllProducts={handleShowAllProducts}
          />

          <div>
            <ProductsGrid products={paginatedProducts} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
