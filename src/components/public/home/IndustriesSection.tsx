import {
  Factory,
  Package,
  UtensilsCrossed,
  Car,
  Pill,
  Droplets,
} from "lucide-react";

const industries = [
  {
    name: "Manufacturing",
    icon: Factory,
    description:
      "Automatic gates, industrial doors, dock levelers and entrance automation solutions for manufacturing plants.",
  },
  {
    name: "Packaging",
    icon: Package,
    description:
      "Reliable automation systems for warehouses, packaging units and logistics facilities.",
  },
  {
    name: "Food Processing",
    icon: UtensilsCrossed,
    description:
      "Hygienic, high-speed automation solutions designed for food processing and cold storage units.",
  },
  {
    name: "Automotive",
    icon: Car,
    description:
      "Heavy-duty industrial doors and automation systems built for automotive manufacturing and assembly plants.",
  },
  {
    name: "Pharmaceuticals",
    icon: Pill,
    description:
      "Clean and secure industrial automation solutions for pharmaceutical manufacturing facilities.",
  },
  {
    name: "Water Treatment",
    icon: Droplets,
    description:
      "Durable automation and access solutions for water treatment plants and utility infrastructure.",
  },
];

export default function IndustriesSection() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-3xl font-bold text-[#0F2747]">
          Industries We Serve
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="
                rounded-2xl
                border
                p-8
                text-center
                transition
                hover:shadow-lg
              "
            >
              <industry.icon
                size={42}
                className="mx-auto text-orange-500"
              />

              <h3 className="mt-4 font-semibold">
                {industry.name}
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}