import Link from "next/link";

import { getProducts } from "@/actions/products";
import DeleteProductButton from "@/components/products/DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await getProducts();

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.isActive
  ).length;

  const featuredProducts = products.filter(
    (product) => product.featured
  ).length;

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0F2747]">
                Product Management
              </h1>

              <p className="mt-2 text-slate-600">
                Manage industrial automation products.
              </p>
            </div>

            <Link
              href="/admin/products/create"
              className="inline-flex items-center rounded-lg bg-[#0F2747] px-5 py-3 font-medium text-white transition hover:bg-[#18385F]"
            >
              Add Product
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Products
            </p>

            <p className="mt-3 text-3xl font-bold text-[#0F2747]">
              {totalProducts}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Active Products
            </p>

            <p className="mt-3 text-3xl font-bold text-[#0F2747]">
              {activeProducts}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Featured Products
            </p>

            <p className="mt-3 text-3xl font-bold text-[#0F2747]">
              {featuredProducts}
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        {/* <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Search products..."
              
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none"
            />

            <select
              
              className="rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none"
            >
              <option>All Categories</option>
            </select>
          </div>
        </div> */}

        {/* Empty State */}
        {products.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <span className="text-3xl text-slate-400">
                📦
              </span>
            </div>

            <h2 className="text-2xl font-semibold text-[#0F2747]">
              No Products Found
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-slate-600">
              Create your first product to start
              building the catalog.
            </p>

            <Link
              href="/admin/products/create"
              className="mt-6 inline-flex items-center rounded-lg bg-[#0F2747] px-5 py-3 font-medium text-white transition hover:bg-[#18385F]"
            >
              Create Product
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-[#0F2747]">
                Products
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2747]">
                      Product Name
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2747]">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2747]">
                      Featured
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2747]">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2747]">
                      Images
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2747]">
                      Enquiries
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2747]">
                      Downloads
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2747]">
                      Created
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2747]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-t border-slate-100"
                    >
                      <td className="px-6 py-4 font-medium text-[#0F2747]">
                        {product.name}
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {product.category?.name ??
                          "Uncategorized"}
                      </td>

                      <td className="px-6 py-4">
                        {product.featured ? (
                          <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                            Featured
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            Standard
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {product.isActive ? (
                          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            Inactive
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {product._count.images}
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {product._count.enquiries}
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {product._count.downloads}
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {formatDate(product.createdAt)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="rounded-lg border border-[#0F2747] px-3 py-1.5 text-sm text-[#0F2747]"
                          >
                            Edit
                          </Link>

                          <Link
                            href={`/admin/products/${product.id}/images`}
                            className="rounded-lg border border-green-500 px-3 py-1.5 text-sm text-green-600 hover:bg-green-500 hover:text-white transition"
                          >
                            Images
                          </Link>

                          <DeleteProductButton
                            productId={product.id}
                          />
                      </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}