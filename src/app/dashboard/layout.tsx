import Link from "next/link";
import { ReactNode } from "react";

import { auth } from "@/lib/auth";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8">
        {/* Sidebar */}
        <aside className="w-full lg:sticky lg:top-24 lg:h-fit lg:w-80">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}
            <div className="border-b border-slate-200 bg-[#0F2747] p-6">
              <h2 className="text-lg font-semibold text-white">
                My Dashboard
              </h2>

              <p className="mt-1 text-sm text-slate-300">
                Account Overview
              </p>
            </div>

            {/* User Information */}
            <div className="border-b border-slate-200 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-600">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Name
                  </p>

                  <p className="text-sm font-semibold text-slate-900">
                    {user.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Email
                  </p>

                  <p className="break-all text-sm text-slate-700">
                    {user.email}
                  </p>
                </div>

                
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4">
              <div className="space-y-2">

                <Link
                  href="/dashboard/enquiries"
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[#0F2747]"
                >
                  My Enquiries
                </Link>

                <Link
                  href="/dashboard/downloads"
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[#0F2747]"
                >
                  My Downloads
                </Link>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}