import ProductGallery from "@/components/products/ProductGallery";
import { notFound } from "next/navigation";

import { getProductBySlug } from "@/actions/products";
import { auth } from "@/lib/auth";

import SpecificationsSection from "@/components/public/product-details/SpecificationsSection";
import FeaturesSection from "@/components/public/product-details/FeaturesSection";
import ApplicationsSection from "@/components/public/product-details/ApplicationsSection";

import ProductEnquiryForm from "@/components/enquiries/ProductEnquiryForm";

interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductDetailsPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.shortDescription ?? product.name,
  };
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  const session = await auth();

  if (!product) {
    notFound();
  }

  // const relatedProducts =
  //   await getRelatedProducts(
  //     product.categoryId,
  //     product.id
  //   );

  const primaryImage =
    product.images.find((image) => image.isPrimary) ?? product.images[0];

  return (
    
    <div className="bg-slate-50">
      
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Hero Section */}

        <div className="grid gap-10 lg:grid-cols-[1fr_560px]">
          {/* Left */}

          <div>
            <ProductGallery images={product.images} />

            <div className="mt-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium">
                  {product.category?.name}
                </span>

                {product.featured && (
                  <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
                    Featured Product
                  </span>
                )}
              </div>

              <h1 className="mt-5 text-2xl font-bold text-[#0F2747]">
                {product.name}
              </h1>

              {/* {product.shortDescription && (
                <p className="mt-5 text-lg leading-6 text-slate-600">
                  {product.shortDescription}
                </p>
              )} */}
            </div>

            {/* Downloads */}

            {/* <div className="mt-8 flex flex-wrap gap-4">
              {product.brochureUrl && (
                <a
                  href={product.brochureUrl}
                  target="_blank"
                  className="rounded-xl bg-[#0F2747] px-6 py-3 font-medium text-white transition hover:bg-[#173865]"
                >
                  Download Brochure
                </a>
              )}

              {product.datasheetUrl && (
                <a
                  href={product.datasheetUrl}
                  target="_blank"
                  className="rounded-xl border border-[#0F2747] px-6 py-3 font-medium text-[#0F2747] transition hover:bg-slate-50"
                >
                  Download Datasheet
                </a>
              )}
            </div> */}

            {/* Description */}

            {product.description && (
              <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-5 text-2xl font-bold text-[#0F2747]">
                  Introduction
                </h2>

                <div className="leading-7 text-slate-700 whitespace-pre-line">
                  {product.description}
                </div>
              </section>
            )}

            {/* Features */}

            <FeaturesSection features={product.features as string[]} />

            {/* Applications */}

            <ApplicationsSection
              applications={product.applications as string[]}
            />
          </div>

          {/* Right Sidebar */}

          {/* Enquiry */}
          <section id="enquiry" className="">
            <div
              className="
                relative
                overflow-hidden
                rounded-[32px]
                bg-[#183356]
                p-8
                shadow-2xl
              "
            >
              {/* Background Pattern */}
              <div
                className="
                  absolute
                  inset-0
                  opacity-[0.05]
                 
                  bg-[size:45px_45px]
                "
              />

              {/* Orange Glow */}
              <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />

              <div className="relative">
                <div className="mb-10">
                  <h2 className=" text-3xl font-bold text-white">
                    Request Product Enquiry
                  </h2>

                  <p className="mt-1 max-w-2xl text-sm text-slate-300">
                    Tell us about your requirement. Our industrial automation
                    experts will contact you with the best solution for your
                    application.
                  </p>
                </div>

                <ProductEnquiryForm
                  productId={product.id}
                  userName={session?.user?.name ?? ""}
                  userEmail={session?.user?.email ?? ""}
                  isAuthenticated={!!session?.user}
                />
              </div>
            </div>
            {/* Specifications */}

            <SpecificationsSection
              specifications={product.specifications as Record<string, string>}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
