import ContactForm from "@/components/public/contact/ContactForm";
import GoogleMapSection from "@/components/public/contact/GoogleMapSection";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Contact Us",

  description:
    "Contact Aven Automation for Automatic Gates, Boom Barriers, Industrial Doors and Entrance Automation Solutions.",

  alternates: {
    canonical: "/contact",
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