"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { createContact } from "@/actions/contact/contact";


interface Product {
  id: string;
  name: string;
 
}

interface ContactFormProps {
  products: Product[];
}

export default function ContactForm({
  products,
}: ContactFormProps) {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [mobile, setMobile] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [productIds, setProductIds] = useState<string[]>([]);

  const [showProductSelector, setShowProductSelector] =
    useState(false);

  const [otherProductName, setOtherProductName] =
    useState("");

  const [city, setCity] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const selectorRef =
  useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(
          event.target as Node
        )
      ) {
        setShowProductSelector(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    if (productIds.length === 0) {
      setError("Please select product.");
      return;
    }

    if (
      productIds.includes("other") &&
      !otherProductName.trim()
    ) {
      setError("Please enter Other Product Name.");
      return;
    }
    
    try {
      setLoading(true);

      const response = await createContact({
        name,
        email,
        mobile,
        companyName,
        productIds,
        otherProductName,
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
      setProductIds([]);
      setOtherProductName("");
      setShowProductSelector(false);
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
         Get a Response from Our Industrial Automation Experts Within 24 Hours
        </span>

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
            px-3
            py-2
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
            px-3
            py-2
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
            px-3
            py-2
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
            px-3
            py-2
            text-sm
            outline-none
            transition
            focus:border-[#0F2747]
            focus:ring-2
            focus:ring-blue-100
          "
          />
        </div>

        {/* Select Product */}

        <div
          className={`grid gap-4 ${
            productIds.includes("other")
              ? "md:grid-cols-2"
              : "md:grid-cols-1"
          }`}
        >

        <div
          className="relative"
          ref={selectorRef}
        >

          <button
            type="button"
            onClick={() =>
              setShowProductSelector(
                !showProductSelector
              )
            }
            className="
              flex
              w-full
              items-center
              justify-between
              rounded-xl
              border
              border-slate-300
              bg-white
              px-3
              py-2
              text-left
              text-sm
              transition
              hover:border-[#0F2747]
              focus:border-[#0F2747]
              focus:ring-2
              focus:ring-blue-100
            "
          >
            <span
              className={`truncate ${
                productIds.length === 0
                  ? "text-slate-400"
                  : "text-slate-900"
              }`}
            >
              {productIds.length === 0
                ? "Select Products *"
                : (() => {
                    const selectedNames = products
                      .filter((product) =>
                        productIds.includes(product.id)
                      )
                      .map((product) => product.name);

                    if (
                      productIds.includes("other")
                    ) {
                      selectedNames.push("Other");
                    }

                    if (selectedNames.length <= 2) {
                      return selectedNames.join(", ");
                    }

                    return `${selectedNames
                      .slice(0, 2)
                      .join(", ")} +${
                      selectedNames.length - 2
                    }`;
                  })()}
            </span>

            <span className="text-sm">▼</span>
          </button>

          {showProductSelector && (
            <div
              className="
                absolute
                left-0
                right-0
                z-50
                mt-2
                h-48
                overflow-y-auto
                rounded-xl
                border
                border-slate-200
                bg-white
                p-3
                shadow-xl
              "
            >

              <div
                className={`grid gap-2 ${
                  productIds.includes("other")
                    ? "grid-cols-1"
                    : "md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {products.map((product) => (
                  <label
                    key={product.id}
                    className={`
                    flex
                    cursor-pointer
                    items-start
                    gap-2
                    rounded-lg
                    px-2
                    py-0
                    transition-all
                    ${
                      productIds.includes(product.id)
                        ? "bg-orange-0"
                        : "hover:bg-slate-50"
                    }
                    `}
                  >
                   <input
                      type="checkbox"
                      className="
                        mt-0.5
                        h-3
                        w-3
                        shrink-0
                        rounded
                        border-slate-300
                        accent-gray-500
                      "
                      checked={productIds.includes(
                        product.id
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setProductIds((prev) =>
                            prev.includes(product.id)
                              ? prev
                              : [...prev, product.id]
                          );
                        } else {
                          setProductIds(
                            productIds.filter(
                              (id) =>
                                id !== product.id
                            )
                          );
                        }
                      }}
                    />

                    <span className="text-sm leading-5 text-slate-700">
                      {product.name}
                    </span>
                  </label>
                ))}

                {/* Other */}

                <label
                  className={`
                    flex
                    cursor-pointer
                    items-start
                    gap-2
                    rounded-lg
                    px-2
                    py-0.5
                    transition-all
                    ${
                      productIds.includes("other")
                        ? "bg-orange-00"
                        : "hover:bg-slate-50"
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    className="
                      mt-0.5
                      h-3
                      w-3 
                      shrink-0
                      rounded
                      border-slate-300
                      accent-gray-500
                    "
                    checked={productIds.includes(
                      "other"
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setProductIds((prev) =>
                          prev.includes("other")
                            ? prev
                            : [...prev, "other"]
                        );
                        setShowProductSelector(false);
                      } else {
                        setProductIds(
                          productIds.filter(
                            (id) =>
                              id !== "other"
                          )
                        );

                        setOtherProductName("");
                      }
                    }}
                  />

                  <span className="text-sm leading-5 text-slate-700">
                    Other
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Other Product Name */}

        {productIds.includes("other") && (
          <div>
            <input
              type="text"
              placeholder="Please enter the other product name *"
              value={otherProductName}
              onChange={(e) =>
                setOtherProductName(e.target.value)
              }
              autoFocus
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-3
                py-2
                text-sm
                outline-none
                transition
                placeholder:text-slate-500
                focus:border-[#0F2747]
                focus:bg-white
                focus:ring-2
                focus:ring-blue-100
              "
            />
          </div>
        )}

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
          px-3
          py-2
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
          px-3
          py-2
          text-sm
          leading-3
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