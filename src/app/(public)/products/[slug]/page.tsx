import Image from "next/image";
import ProductGallery from "@/components/products/ProductGallery";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getProductBySlug,
} from "@/actions/products";
import { auth } from "@/lib/auth";

import SpecificationsSection from "@/components/public/product-details/SpecificationsSection";
import FeaturesSection from "@/components/public/product-details/FeaturesSection";
import ApplicationsSection from "@/components/public/product-details/ApplicationsSection";
import ProductActionCard from "@/components/public/product-details/ProductActionCard";
import RelatedProductsSection from "@/components/public/product-details/RelatedProductsSection";

import ProductEnquiryForm from "@/components/enquiries/ProductEnquiryForm";

interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;

  const product =
    await getProductBySlug(slug);

  

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description:
      product.shortDescription ??
      product.name,
  };
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;

  const product =
    await getProductBySlug(slug);

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
    product.images.find(
      (image) => image.isPrimary
    ) ?? product.images[0];

  return (
  <div className="bg-slate-50">
    <div className="mx-auto max-w-7xl px-4 py-10">

     

      {/* Hero Section */}

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">

        {/* Left */}

        <div>

          <ProductGallery
            images={product.images}
          />

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

            <h1 className="mt-5 text-4xl font-bold text-[#0F2747]">
              {product.name}
            </h1>

            {product.shortDescription && (
              <p className="mt-5 text-lg leading-8 text-slate-600">
                {product.shortDescription}
              </p>
            )}

          </div>

          {/* Downloads */}

          <div className="mt-8 flex flex-wrap gap-4">

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

          </div>

          {/* Description */}

          {product.description && (
            <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

              <h2 className="mb-5 text-3xl font-bold text-[#0F2747]">
                Product Overview
              </h2>

              <div className="leading-8 text-slate-700 whitespace-pre-line">
                {product.description}
              </div>

            </section>
          )}

          {/* Features */}

          <FeaturesSection
            features={
              product.features as string[]
            }
          />

          {/* Specifications */}

          <SpecificationsSection
            specifications={
              product.specifications as Record<
                string,
                string
              >
            }
          />

          {/* Applications */}

          <ApplicationsSection
            applications={
              product.applications as string[]
            }
          />

          {/* Enquiry */}

          <section
            id="enquiry"
            className="mt-16 scroll-mt-24"
          >
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

              <div className="mb-8">

                <h2 className="text-3xl font-bold text-[#0F2747]">
                  Request Product Enquiry
                </h2>

                <p className="mt-2 text-slate-600">
                  Share your requirement and our team
                  will contact you shortly.
                </p>

              </div>

              <ProductEnquiryForm
                productId={product.id}
                userName={session?.user?.name ?? ""}
                userEmail={session?.user?.email ?? ""}
                isAuthenticated={!!session?.user}
              />

            </div>
          </section>

          {/* Related Products */}

          {/* <RelatedProductsSection
            products={relatedProducts}
          /> */}

        </div>

        {/* Right Sidebar */}

        <div>

          <ProductActionCard
            category={
              product.category?.name || ""
            }
            slug={product.slug}
          />

        </div>

      </div>

    </div>
  </div>
);
}