import Link from "next/link";

import {
  getEnquiryById,
} from "@/actions/enquiries";

import EnquiryStatusForm from "@/components/enquiries/EnquiryStatusForm";

interface EnquiryDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

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

export default async function EnquiryDetailsPage({
  params,
}: EnquiryDetailsPageProps) {
  const { id } = await params;

  const enquiry =
    await getEnquiryById(id);

  if (!enquiry) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0F2747]">
            Enquiry Not Found
          </h1>

          <p className="mt-2 text-slate-600">
            The requested enquiry does
            not exist.
          </p>
        </div>

        <Link
          href="/admin/enquiries"
          className="inline-flex rounded-lg bg-[#0F2747] px-5 py-3 text-white"
        >
          Back to Enquiries
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0F2747]">
            Enquiry Details
          </h1>

          <p className="mt-2 text-slate-600">
            View customer enquiry and
            lead information.
          </p>
        </div>

        <Link
          href="/admin/enquiries"
          className="inline-flex rounded-lg bg-[#0F2747] px-5 py-3 text-white"
        >
          Back to Enquiries
        </Link>
      </div>

      {/* Customer Information */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-[#0F2747] px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Customer Information
          </h2>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">
              Name
            </p>

            <p className="mt-1 font-semibold text-[#0F2747]">
              {enquiry.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Email
            </p>

            <p className="mt-1 font-semibold text-[#0F2747]">
              {enquiry.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Mobile
            </p>

            <p className="mt-1 font-semibold text-[#0F2747]">
              {enquiry.mobile}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              City
            </p>

            <p className="mt-1 font-semibold text-[#0F2747]">
              {enquiry.city ??
                "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-[#0F2747] px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Product Information
          </h2>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">
              Product Name
            </p>

            <p className="mt-1 font-semibold text-[#0F2747]">
              {
                enquiry.product
                  ?.name
              }
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Category
            </p>

            <p className="mt-1 font-semibold text-[#0F2747]">
              {
                enquiry.product
                  ?.category
                  ?.name
              }
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Status
            </p>

            {enquiry.product
              ?.isActive ? (
              <span className="mt-1 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                Active
              </span>
            ) : (
              <span className="mt-1 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                Inactive
              </span>
            )}
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-4">
          <Link
            href={`/admin/products/${enquiry.productId}/edit`}
            className="inline-flex rounded-lg border border-[#0F2747] px-4 py-2 text-[#0F2747]"
          >
            View Product
          </Link>
        </div>
      </div>

      {/* Enquiry Information */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-[#0F2747] px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Enquiry Information
          </h2>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">
              Quantity
            </p>

            <p className="mt-1 font-semibold text-[#0F2747]">
              {
                enquiry.quantity
              }
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Current Status
            </p>

            <div className="mt-1">
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusBadgeClass(
                  enquiry.status
                )}`}
              >
                {
                  enquiry.status
                }
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Created Date
            </p>

            <p className="mt-1 font-semibold text-[#0F2747]">
              {new Date(
                enquiry.createdAt
              ).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Updated Date
            </p>

            <p className="mt-1 font-semibold text-[#0F2747]">
              {new Date(
                enquiry.updatedAt
              ).toLocaleString()}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-slate-500">
              Message
            </p>

            <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="whitespace-pre-line text-[#0F2747]">
                {enquiry.message ??
                  "No message provided."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <EnquiryStatusForm
        enquiryId={enquiry.id}
        currentStatus={enquiry.status}
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between bg-[#0F2747] px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
            Status History
            </h2>
        </div>

        <div className="p-6">
            <p className="mb-3 text-sm text-slate-500">
            Current Status
            </p>

            <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusBadgeClass(
                enquiry.status
            )}`}
            >
            {enquiry.status}
            </span>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-[#0F2747]">
                Workflow:
            </p>

            <p className="mt-2 text-sm text-slate-600">
                NEW → CONTACTED →
                QUOTATION_SENT →
                NEGOTIATION → WON
            </p>

            <p className="mt-2 text-sm text-slate-600">
                OR
            </p>

            <p className="mt-2 text-sm text-slate-600">
                NEW → CONTACTED →
                LOST
            </p>
            </div>
        </div>
        </div>
      
      
    </div>
  );
}