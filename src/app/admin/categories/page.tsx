import Link from "next/link";

import { auth } from "@/lib/auth";
import { getCategories } from "@/actions/categories";
import CategoriesTable from "@/components/admin/categories/CategoriesTable";

export default async function AdminCategoriesPage() {
  const session = await auth();

  const user = session?.user;
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0F2747]">
                Category Management
              </h1>

              <p className="mt-2 text-[#0F2747]/80">
                Manage Aven Industrial automationproduct categories.
              </p>
            </div>

            <Link
              href="/admin/categories/create"
              className="inline-flex items-center rounded-lg bg-[#0F2747] px-5 py-3 font-medium text-white transition hover:bg-[#18385F]"
            >
              Add Category
            </Link>
          </div>
        </div>

        {/* Administrator Information */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-[#0F2747] px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              Administrator Information
            </h2>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Name
              </p>

              <p className="mt-1 font-semibold text-[#0F2747]">
                {user?.name}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Email
              </p>

              <p className="mt-1 font-semibold text-[#0F2747]">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Role
              </p>

              <span className="mt-1 inline-flex rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-600">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        <CategoriesTable
          user={user}
          categories={categories}
        />
      </div>
    </div>
  );
}