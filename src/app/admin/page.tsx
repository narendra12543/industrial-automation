import Link from "next/link";

import { auth } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            Manage products, categories, enquiries, users, and analytics.
          </p>
        </div>

        {/* Admin Information Card */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-[#0F2747] px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              Administrator Information
            </h2>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-slate-500">Name</p>

              <p className="mt-1 text-base font-semibold text-slate-900">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">Email</p>

              <p className="mt-1 text-base font-semibold text-slate-900">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">Role</p>

              <span className="mt-1 inline-flex rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-600">
                {user.role}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}