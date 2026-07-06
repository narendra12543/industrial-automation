"use client";

import { useState } from "react";

import { createContact } from "@/actions/contact/contact";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  categoryId: string;
}

interface ContactFormProps {
  categories: Category[];
  products: Product[];
}

export default function ContactForm({
  categories,
  products,
}: ContactFormProps) {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [mobile, setMobile] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [productId, setProductId] = useState("");

  const [city, setCity] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const response = await createContact({
        name,
        email,
        mobile,
        companyName,
        categoryId,
        productId,
        city,
        message,
      });

      if (!response.success) {
        setError(response.message);

        return;
      }

      setSuccess("Your message has been submitted successfully.");

      setName("");
      setEmail("");
      setMobile("");
      setCompanyName("");
      setCategoryId("");
      setProductId("");
      setCity("");
      setMessage("");
    } catch {
      setError("Failed to submit message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
      rounded-2xl
      border
      border-slate-200
      bg-white/90
      p-6
      shadow-lg
      backdrop-blur-sm
    "
    >
      {/* Header */}

      <div className="mb-5">
        <span
          className="
          inline-flex
          rounded-full
          bg-orange-100
          px-3
          py-1
          text-xs
          font-semibold
          text-orange-600
        "
        >
          Quick Enquiry, our experts will contact you shortly.
        </span>

        <h2 className="mt-2 text-2xl font-bold text-[#0F2747]">
          Request a Quote
        </h2>
      </div>

      {/* Alerts */}

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name + Email */}

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Full Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            text-sm
            outline-none
            transition
            focus:border-[#0F2747]
            focus:ring-2
            focus:ring-blue-100
          "
          />

          <input
            type="email"
            placeholder="Email Address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            text-sm
            outline-none
            transition
            focus:border-[#0F2747]
            focus:ring-2
            focus:ring-blue-100
          "
          />
        </div>

        {/* Mobile + Company */}

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Mobile Number *"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            text-sm
            outline-none
            transition
            focus:border-[#0F2747]
            focus:ring-2
            focus:ring-blue-100
          "
          />

          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            text-sm
            outline-none
            transition
            focus:border-[#0F2747]
            focus:ring-2
            focus:ring-blue-100
          "
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setProductId("");
            }}
            className="
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              text-sm
              outline-none
              focus:border-[#0F2747]
              focus:ring-2
              focus:ring-blue-100
            "
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            disabled={!categoryId}
            className="
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              text-sm
              outline-none
              focus:border-[#0F2747]
              focus:ring-2
              focus:ring-blue-100
              disabled:bg-slate-100
            "
          >
            <option value="">Select Product</option>

            {products
              .filter((product) => product.categoryId === categoryId)
              .map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
          </select>
        </div>
        {/* City */}

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="
          w-full
          rounded-xl
          border
          border-slate-300
          px-4
          py-3
          text-sm
          outline-none
          transition
          focus:border-[#0F2747]
          focus:ring-2
          focus:ring-blue-100
        "
        />

        {/* Message */}
        <textarea
          rows={4}
          placeholder="Message *"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="
          w-full
          rounded-xl
          border
          border-slate-300
          px-4
          py-2
          text-sm
          leading-6
          outline-none
          transition
          resize-none
          focus:border-[#0F2747]
          focus:ring-2
          focus:ring-blue-100
        "
        />

        {/* Action Buttons */}

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="submit"
            disabled={loading}
            className="
            rounded-xl
            bg-[#0F2747]
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            shadow-md
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#173865]
            hover:shadow-lg
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
          >
            {loading ? "Submitting..." : "Send Message"}
          </button>

          <a
            href="https://wa.me/917057748540"
            target="_blank"
            rel="noopener noreferrer"
            className="
            rounded-xl
            border
            border-green-600
            bg-green-50
            px-5
            py-3
            text-center
            text-sm
            font-semibold
            text-green-700
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-green-400
            hover:text-white
            hover:shadow-lg
          "
          >
            WhatsApp Us
          </a>
        </div>
      </form>
    </div>
  );
}
