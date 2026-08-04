"use client";

import { Phone, Mail, BadgeCheck } from "lucide-react";

interface TopInfoBarProps {
  show: boolean;
}

export default function TopInfoBar({ show }: TopInfoBarProps) {
  return (
    <div
      className="
        relative
        flex
        h-11
        w-full
        items-center
        px-4
    "
    >
      {/* Email + Phone + Social Icons - truly centered on the bar */}
      <div
        className="
        absolute
        left-1/2
        -translate-x-1/2
        flex
        items-center
        gap-8
      "
      >
        {/* GST */}

       <div
  className="
    hidden
    lg:flex
    items-center
    gap-2
    text-sm
    font-medium
    text-[#0F2747]
    whitespace-nowrap
  "
>
  <BadgeCheck size={16} className="shrink-0 text-orange-500" />

  <span className="whitespace-nowrap">GST : 27ASKPN4656P1ZU</span>
</div>

        {/* Email */}

        <a
          href="mailto:sales@avenautomation.in"
          className="
          flex
          items-center
          gap-2
          text-sm
          font-medium
          text-[#0F2747]
          transition-all
          duration-300
          hover:text-orange-600
        "
        >
          <Mail size={16} className="text-orange-500" />

          <span className="hidden sm:block">sales@avenautomation.in</span>

          <span className="sm:hidden">Email</span>
        </a>

        {/* Phone */}

        <a
          href="tel:+918766918892"
          className="
          flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-[#0F2747]
          whitespace-nowrap
          transition-all
          duration-300
          hover:text-orange-600
        "
        >
          <Phone size={16} className="text-orange-500" />
          +91 8766918892
        </a>

        {/* Social Icons */}

        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            bg-[#1877F2]
            text-white
            transition-transform
            duration-300
            hover:scale-110
          "
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.988h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            bg-[#0A66C2]
            text-white
            transition-transform
            duration-300
            hover:scale-110
          "
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.558V9h3.556v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            bg-gradient-to-tr
            from-yellow-400
            via-pink-500
            to-purple-600
            text-white
            transition-transform
            duration-300
            hover:scale-110
          "
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.163 6.163 0 1 0 0 12.326 6.163 6.163 0 0 0 0-12.326zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>

          {/* <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            bg-[#FF0000]
            text-white
            transition-transform
            duration-300
            hover:scale-110
          "
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a> */}
        </div>
      </div>
    </div>
  );
}