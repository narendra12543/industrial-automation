const steps = [
  {
    title: "Consultation",
    description:
      "We understand your industrial automation requirements and site conditions.",
  },
  {
    title: "Planning",
    description:
      "Our experts prepare a customized automation solution for your facility.",
  },
  {
    title: "Implementation",
    description:
      "Professional installation, testing and commissioning.",
  },
  {
    title: "Support",
    description:
      "Long-term maintenance and technical support across India.",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-3xl font-bold text-[#0F2747]">
          Our Working Process
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="
                rounded-2xl
                border
                bg-white
                p-8
                text-center
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-[#0F2747]
                  text-white
                  font-bold
                "
              >
                {index + 1}
              </div>

              <h3 className="mt-4 font-semibold">
                {step.title}
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}