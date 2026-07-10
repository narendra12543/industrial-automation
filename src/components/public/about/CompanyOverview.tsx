export default function CompanyOverview() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          
          <div className="rounded-2xl border p-8">
            <h3 className="mb-4 text-2xl font-bold text-[#0F2747]">
              Our Mission
            </h3>

            <p className="text-slate-600">
              To help industries improve
              productivity, efficiency and
              operational excellence
              through innovative
              automation solutions.
            </p>
          </div>

          <div className="rounded-2xl border p-8">
            <h3 className="mb-4 text-2xl font-bold text-[#0F2747]">
              Our Vision
            </h3>

            <p className="text-slate-600">
              To become a trusted
              trusted Industrial Entrance
              Automation company known for quality,
              innovation and customer
              satisfaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}