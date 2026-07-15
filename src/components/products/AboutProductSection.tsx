interface AboutProductSectionProps {
  productName: string;
  category?: string;
}

export default function AboutProductSection({
  productName,
  category,
}: AboutProductSectionProps) {
  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-[#0F2747]">
        About {productName}
      </h2>

      <div className="mt-5 space-y-5 text-justify leading-6 text-slate-700">
        <p>
          <strong>{productName}</strong> is a premium{" "}
          {category ?? "industrial automation"} solution designed to deliver
          reliable performance, enhanced safety and long-term durability for
          industrial, commercial and residential applications. It is engineered
          using high-quality components to ensure smooth operation even in
          demanding environments.
        </p>

        <p>
          At <strong>Aven Automation</strong>, we provide complete supply,
          installation, testing and after-sales support for {productName}.
          Every solution is selected according to the customer’s operational
          requirements to achieve maximum efficiency, security and convenience.
        </p>

        <p>
          Our automation systems are widely used in factories, warehouses,
          logistics parks, commercial buildings, residential communities,
          hospitals, educational institutes and infrastructure projects across Pune, 
          Maharashtra and India. We focus on delivering dependable automation
          solutions with professional installation and technical support.
        </p>
      </div>
    </section>
  );
}