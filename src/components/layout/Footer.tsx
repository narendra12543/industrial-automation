import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F2747] text-white">
      <div className="mx-auto max-w-7xl px-4 py-2">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 pt-2">
          {/* Company */}

          <div>
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  bg-white
                  font-bold
                  text-[#0F2747]
                "
              >
                IAS
              </div>

              <div>
                <h3 className="font-bold">
                  Industrial Automation
                </h3>

                <p className="text-xs text-slate-300">
                  Solutions
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              Smart industrial automation,
              gate automation, boom
              barriers, rolling shutters
              and engineering solutions
              for modern industries.
            </p>

            
          </div>

        {/* Products */}

          <div>
            <h3 className="mb-4 font-semibold">
              Solutions
            </h3>

            <div className="space-y-2 text-sm text-slate-300">
              <p>Automatic Monitoring</p>
              <p>Automatic Doors</p>
              <p>Gate Automation</p>
              <p>Boom Barriers</p>
              <p>Rolling Shutters</p>
              
            </div>
          </div>
          {/* Quick Links */}

          <div>
            <h3 className="mb-4 font-semibold">
              Quick Links
            </h3>

            <div className="space-y-2">
              <Link
                href="/"
                className="block text-sm text-slate-300 transition hover:text-white"
              >
                
                
              </Link>

              <Link
                href="/about"
                className="block text-sm text-slate-300 transition hover:text-white"
              >
                About
              </Link>

              <Link
                href="/products"
                className="block text-sm text-slate-300 transition hover:text-white"
              >
                Products
              </Link>

              <Link
                href="/projects"
                className="block text-sm text-slate-300 transition hover:text-white"
              >
                Projects
              </Link>

              <Link
                href="/contact"
                className="block text-sm text-slate-300 transition hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>


          {/* Contact */}

          <div>
            <h3 className="mb-4 font-semibold">
              Contact Information
            </h3>

            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <Phone size={16} />

                <span>
                  +91 7057748540
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} />

                <span>
                  info@company.com
                </span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={16} />

                <span>
                  Pune Maharashtra,
                  India
                </span>
              </div>
              <a
              href="https://wa.me/917057748540"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-4
                inline-flex
                items-center
                rounded-lg
                bg-orange-500
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-orange-600
              "
            >
              Chat on WhatsApp

              <ArrowRight
                size={16}
                className="ml-2"
              />
            </a>
            </div>
          </div>
        </div>

        <div
          className="
            mt-2
            border-t
            border-slate-700
            pt-3
            text-center
            text-xs
            text-slate-400
            flex
            flex-col
            gap-1
          "
        >
          <div>© 2026 Industrial Automation Solutions. All Rights Reserved.</div>
          <div>
            Designed and developed by{" "}
            <a 
              href="https://bytefluxtech.in/" 
              className=" text-white hover:text-white font-bold transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              
            >
              BytefluxTechnologies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}