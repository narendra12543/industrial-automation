import ContactForm from "@/components/public/contact/ContactForm";
import GoogleMapSection from "@/components/public/contact/GoogleMapSection";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title:
  "Contact Aven Automation | Industrial Entrance Automation Experts",

  description:
  "Contact Aven Automation for Automatic Gates, Industrial Doors, Boom Barriers, High Speed Doors, Dock Levelers, Dock Shelters and complete Industrial Entrance Automation Solutions across Pune, Maharashtra and India.",

  keywords: [
    "Contact Aven Automation",
    "Industrial Automation Contact",
    "Automatic Gate Supplier Pune",
    "Boom Barrier Supplier Pune",
    "Industrial Door Supplier Pune",
    "High Speed Door Supplier Pune",
    "Rolling Shutter Supplier Pune",
    "Industrial Automation Pune",
    "Industrial Automation Maharashtra",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
  title:
    "Contact Aven Automation",

  description:
    "Get in touch with Aven Automation for Industrial Entrance Automation Solutions.",

  url: "https://avenautomation.in/contact",

  siteName: "Aven Automation",

  type: "website",
},

twitter: {
  card: "summary_large_image",

  title:
    "Contact Aven Automation",

  description:
    "Industrial Entrance Automation Solutions.",
},

robots: {
  index: true,
  follow: true,
},
};
export default async function ContactPage() {
  
  const categories =
    await prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
      },
    });

  const products =
    await prisma.product.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        categoryId: true,
      },
    });
  return (
    <>
      {/* Contact Section */}

      <section className="relative overflow-hidden bg-slate-50 py-4">
        {/* Background Decoration */}

        <div className="absolute -top-24 left-0 h-80 w-80 rounded-full bg-orange-100 blur-3xl" />

        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-blue-100 blur-3xl" />

        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-slate-100 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4">
          

          {/* Form + Map */}
            <h1 className="text-3xl font-bold text-[#0F2747]">
              Contact Aven Automation
            </h1>

            <p className="mt-1 text-slate-600">
              Contact our Industrial Entrance Automation experts for Automatic Gates,
              Industrial Doors, Boom Barriers, High Speed Doors and customized automation
              solutions.
            </p>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start mt-2">
            
            <ContactForm
              
              products={products}
            />

            <GoogleMapSection />
          </div>
        </div>
      </section>
    </>
  );
}