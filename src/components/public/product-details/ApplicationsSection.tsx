import {
  Factory,
  Package,
  Cog,
  Building2,
} from "lucide-react";

interface Props {
  applications: unknown;
}

export default function ApplicationsSection({
  applications,
}: Props) {
  if (!applications) {
    return null;
  }

  const applicationsArray =
    Array.isArray(applications)
      ? applications
      : typeof applications === "object"
      ? Object.values(
          applications as Record<
            string,
            string
          >
        )
      : [];

  if (
    !applicationsArray ||
    applicationsArray.length === 0
  ) {
    return null;
  }

  const icons = [
    Factory,
    Package,
    Cog,
    Building2,
  ];

  return (
    <section className="mt-8 px-4 sm:px-0">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[#0F2747] sm:text-2xl">
          Applications
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Suitable for multiple industrial environments.
        </p>
      </div>

      {/* 
        Changed grid-cols to 'grid-cols-2' by default for mobile view. 
        Adjusted the gap and padding slightly to make the 2-column mobile cards look compact and clean.
      */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {applicationsArray.map(
          (application, index) => {
            const Icon =
              icons[
                index %
                  icons.length
              ];

            return (
              <div
                key={index}
                className="
                  group
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-4
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-orange-400
                  hover:shadow-md
                "
              >
                <Icon
                  size={20}
                  className="text-orange-500 transition-transform group-hover:scale-110"
                />

                <p className="mt-2.5 text-sm font-semibold text-[#0F2747] leading-tight break-words">
                  {String(application)}
                </p>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}