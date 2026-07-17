import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

const solutions = [
  "Automatic Monitoring",
  "Automatic Doors",
  "Gate Automation",
  "Boom Barriers",
  "Rolling Shutters",
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0F2747] text-white">
      {/* Accent top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-5">
        <div className="grid grid-cols-2 gap-6 gap-y-8 lg:grid-cols-4 lg:gap-8 lg:gap-y-10">
          {/* Company */}
          <div>
            {/* Company */}
            <div>
              <Link
                href="/"
                className="flex items-center gap-1.5"
              >
                {/* Logo */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm sm:h-12 sm:w-12">
                  <Image
                    src="/aven-logo.png"
                    alt="Aven Automation"
                    width={44}
                    height={44}
                    className="h-[32px] w-[32px] object-contain sm:h-[38px] sm:w-[38px]"
                  />
                </div>

                  {/* Company Name */}
                  <div className="flex flex-col justify-center">
                    <h1 className="text-base font-extrabold tracking-tight text-white leading-none sm:text-lg">
                      Aven
                    </h1>

                    <span
                      className="mt-1 font-medium uppercase text-slate-400"
                      style={{
                        fontSize: "7px",
                        letterSpacing: "0.14em",
                        WebkitTextSizeAdjust: "100%",
                        textSizeAdjust: "100%",
                      }}
                    >
                      Industrial Automation
                    </span>
                  </div>
                </Link>

                <p className="mt-3 max-w-xs text-xs leading-5 text-slate-400 sm:mt-4 sm:text-sm sm:leading-6">
                  Smart industrial automation, gate automation, boom barriers,
                  rolling shutters and engineering solutions for modern
                  industries.
                </p>
              </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide sm:mb-4 sm:text-sm">
              <span className="h-3.5 w-1 rounded-full bg-orange-500" />
              Solutions
            </h3>

            <div className="space-y-1.5 text-xs text-slate-400 sm:space-y-2.5 sm:text-sm">
              {solutions.map((item) => (
                <p key={item} className="transition hover:text-white">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide sm:mb-4 sm:text-sm">
              <span className="h-3.5 w-1 rounded-full bg-orange-500" />
              Quick Links
            </h3>

            <div className="space-y-1.5 text-xs sm:space-y-2.5 sm:text-sm">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-slate-400 transition hover:translate-x-0.5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* Follow Us On - Mobile only */}
              <div className="flex sm:hidden items-center gap-2.5 pt-2">
                

                <div className="flex items-center gap-2"  >
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1877F2] text-white transition-transform duration-300 hover:scale-110"
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
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0A66C2] text-white transition-transform duration-300 hover:scale-110"
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
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white transition-transform duration-300 hover:scale-110"
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
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF0000] text-white transition-transform duration-300 hover:scale-110"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a> */}
                </div>
              </div>
          </div>

          

          {/* Contact */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide sm:mb-4 sm:text-sm">
              <span className="h-3.5 w-1 rounded-full bg-orange-500" />
              Contact
            </h3>

            <div className="space-y-2 text-xs text-slate-400 sm:space-y-3 sm:text-sm">
              <a
                href="tel:+918766918892"
                className="flex items-center gap-2.5 transition hover:text-white sm:gap-3"
              >
                <Phone size={14} className="shrink-0 text-orange-400 sm:size-[15px]" />
                +91 8766918892
              </a>

              <a
                href="mailto:info@avenautomation.in"
                className="flex items-center gap-2.5 transition hover:text-white sm:gap-3"
              >
                <Mail size={14} className="shrink-0 text-orange-400 sm:size-[15px]" />
                info@avenautomation.in
              </a>
              <a
                href="mailto:sales@avenautomation.in"
                className="flex items-center gap-2.5 transition hover:text-white sm:gap-3"
              >
                <Mail size={14} className="shrink-0 text-orange-400 sm:size-[15px]" />
                sales@avenautomation.in
              </a>

              <div className="flex items-start gap-2.5 sm:gap-3">
                <MapPin
                  size={14}
                  className="mt-0.5 shrink-0 text-orange-400 sm:size-[15px]"
                />
                Pune, Maharashtra, India
              </div>

              <a
                href="https://wa.me/918766918892"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 inline-flex items-center rounded-lg bg-orange-500 px-3.5 py-1.5 text-xs font-medium text-white transition duration-300 hover:bg-orange-600 sm:mt-3 sm:px-4 sm:py-2 sm:text-sm"
              >
                Chat on WhatsApp
                <ArrowRight
                  size={14}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1 sm:size-4"
                />
              </a>

              
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-4 flex flex-col items-center gap-1 border-t border-white/10 pt-4 text-center text-[11px] text-slate-400 sm:mt-10 sm:gap-1.5 sm:pt-4 sm:text-xs sm:flex-row sm:justify-between sm:text-left lg:mt-4">
          <div >© 2026 Aven Industrial automation. All rights reserved.</div>
          <div>
            Designed and developed by{" "}
            <a
              href="https://bytefluxtech.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white transition-colors hover:text-orange-400"
            >
              Byteflux Technologies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}