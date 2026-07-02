"use client";

import { useState } from "react";

import { createEnquiry } from "@/actions/enquiries";
import { createEnquirySchema } from "@/validations/enquiry";
import { useRouter } from "next/navigation";

interface ProductEnquiryFormProps {
  productId: string;
  userName?: string;
  userEmail?: string;
  isAuthenticated: boolean;
}

export default function ProductEnquiryForm({
  productId,
  userName = "",
  userEmail = "",
  isAuthenticated,
}: ProductEnquiryFormProps) {
  const [name, setName] =
    useState(userName);

  const [email, setEmail] =
    useState(userEmail);

  const [mobile, setMobile] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  const [city, setCity] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");
  
  const router = useRouter();

  const REQUIRE_LOGIN_FOR_ENQUIRY = false;

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();


if (REQUIRE_LOGIN_FOR_ENQUIRY && !isAuthenticated) {
  setError("Please login to submit an enquiry.");

  const callbackUrl =
    `${window.location.pathname}#enquiry`;

  setTimeout(() => {
    router.push(
      `/login?callbackUrl=${encodeURIComponent(
        callbackUrl
      )}`
    );
  }, 1500);

  return;
}
    setError("");
    setSuccess("");

    const validation =
      createEnquirySchema.safeParse({
        productId,
        name,
        email,
        mobile,
        quantity,
        city,
        message,
      });

    if (!validation.success) {
      setError(
        validation.error.issues[0]?.message ??
          "Invalid enquiry data."
      );

      return;
    }

    try {
      setLoading(true);

      const response =
        await createEnquiry({
          productId,
          name,
          email,
          mobile,
          quantity,
          city,
          message,
        });

      if (!response.success) {
        setError(response.message);
        return;
      }

      setSuccess(
        "Your enquiry has been submitted successfully."
      );

      setMobile("");
      setQuantity(1);
      setCity("");
      setMessage("");
    } catch {
      setError(
        "Failed to submit enquiry."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" rounded-2xl border border-slate-200 bg-slate-100 p-8 shadow-lg">
      

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#0F2747]">
              Name *
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-[#0F2747] placeholder:text-slate-400 outline-none focus:border-[#0F2747]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#0F2747]">
              Email *
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-[#0F2747] placeholder:text-slate-400 outline-none focus:border-[#0F2747]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#0F2747]">
              Mobile *
            </label>

            <input
              type="text"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-[#0F2747] placeholder:text-slate-400 outline-none focus:border-[#0F2747]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#0F2747]">
              Quantity *
            </label>

            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Number(e.target.value)
                )
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-[#0F2747] placeholder:text-slate-400 outline-none focus:border-[#0F2747]"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#0F2747]">
            City
          </label>

          <input
            type="text"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-[#0F2747] placeholder:text-slate-400 outline-none focus:border-[#0F2747]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#0F2747]">
            Message
          </label>

          <textarea
            rows={5}
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-[#0F2747] placeholder:text-slate-400 outline-none focus:border-[#0F2747]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[#0F2747] px-6 py-3 font-medium text-white transition hover:bg-[#18385F] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {REQUIRE_LOGIN_FOR_ENQUIRY && !isAuthenticated
            ? "Login to Send Enquiry"
            : loading
              ? "Submitting..."
              : "Send Enquiry"}
        </button>
      </form>
    </div>
  );
}