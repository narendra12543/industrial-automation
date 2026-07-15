import ProductGallery from "@/components/products/ProductGallery";
import { notFound } from "next/navigation";

import { getProductBySlug } from "@/actions/products";
import { auth } from "@/lib/auth";

import SpecificationsSection from "@/components/public/product-details/SpecificationsSection";
import FeaturesSection from "@/components/public/product-details/FeaturesSection";
import ApplicationsSection from "@/components/public/product-details/ApplicationsSection";

import ProductEnquiryForm from "@/components/enquiries/ProductEnquiryForm";
import ProductDescription from "@/components/products/ProductDescription";
import type { Metadata } from "next";
import Script from "next/script";
import ProductSchema from "@/components/seo/ProductSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ProductFAQSchema from "@/components/seo/ProductFAQSchema";
import AboutProductSection from "@/components/products/AboutProductSection";
import ProductBenefits from "@/components/products/ProductBenefits";
import ProductFAQ from "@/components/products/ProductFAQ";


interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.", 
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${product.name} in Pune | ${
    product.category?.name ?? "Industrial Automation"
  } Manufacturer | Aven Automation`;
  const description =
  product.shortDescription ??
  `${product.name} manufacturer, supplier and installation service in Pune, Pimpri Chinchwad, Chakan, Hinjawadi, Talegaon, Maharashtra and across India. Contact Aven Automation for premium industrial entrance automation solutions.`;

  const canonical = `https://avenautomation.in/products/${product.slug}`;

  const image =
    product.images.find((img) => img.isPrimary)?.imageUrl ??
    product.images[0]?.imageUrl;

  return {
    title,
    description,
    keywords: [
      product.name,
      `${product.name} in Pune`,
      `${product.name} Manufacturer`,
      `${product.name} Supplier`,
      `${product.name} Near Me`,
      `${product.name} Manufacturer`,
      `${product.name} Supplier`,
      `${product.name} Dealer`,
      `${product.name} Installation`,
      `${product.name} Price`,
      `${product.name} Pune`,
      `${product.name} Maharashtra`,
      `${product.name} India`,

      `${product.category?.name}`,

      "Industrial Entrance Automation",
      "Industrial Automation",
      "Aven Automation",
    ],
    alternates: {
      canonical,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "Aven Automation",

      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
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

  const primaryImage = product.images.find((image) => image.isPrimary) ?? product.images[0];

 
  return (
    <>
      <ProductSchema product={product} />
      <ProductFAQSchema productName={product.name} />
      
      <BreadcrumbSchema
        items={[
          {
            name: "Home",
            url: "https://avenautomation.in",
          },
          {
            name: "Products",
            url: "https://avenautomation.in/products",
          },
          {
            name: product.name,
            url: `https://avenautomation.in/products/${product.slug}`,
          },
        ]}
      />

      <div className="bg-slate-50">
      
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Hero Section */}

        <div className="grid gap-10 lg:grid-cols-[1fr_560px]">
          {/* Left */}

          <div>
            <ProductGallery
              images={product.images}
              productName={product.name}
            />

            <div className="mt-8">
              

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
              <ProductDescription
                
                description={product.description}
              />
            )}

            <AboutProductSection
              productName={product.name}
              category={product.category?.name}
            />

            <ProductBenefits
              productName={product.name}
            />
            <ProductFAQ
              productName={product.name}
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
                  <h2 className=" text-2xl font-bold text-white">
                    Request Product Enquiry
                  </h2>

                  <p className="mt-1 max-w-2xl text-sm text-slate-300">
                    Tell us about your requirement. Our Aven Automation
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

            {/* Features */}

            <FeaturesSection features={product.features as string[]} />

            {/* Applications */}

            <ApplicationsSection
              applications={product.applications as string[]}
            />
          </section>
        </div>
        </div>
    </div>
  </>
  );
}
