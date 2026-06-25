import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg sm:p-12">
          <div className="text-center">
            {/* Access Denied Icon */}
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
              <span className="text-5xl text-orange-600">
                🚫
              </span>
            </div>

            {/* Status Badge */}
            <div className="mb-6">
              <span className="inline-flex rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
                Access Restricted
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Unauthorized Access
            </h1>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
              You do not have permission to access this page.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              This area is restricted to authorized administrators.
              If you believe this is an error, please contact the
              system administrator.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg bg-[#0F2747] px-6 py-3 font-medium text-white transition hover:bg-[#163A68]"
              >
                Return Home
              </Link>

              <Link
                href="/dashboard/enquiries"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Go To Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}