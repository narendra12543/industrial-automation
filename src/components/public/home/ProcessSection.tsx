import { Phone, ClipboardList, Wrench, Headphones } from "lucide-react";

const steps = [
  {
    title: "Consultation",
    description:
      "We understand your industrial automation requirements and site conditions.",
    icon: Phone,
  },
  {
    title: "Planning",
    description:
      "Our experts prepare a customized automation solution for your facility.",
    icon: ClipboardList,
  },
  {
    title: "Implementation",
    description:
      "Professional installation, testing and commissioning.",
    icon: Wrench,
  },
  {
    title: "Support",
    description:
      "Long-term maintenance and technical support across India.",
    icon: Headphones,
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-3xl font-bold text-[#0F2747]">
          Our Working Process
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-500">
          A streamlined, four-step approach designed for reliable, on-time
          automation delivery.
        </p>

        <div className="relative mt-14 grid gap-6 md:grid-cols-4">
          {/* connecting line for desktop */}
          <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-slate-200 md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="
                  group
                  relative
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-8
                  text-center
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#0F2747]/20
                  hover:shadow-xl
                "
              >
                {/* Number badge */}
                <div
                  className="
                    relative
                    z-10
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#0F2747]
                    to-[#1B3A63]
                    text-2xl
                    font-extrabold
                    text-white
                    shadow-md
                    shadow-[#0F2747]/20
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Icon + Title in one row */}
                <div className="mt-5 flex items-center justify-center gap-1">
                  <Icon
                    className="h-5 w-5 shrink-0 text-[#0F2747]/70"
                    strokeWidth={1.75}
                  />
                  <h3 className="text-lg font-semibold text-slate-800">
                    {step.title}
                  </h3>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>

                {/* bottom accent line */}
                <div
                  className="
                    mx-auto
                    mt-5
                    h-1
                    w-8
                    rounded-full
                    bg-[#0F2747]/15
                    transition-all
                    duration-300
                    group-hover:w-12
                    group-hover:bg-[#0F2747]
                  "
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}