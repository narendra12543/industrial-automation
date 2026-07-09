import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Headphones,
  Settings,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}

      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt="Industrial Automation"
          fill
          priority
          className="object-cover object-center"
        />

        {/* White Overlay */}

        <div className="absolute inset-0" />

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 via-[42%] to-transparent" />
      </div>

      {/* Background Decoration */}

      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="
            h-full
            w-full
            bg-[size:60px_60px]
          "
        />
      </div>

      <div className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-orange-100 blur-3xl" />

      <div className="absolute right-0 top-0 h-72 w-72 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8 lg:py-2">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.6fr)_380px] lg:items-start">
          {/* Left Content */}

          <div>
            
            <div
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-orange-200
                bg-orange-50/90
                px-4
                py-2
                text-sm
                font-medium
                text-orange-700
                backdrop-blur-sm
              "
            >
              Aven Industrial automation
            </div>

            <h1
              className="
                mt-4
                mb-4
                text-center
                text-3xl
                font-extrabold
                leading-tight
                md:text-4xl
                lg:text-4xl
                bg-gradient-to-r
                from-[#0F2747]
                via-[#0e2849]
                to-[#0F2747]
                bg-clip-text
                text-transparent
                animate-[fadeUp_1s_ease-out]
              "
            >
              Smart Aven Industrial automation
              <br />
              For Modern Manufacturing
            </h1>
            <h2
              className="
                mx-auto
                mt-2
                max-w-3xl
                bg-white/15
                px-8
                py-2
                text-center
                text-[17px]
                font-medium
                leading-9
                text-[#0a1b31]
              
              "
            >
              We specialize in delivering advanced industrial automation
              solutions for manufacturing plants, warehouses, commercial
              facilities and infrastructure projects. Our expertise includes PLC
              & SCADA systems, electrical control panels, Industrial IoT
              integration, VFD drives, sensors, HMI solutions, gate automation,
              boom barriers, rolling shutters, access control systems and
              customized engineering services, helping businesses improve
              productivity, safety and operational efficiency.
            </h2>

            {/* CTA */}

            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/products"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#0F2747]
                  bg-white/95
                  px-6
                  py-3
                  font-semibold
                  text-[#0F2747]
                  shadow-md
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#0F2747]
                  hover:text-white
                  hover:shadow-xl
                "
              >
                Explore Products
                <ArrowRight
                  size={18}
                  className="
                    ml-2
                    transition-transform
                    duration-300
                    group-hover:translate-x-2
                  "
                />
              </Link>
            </div>

            {/* Trust Points */}

            {/* <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-green-600" />
                <span className="text-sm font-medium">Experienced Team</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-green-600" />
                <span className="text-sm font-medium">Quality Products</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-green-600" />
                <span className="text-sm font-medium">Technical Support</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-green-600" />
                <span className="text-sm font-medium">Fast Response</span>
              </div>
            </div> */}
          </div>

          {/* Right Side Assistance Card */}
        </div>
      </div>
    </section>
  );
}
