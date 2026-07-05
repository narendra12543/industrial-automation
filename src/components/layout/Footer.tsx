import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

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
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-xs font-bold text-[#0F2747] sm:h-10 sm:w-10 sm:text-sm">
                IAS
              </div>

              <div>
                <h3 className="text-xs font-bold leading-tight sm:text-sm">
                  Industrial Automation
                </h3>
                <p className="text-[11px] text-slate-400 sm:text-xs">
                  Solutions
                </p>
              </div>
            </div>

            <p className="mt-3 max-w-xs text-xs leading-5 text-slate-400 sm:mt-4 sm:text-sm sm:leading-6">
              Smart industrial automation, gate automation, boom barriers,
              rolling shutters and engineering solutions for modern
              industries.
            </p>
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
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide sm:mb-4 sm:text-sm">
              <span className="h-3.5 w-1 rounded-full bg-orange-500" />
              Contact
            </h3>

            <div className="space-y-2 text-xs text-slate-400 sm:space-y-3 sm:text-sm">
              <a
                href="tel:+917057748540"
                className="flex items-center gap-2.5 transition hover:text-white sm:gap-3"
              >
                <Phone size={14} className="shrink-0 text-orange-400 sm:size-[15px]" />
                +91 7057748540
              </a>

              <a
                href="mailto:info@company.com"
                className="flex items-center gap-2.5 transition hover:text-white sm:gap-3"
              >
                <Mail size={14} className="shrink-0 text-orange-400 sm:size-[15px]" />
                info@company.com
              </a>

              <div className="flex items-start gap-2.5 sm:gap-3">
                <MapPin
                  size={14}
                  className="mt-0.5 shrink-0 text-orange-400 sm:size-[15px]"
                />
                Pune, Maharashtra, India
              </div>

              <a
                href="https://wa.me/917057748540"
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
          <div >© 2026 Industrial Automation Solutions. All rights reserved.</div>
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