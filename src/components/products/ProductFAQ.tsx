"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ProductFAQProps {
  productName: string;
}

export default function ProductFAQ({
  productName,
}: ProductFAQProps) {
  const faqs = [
    {
      question: `What is ${productName}?`,
      answer: `${productName} is an industrial automation solution designed to improve safety, security and operational efficiency.`,
    },
    {
      question: `Where can ${productName} be installed?`,
      answer:
        "It can be installed at factories, warehouses, residential projects, commercial buildings, hospitals, IT parks and other industrial facilities.",
    },
    {
      question: `Is installation provided by Aven Automation?`,
      answer:
        "Yes. We provide complete supply, installation, testing and after-sales support.",
    },
    {
      question: `Is this product suitable for outdoor use?`,
      answer:
        "Yes. Our products are designed using high-quality materials suitable for demanding indoor and outdoor environments.",
    },
    {
      question: `How can I get a quotation?`,
      answer:
        "Simply fill out the enquiry form on this page and our technical team will contact you with the best solution.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-[#0F2747]">
        Frequently Asked Questions
      </h2>

      <div className="mt-6 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200"
          >
            <button
              onClick={() =>
                setOpen(open === index ? null : index)
              }
              className="flex w-full items-center justify-between p-5 text-left font-semibold"
            >
              {faq.question}

              <ChevronDown
                className={`h-5 w-5 transition ${
                  open === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {open === index && (
              <div className="border-t px-5 py-4 text-slate-600 leading-7">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}