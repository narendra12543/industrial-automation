"use client";

import { useState } from "react";

interface ProductDescriptionProps {
  description: string;
}

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  const [expanded, setExpanded] =
    useState(false);

  return (
    <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="mb-5 text-2xl font-bold text-[#0F2747]">
        Introduction
      </h2>

      <div
        className={`leading-7 whitespace-pre-line text-slate-700 ${
          expanded ? "" : "line-clamp-5"
        }`}
      >
        {description}
      </div>

      {description.length > 400 && (
        <button
          type="button"
          onClick={() =>
            setExpanded(!expanded)
          }
          className="mt-4 font-semibold text-[#0F2747] hover:text-red-500"
        >
          {expanded
            ? "Read Less..."
            : "Read More..."}
        </button>
      )}
    </section>
  );
}