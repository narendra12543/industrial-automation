import { CheckCircle2 } from "lucide-react";

interface Props {
  features: unknown;
}

export default function FeaturesSection({
  features,
}: Props) {
  if (!features) {
    return null;
  }

  const featuresArray = Array.isArray(features)
    ? features
    : typeof features === "object"
    ? Object.values(features as Record<string, string>)
    : [];

  if (!featuresArray || featuresArray.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 px-4 sm:px-0">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[#0F2747] sm:text-2xl">
          Key Features
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Designed for reliable industrial automation performance.
        </p>
      </div>

      
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {featuresArray.map((feature, index) => (
          <div
            key={index}
            className="
              group
              rounded-xl
              border
              border-slate-200
              bg-white
              p-3.5
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-[#0F2747]
              hover:shadow-md
            "
          >
            
            <div className="flex items-center gap-2.5">
              <div
                className="
                  flex
                  h-6
                  w-6
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-green-50
                  group-hover:bg-green-100
                  transition-colors
                "
              >
                <CheckCircle2
                  size={14}
                  className="text-green-600"
                />
              </div>

              <span className="text-sm font-medium text-slate-700 leading-tight">
                {String(feature)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}