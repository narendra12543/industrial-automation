import Link from "next/link";

import {
  getEnquiries,
  getFilteredEnquiryStats,
} from "@/actions/enquiries";

import EnquiryFilters from "@/components/enquiries/EnquiryFilters";
import EnquiryStatsCards from "@/components/enquiries/EnquiryStatsCards";

import RecentEnquiriesWidget from "@/components/enquiries/RecentEnquiriesWidget";

import {
  getRecentEnquiries,
} from "@/actions/enquiries";

import {
  getEnquiryAnalytics,
} from "@/actions/enquiries";

function getStatusBadgeClass(
  status: string
) {
  switch (status) {
    case "NEW":
      return "bg-blue-100 text-blue-700";

    case "CONTACTED":
      return "bg-yellow-100 text-yellow-700";

    case "QUOTATION_SENT":
      return "bg-purple-100 text-purple-700";

    case "NEGOTIATION":
      return "bg-orange-100 text-orange-700";

    case "WON":
      return "bg-green-100 text-green-700";

    case "LOST":
      return "bg-red-100 text-red-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

interface EnquiriesPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function EnquiriesPage({
  searchParams,
  
}: EnquiriesPageProps) {
  const params =
  await searchParams;

const search =
  params.search ?? "";

const status =
  params.status ?? "ALL";

const page = Number(
  params.page ?? "1"
);
const analytics =
  await getEnquiryAnalytics();

const result =
  await getEnquiries({
    search,
    status,
    page,
    limit: 10,
  });

const enquiries =
  result.enquiries;

const totalPages =
  result.totalPages;

const totalCount =
  result.totalCount;

const stats =
  await getFilteredEnquiryStats({
    search,
    status,
  });
const recentEnquiries =
  await getRecentEnquiries();
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0F2747]">
          Enquiry Management
        </h1>

        <p className="mt-2 text-slate-600">
          Manage customer enquiries and
          sales leads.
        </p>
      </div>

      {/* Stats */}
      {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Enquiries
          </p>
          <p className="mt-2 text-3xl font-bold text-[#0F2747]">
            {stats.totalEnquiries}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            New
          </p>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {stats.newEnquiries}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Contacted
          </p>
          <p className="mt-2 text-3xl font-bold text-yellow-600">
            {stats.contactedEnquiries}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Quotation Sent
          </p>
          <p className="mt-2 text-3xl font-bold text-purple-600">
            {stats.quotationSent}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Won
          </p>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {stats.won}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Lost
          </p>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {stats.lost}
          </p>
        </div>
      </div> */}
      {/* <EnquiryStatsCards
        analytics={analytics}
      /> */}

      <div className="grid gap-6 xl:grid-cols-2">
        {/* <StatusDistributionCard
          analytics={analytics}
        /> */}

        <RecentEnquiriesWidget
          enquiries={recentEnquiries}
        />
      </div>

      <EnquiryFilters
        initialSearch={search}
        initialStatus={status}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Total Results:

          <span className="ml-2 font-semibold text-[#0F2747]">
            {totalCount}
          </span>
        </p>
      </div>
      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        {enquiries.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-xl font-semibold text-[#0F2747]">
              No Enquiries Found
            </h3>

            <p className="mt-2 text-slate-600">
              Try changing search or filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F2747]">
                    Customer Name
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F2747]">
                    Product
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F2747]">
                    Mobile
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F2747]">
                    Email
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F2747]">
                    Quantity
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F2747]">
                    Status
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F2747]">
                    Created Date
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F2747]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {enquiries.map(
                  (enquiry) => (
                    <tr
                      key={enquiry.id}
                      className="border-t"
                    >
                      <td className="px-4 py-4">
                        {enquiry.name}
                      </td>

                      <td className="px-4 py-4">
                        {
                        enquiry.product?.name
                        }
                      </td>

                      <td className="px-4 py-4">
                        {
                          enquiry.mobile
                        }
                      </td>

                      <td className="px-4 py-4">
                        {
                          enquiry.email
                        }
                      </td>

                      <td className="px-4 py-4">
                        {
                          enquiry.quantity
                        }
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(
                            enquiry.status
                          )}`}
                        >
                          {
                            enquiry.status
                          }
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        {new Date(
                          enquiry.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-4">
                        <Link
                          href={`/admin/enquiries/${enquiry.id}`}
                          className="rounded-lg bg-[#0F2747] px-3 py-2 text-sm text-white"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={`/admin/enquiries?search=${search}&status=${status}&page=${page - 1}`}
              className="rounded-lg border border-[#0F2747] px-4 py-2 text-[#0F2747]"
            >
              Previous
            </Link>
          )}

          {Array.from(
            { length: totalPages },
            (_, index) => (
              <Link
                key={index}
                href={`/admin/enquiries?search=${search}&status=${status}&page=${index + 1}`}
                className={`rounded-lg px-4 py-2 ${
                  page === index + 1
                    ? "bg-[#0F2747] text-white"
                    : "border border-[#0F2747] text-[#0F2747]"
                }`}
              >
                {index + 1}
              </Link>
            )
          )}

          {page < totalPages && (
            <Link
              href={`/admin/enquiries?search=${search}&status=${status}&page=${page + 1}`}
              className="rounded-lg border border-[#0F2747] px-4 py-2 text-[#0F2747]"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}