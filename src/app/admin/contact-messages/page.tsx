import Link from "next/link";

import {
  getContactMessages,
  getContactMessageStats,
  ContactMessageWithProducts,
} from "@/actions/contact/contact";

interface ContactMessagesPageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export default async function ContactMessagesPage({
  searchParams,
}: ContactMessagesPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";
  const page = Number(params.page ?? "1");

  const stats = await getContactMessageStats();

  const result = await getContactMessages({
    search,
    page,
    limit: 10,
  });

  const messages = result.messages;
  const totalPages = result.totalPages;
  const totalCount = result.totalCount;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0F2747]">
          Contact Form Submissions
        </h1>
        <p className="mt-2 text-slate-600">
          View messages submitted through the website contact form.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Messages</p>
          <p className="mt-2 text-3xl font-bold text-[#0F2747]">
            {stats.totalMessages}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Today</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {stats.todayMessages}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">This Week</p>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {stats.weekMessages}
          </p>
        </div>
      </div>

      {/* Search */}
      <form className="flex gap-3">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search by name, email, mobile, city..."
          className="w-full max-w-md rounded-lg border px-4 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-lg bg-[#0F2747] px-4 py-2 text-sm text-white"
        >
          Search
        </button>
      </form>

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
        {messages.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-xl font-semibold text-[#0F2747]">
              No Messages Found
            </h3>
            <p className="mt-2 text-slate-600">
              Try changing search filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F2747]">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F2747]">
                    Company
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F2747]">
                    Mobile
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F2747]">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F2747]">
                    Products
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F2747]">
                    City
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F2747]">
                    Message
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#0F2747]">
                    Received
                  </th>
                </tr>
              </thead>

              <tbody>
                {messages.map((msg: ContactMessageWithProducts) => (
                  <tr key={msg.id} className="border-t align-top">
                    <td className="px-4 py-4">{msg.name}</td>
                    <td className="px-4 py-4">{msg.companyName ?? "-"}</td>
                    <td className="px-4 py-4">{msg.mobile}</td>
                    <td className="px-4 py-4">{msg.email}</td>
                    <td className="px-4 py-4">
                      {msg.productNames || msg.otherProductName || "-"}
                    </td>
                    <td className="px-4 py-4">{msg.city ?? "-"}</td>
                    <td className="max-w-xs px-4 py-4 truncate" title={msg.message}>
                      {msg.message}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={`/admin/contact-messages?search=${search}&page=${page - 1}`}
              className="rounded-lg border border-[#0F2747] px-4 py-2 text-[#0F2747]"
            >
              Previous
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, index) => (
            <Link
              key={index}
              href={`/admin/contact-messages?search=${search}&page=${index + 1}`}
              className={`rounded-lg px-4 py-2 ${
                page === index + 1
                  ? "bg-[#0F2747] text-white"
                  : "border border-[#0F2747] text-[#0F2747]"
              }`}
            >
              {index + 1}
            </Link>
          ))}

          {page < totalPages && (
            <Link
              href={`/admin/contact-messages?search=${search}&page=${page + 1}`}
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