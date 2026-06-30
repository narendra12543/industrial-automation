"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { createProduct } from "@/actions/products";
import { createProductSchema } from "@/validations/product";

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  categories: Category[];
}

export default function ProductForm({
  categories,
}: ProductFormProps) {
  const router = useRouter();

  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] =
    useState("");
  const [description, setDescription] = useState("");
  const [specifications, setSpecifications] =
    useState("");
  const [features, setFeatures] = useState("");
  const [applications, setApplications] =
    useState("");
  const [brochureUrl, setBrochureUrl] =
    useState("");
  const [datasheetUrl, setDatasheetUrl] =
    useState("");
  const [featured, setFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  

  const inputClass =
  "w-full rounded-lg border border-slate-300 px-4 py-3 text-[#0F2747] placeholder:text-slate-400 outline-none focus:border-[#0F2747] focus:ring-1 focus:ring-[#0F2747]";
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const validationResult =
      createProductSchema.safeParse({
        categoryId,
        name,
        slug,
        shortDescription,
        description,
        specifications,
        features,
        applications,
        brochureUrl,
        datasheetUrl,
        featured,
        isActive,
      });

    if (!validationResult.success) {
      setError(
        validationResult.error.issues[0]?.message ??
          "Invalid product data."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await createProduct({
      categoryId,
      name,
      slug,
      shortDescription,
      description,

      specifications: specifications
        ? JSON.parse(specifications)
        : null,

      features: features
        ? JSON.parse(features)
        : null,

      applications: applications
        ? JSON.parse(applications)
        : null,

      brochureUrl,
      datasheetUrl,
      featured,
      isActive,
    });

      if (!response.success) {
        setError(response.message);
        return;
      }

      setSuccess(response.message);

      setTimeout(() => {
        router.push("/admin/products");
        router.refresh();
      }, 1000);
    } catch {
      setError(
        "Failed to create product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
          <span>Admin</span>
          <span>/</span>
          <span>Products</span>
          <span>/</span>
          <span className="font-medium text-[#0F2747]">
            Create
          </span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F2747]">
            Create Product
          </h1>

          <p className="mt-2 text-slate-600">
            Create a new industrial automation product.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-[#0F2747] px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              Product Information
            </h2>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                {success}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-[#0F2747]">
                  Category *
                </label>

                <select
                  value={categoryId}
                  onChange={(e) =>
                    setCategoryId(e.target.value)
                  }
                  className={inputClass}
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#0F2747]">
                  Product Name *
                </label>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                    className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#0F2747]">
                  Slug *
                </label>

                <input
                  type="text"
                  value={slug}
                  onChange={(e) =>
                    setSlug(e.target.value)
                  }
                  placeholder="servo-motor"
                  className={inputClass}
                />
              </div>

              {/* <div>
                <label className="mb-2 block text-sm font-medium text-[#0F2747]">
                  Short Description
                </label>

                <textarea
                  rows={3}
                  value={shortDescription}
                  onChange={(e) =>
                    setShortDescription(
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </div> */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#0F2747]">
                  Description
                </label>

                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#0F2747]">
                  Specifications
                </label>

                <textarea
                  rows={5}
                  value={specifications}
                  onChange={(e) =>
                    setSpecifications(
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#0F2747]">
                  Features
                </label>

                <textarea
                  rows={5}
                  value={features}
                  onChange={(e) =>
                    setFeatures(e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#0F2747]">
                  Applications
                </label>

                <textarea
                  rows={5}
                  value={applications}
                  onChange={(e) =>
                    setApplications(
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-[#0F2747]">
                        Brochure PDF
                    </label>

                    <input
                        type="file"
                        accept=".pdf"
                        className={inputClass}
                    />

                    <p className="mt-2 text-sm text-slate-500">
                        Upload brochure PDF file.
                    </p>
                    </div>
              </div>

              <div>

                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-[#0F2747]">
                        Datasheet URL
                        </label>

                        <input
                        type="url"
                        value={datasheetUrl}
                        onChange={(e) =>
                            setDatasheetUrl(e.target.value)
                        }
                        placeholder="https://example.com/datasheet.pdf"
                        className={inputClass}
                        />
                        
                    </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-[#0F2747]">
                    Datasheet PDF
                    </label>

                    <input
                    type="file"
                    accept=".pdf"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    />
                    <p className="mt-2 text-sm text-slate-500">
                            Upload datasheet PDF file.
                    </p>
                </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) =>
                      setFeatured(
                        e.target.checked
                      )
                    }
                  />

                  <span className="font-medium text-[#0F2747]">
                    Featured Product
                  </span>
                </label>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) =>
                      setIsActive(
                        e.target.checked
                      )
                    }
                  />

                  <span className="font-medium text-[#0F2747]">
                    Active Product
                  </span>
                </label>
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-[#0F2747] px-6 py-3 font-medium text-white transition hover:bg-[#18385F] disabled:opacity-70"
                >
                  {loading
                    ? "Creating..."
                    : "Create Product"}
                </button>

                <Link
                  href="/admin/products"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}