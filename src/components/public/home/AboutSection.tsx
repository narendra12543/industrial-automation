import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-white py-10">
      {/* Background Decoration */}

      <div className="absolute -top-24 left-0 h-80 w-80 rounded-full bg-orange-100 blur-3xl" />

      <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-blue-100 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left Image */}

          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/images/about-company.png"
              alt="Industrial Automation Team"
              width={700}
              height={520}
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>

          {/* Right Content */}

          <div>
            <span
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-orange-200
                bg-orange-50
                px-4
                py-2
                text-sm
                font-semibold
                text-orange-600
              "
            >
              About Our Company
            </span>

            <h2 className="mt-2 text-3xl font-bold text-[#0F2747]">
              Industrial Automation
              <br />
              Solutions Partner
            </h2>

            <p className="mt-2 text-md leading-8 text-slate-600">
              Industrial Automation Solutions is a trusted provider of
              advanced automation technologies for manufacturing plants,
              warehouses, commercial buildings and industrial
              infrastructure. We help businesses improve productivity,
              safety and operational efficiency through reliable
              engineering solutions.
            </p>

            <p
              className="
                text-md
                leading-8
                text-slate-600
              "
            >
              From PLC & SCADA systems,
              Industrial Control Panels,
              Gate Automation, Rolling
              Shutters, Boom Barriers,
              Automatic Doors and customized
              engineering solutions, our
              products are trusted by
              businesses throughout India
              to meet modern industry
              requirements{" "}

              <Link
                href="/about#industries"
                className="
                  inline-flex
                  items-center
                  font-semibold
                  text-[#0F2747]
                  hover:text-red-500
                "
              >
                Read More...

              </Link>
            </p>

            <Link
              href="/about"
              className="
                group
                mt-3
                inline-flex
                items-center
                rounded-xl
                bg-[#0F2747]
                px-7
                py-3
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-orange-500
                hover:shadow-xl
              "
            >
              Learn About

              <ArrowRight
                size={18}
                className="
                  ml-3
                  transition-transform
                  duration-300
                  group-hover:translate-x-2
                "
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}