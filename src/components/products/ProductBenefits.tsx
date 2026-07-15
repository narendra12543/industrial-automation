import {
  ShieldCheck,
  Wrench,
  Zap,
  BadgeCheck,
  Settings,
  Clock3,
} from "lucide-react";

interface ProductBenefitsProps {
  productName: string;
}

const benefits = [
  {
    icon: ShieldCheck,
    title: "Enhanced Safety",
    description:
      "Designed to improve operational safety with reliable automation.",
  },
  {
    icon: Zap,
    title: "High Performance",
    description:
      "Smooth and efficient operation with consistent long-term performance.",
  },
  {
    icon: Settings,
    title: "Easy Operation",
    description:
      "Simple to use with user-friendly controls and automation features.",
  },
  {
    icon: Wrench,
    title: "Low Maintenance",
    description:
      "Built using premium quality components for minimum maintenance.",
  },
  {
    icon: Clock3,
    title: "Long Service Life",
    description:
      "Engineered for durability even in demanding industrial environments.",
  },
  {
    icon: BadgeCheck,
    title: "Professional Installation",
    description:
      "Complete installation and technical support by Aven Automation.",
  },
];

export default function ProductBenefits({
  productName,
}: ProductBenefitsProps) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-[#0F2747]">
        Why Choose {productName}?
      </h2>

      <p className="mt-3 text-slate-600">
        Our {productName} solutions are designed to deliver reliability,
        efficiency and long-term performance for industrial and commercial
        applications.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {benefits.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2747]/10">
                <Icon className="h-6 w-6 text-[#0F2747]" />
              </div>

              <h3 className="font-semibold text-[#0F2747]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}