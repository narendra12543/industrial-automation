import ContactForm from "@/components/public/contact/ContactForm";
import GoogleMapSection from "@/components/public/contact/GoogleMapSection";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title:
  "Contact Aven Industrial Automation | Industrial Entrance Automation Experts",

  description:
    "Contact Aven Industrial Automation for Automatic Sliding Gates, Swing Gates, High Speed Doors, Industrial Doors, Boom Barriers, Dock Levelers, Dock Shelters, Conveyor Systems, Material Handling Equipment and complete Industrial Automation solutions across Pune, Maharashtra and India.",
  keywords: [
    // Brand
    "Contact Aven Automation",
    "Aven Automation",
    "Aven Automation Pune",
    "Aven Automation Maharashtra",
    "Aven Automation India",
    "Aven Industrial Automation",
    "aven industrial automation",
    "Aven Industrial Automation Pune",
    "Aven Industrial Automation Maharashtra",
    "Aven Industrial Automation India",

    // Company
    "Industrial Automation Company",
    "Industrial Entrance Automation Company",
    "Industrial Automation Contact",
    "Industrial Automation Supplier",

    // Gates
    "Automatic Sliding Gate Supplier",
    "Automatic Swing Gate Supplier",
    "Telescopic Sliding Gate Supplier",
    "Gate Automation Company",

    // Doors
    "Industrial Door Supplier",
    "High Speed Door Supplier",
    "Sectional Overhead Door Supplier",
    "Garage Door Supplier",
    "Rolling Shutter Supplier",

    // Parking
    "Boom Barrier Supplier",
    "Automatic Bollards Supplier",
    "Dock Leveler Supplier",
    "Dock Shelter Supplier",

    // Conveyors
    "Industrial Conveyor Supplier",
    "Conveyor Manufacturer",
    "Roller Bed Conveyor",
    "Flat Belt Conveyor",
    "Modular Belt Conveyor",
    "Cleated Belt Conveyor",
    "Curved Belt Conveyor",
    "Incline Belt Conveyor",
    "Sanitary Conveyor",
    "Wash Down Conveyor",
    "Specialty Conveyor",
    "Material Handling Equipment",

    // Location
    "Industrial Automation Pune",
    "Industrial Automation Chakan",
    "Industrial Automation Pimpri Chinchwad",
    "Industrial Automation Hinjawadi",
    "Industrial Automation Maharashtra",
    "Industrial Automation India",
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