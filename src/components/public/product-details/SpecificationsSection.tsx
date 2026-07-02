interface Props {
  specifications: unknown;
}

export default function SpecificationsSection({
  specifications,
}: Props) {
  if (!specifications) {
    return null;
  }

  let specs: Record<string, unknown> = {};

  try {
    if (typeof specifications === "string") {
      specs = JSON.parse(specifications);
    } else {
      specs = specifications as Record<string, unknown>;
    }
  } catch {
    return null;
  }

  if (Object.keys(specs).length === 0) {
    return null;
  }

  return (
    <section className="mt-6 px-4 sm:px-0">
      <h2 className="mb-4 text-xl font-bold text-[#0F2747]">
        Technical Specifications
      </h2>

      <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white shadow-sm max-w-3xl">
        <table className="w-full border-collapse text-sm">
          <tbody>
            {Object.entries(specs).map(([key, value], index) => (
              <tr
                key={key}
                className={`
                  transition-colors hover:bg-slate-100/50
                  ${index !== Object.keys(specs).length - 1 ? "border-b border-slate-100" : ""}
                  ${index % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                `}
              >
                {/* Left Column: Tightly sized to content, no extra wasted gap */}
                <td
                  className="
                    w-px
                    whitespace-nowrap
                    pl-5
                    pr-8
                    py-2.5
                    align-top
                    font-medium
                    text-[#0F2747]
                    capitalize
                  "
                >
                  {key.replace(/_/g, " ")}
                </td>

                {/* Right Column: Clean alignment with generous wrapping room */}
                <td
                  className="
                    pr-5
                    pl-0
                    py-2.5
                    align-top
                    font-sm
                    text-slate-500
                    break-words
                    whitespace-pre-wrap
                  "
                >
                  {String(value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}