"use client";

interface SearchAndFiltersProps {
  search: string;
  selectedCategory: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export default function SearchAndFilters({
  search,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}: SearchAndFiltersProps) {
  return (
    <section className="py-2 lg:hidden md:hidden">
      <div className="mx-auto max-w-7xl px-4">
        {/* Search */}

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            focus:border-[#0F2747]
          "
        />

        {/* Desktop Categories */}

        <div className="mt-6 hidden flex-wrap gap-3 md:flex">
          <button
            onClick={() => onCategoryChange("all")}
            className={`
              rounded-full
              px-5
              py-2
              text-sm
              font-medium
              transition
              ${
                selectedCategory === "all"
                  ? "bg-[#0F2747] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }
            `}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                rounded-full
                px-5
                py-2
                text-sm
                font-medium
                transition
                ${
                  selectedCategory === category
                    ? "bg-[#0F2747] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mobile Dropdown */}

        <div className="mt-6 md:hidden lg:hidden">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="
              rounded-2xl
              bg-white
              px-4
              py-3
              text-sm
              font-medium
              text-[#0F2747]
              outline-none
              transition
              focus:border-[#0F2747]
              focus:ring-2
              focus:ring-[#0F2747]/20
              
            "
          >
            <option value="all">All Categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}