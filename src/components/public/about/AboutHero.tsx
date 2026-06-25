import Link from "next/link";
import {
  ChevronRight,
  Building2,
  ShieldCheck,
  Users,
  Headphones,
} from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-6">
      {/* Background */}

      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="
            h-full
            w-full
            bg-[linear-gradient(to_right,#0F2747_1px,transparent_1px),linear-gradient(to_bottom,#0F2747_1px,transparent_1px)]
            bg-[size:60px_60px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Breadcrumb */}

        
        <div className="grid items-center gap-6 lg:grid-cols-2">
          {/* Left */}

          <div>
            <div
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-orange-200
                bg-orange-50
                px-4
                text-sm
                font-medium
                text-orange-700
              "
            >
              Industrial Automation Experts
            </div>

            <h1 className="mt-6 text-4xl font-bold text-[#0F2747] md:text-5xl">
              About Our Company
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Delivering reliable industrial automation
              solutions and engineering excellence for
              modern industries. We specialize in
              automation systems, control panels,
              gate automation, rolling shutters,
              boom barriers and smart industrial
              technologies that improve efficiency,
              safety and productivity.
            </p>

            <p className="mt-4 text-slate-600">
              Our goal is to provide dependable,
              cost-effective and future-ready
              automation solutions that help
              businesses achieve operational
              excellence.
            </p>
          </div>

          {/* Right */}

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <Building2
                size={40}
                className="mb-4 text-[#0F2747]"
              />

              <h3 className="font-semibold text-[#0F2747]">
                Industrial Solutions
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Complete automation and entrance
                control systems for industries.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <ShieldCheck
                size={40}
                className="mb-4 text-[#0F2747]"
              />

              <h3 className="font-semibold text-[#0F2747]">
                Quality Assurance
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                High-quality products with
                reliable performance.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <Users
                size={40}
                className="mb-4 text-[#0F2747]"
              />

              <h3 className="font-semibold text-[#0F2747]">
                Experienced Team
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Skilled professionals focused on
                delivering successful projects.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <Headphones
                size={40}
                className="mb-4 text-[#0F2747]"
              />

              <h3 className="font-semibold text-[#0F2747]">
                Technical Support
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Dedicated assistance before and
                after project delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}