    "use client";

    import { useMemo, useState } from "react";
    import Link from "next/link";

    import DeleteCategoryButton from "@/components/admin/categories/DeleteCategoryButton";

    interface User {
    name?: string | null;
    email?: string | null;
    role?: string | null;
    }

    interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
    _count: {
        products: number;
    };
    }

    interface CategoriesTableProps {
    user: User | undefined;
    categories: Category[];
    }

    export default function CategoriesTable({
    user,
    categories,
    }: CategoriesTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const filteredCategories = useMemo(() => {
        return categories.filter((category) => {
        const matchesSearch =
            category.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            category.slug
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "ALL"
            ? true
            : statusFilter === "ACTIVE"
            ? category.isActive
            : !category.isActive;

        return matchesSearch && matchesStatus;
        });
    }, [categories, searchTerm, statusFilter]);

    const totalCategories = filteredCategories.length;

    const activeCategories = filteredCategories.filter(
        (category) => category.isActive
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
            
            

            {/* Stats */}
            <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                Total Categories
                </p>

                <p className="mt-3 text-3xl font-bold text-[#0F2747]">
                {totalCategories}
                </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-slate-500">
                Active Categories
                </p>

                <p className="mt-3 text-3xl font-bold text-[#0F2747]">
                {activeCategories}
                </p>
            </div>
            </div>

            {/* Search & Filter */}
            <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
                <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-[#0F2747] placeholder:text-slate-400 outline-none focus:border-[#0F2747] focus:ring-2 focus:ring-[#0F2747]/20"
                />

                <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-slate-300 px-4 py-3 text-[#0F2747] outline-none focus:border-[#0F2747] focus:ring-2 focus:ring-[#0F2747]/20"
                >
                <option value="ALL">
                    All Categories
                </option>
                <option value="ACTIVE">
                    Active
                </option>
                <option value="INACTIVE">
                    Inactive
                </option>
                </select>
            </div>
            </div>

            {/* Empty State */}
            {filteredCategories.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                <h2 className="text-2xl font-semibold text-[#0F2747]">
                No matching categories found.
                </h2>

                <p className="mt-3 text-[#0F2747]/70">
                Try changing your search or filter.
                </p>
            </div>
            ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-[#0F2747]">
                    Categories
                </h2>
                </div>

                <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="bg-slate-50">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2747]">
                        Name
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2747]">
                        Slug
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2747]">
                        Products
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F2747]">
                        Status
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
  {filteredCategories.map((category) => (
    <tr
      key={category.id}
      className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
    >
      {/* Name */}
      <td className="px-6 py-5">
        <div className="font-semibold text-[#0F2747]">
          {category.name}
        </div>
      </td>

      {/* Slug */}
      <td className="px-6 py-5">
        <span className="text-slate-600">
          {category.slug}
        </span>
      </td>

      {/* Products */}
      <td className="px-6 py-5">
        <span className="inline-flex items-center justify-center rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-[#0F2747]">
          {category._count.products}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        {category.isActive ? (
          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Active
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            Inactive
          </span>
        )}
      </td>

      {/* Created */}
      <td className="px-6 py-5 text-slate-600">
        {formatDate(category.createdAt)}
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/categories/${category.id}/edit`}
            className="rounded-lg border border-[#0F2747] px-4 py-2 text-sm font-medium text-[#0F2747] transition hover:bg-[#0F2747] hover:text-white"
          >
            Edit
          </Link>

          <DeleteCategoryButton
            categoryId={category.id}
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