import Image from "next/image";
import {
  Factory,
  CheckCircle2,
} from "lucide-react";

export default function AboutIndustries() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Left Image */}

          <div className="relative">

            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-slate-100
                shadow-xl
              "
            >
              <div className="relative h-[520px]">

                <Image
                  src="/about/about.png"
                  alt="Industrial Automation"
                  fill
                  className="object-cover"
                />

              </div>
            </div>

          </div>

          {/* Right Content */}

          <div>

            <span
              className="
                inline-flex
                rounded-full
                bg-orange-50
                px-4
                py-2
                text-sm
                font-semibold
                text-orange-700
              "
            >
              Industries We Serve
            </span>

            <h2
              className="
                mt-5
                text-3xl
                font-bold
                leading-tight
                text-[#0F2747]
              "
            >
              Automation Solutions For
              Diverse Industrial Sectors
            </h2>

            <p
              className="
                text-md
                leading-8
                text-slate-600
              "
            >
              We provide complete industrial
              automation solutions designed
              to improve productivity,
              operational efficiency and
              workplace safety across
              multiple industries.
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
              businesses throughout India.
            </p>

            {/* Industries */}

            <div className="mt-4 grid gap-4 sm:grid-cols-2">

              {[
                "Manufacturing Plants",
                "Warehouses & Logistics",
                "Commercial Buildings",
                "Automotive Industry",
                "Food Processing",
                "Pharmaceutical Industry",
                "Water Treatment Plants",
                "Infrastructure Projects",
              ].map((industry) => (

                <div
                  key={industry}
                  className="flex items-center gap-3"
                >

                  <CheckCircle2
                    size={20}
                    className="text-green-600"
                  />

                  <span className="font-medium text-slate-700">
                    {industry}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}