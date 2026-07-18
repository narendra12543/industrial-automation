import AboutHero from "@/components/public/about/AboutHero";
import CompanyOverview from "@/components/public/about/CompanyOverview";
import WhyChooseUsAbout from "@/components/public/about/WhyChooseUsAbout";
import DirectorMessage from "@/components/public/about/DirectorMessage";
import AboutIndustries from "@/components/public/about/AboutIndustries";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Aven Industrial Automation | Industrial Entrance Automation Company",

  description:
  "Learn about Aven Industrial Automation (Aven Automation), a leading Industrial Automation and Industrial Entrance Automation company in Pune, Maharashtra. We manufacture and supply Automatic Gates, High Speed Doors, Industrial Doors, Boom Barriers, Dock Levelers, Dock Shelters, Conveyor Systems, Material Handling Equipment and complete automation solutions across India.",

    keywords: [
      // Brand
      "About Aven Automation",
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
      "Industrial Automation Manufacturer",
      "Industrial Automation Supplier",
      "Industrial Automation Solutions",
      "Automation Engineering Company",
      "Factory Automation Company",
      "Warehouse Automation Company",

      // Products
      "Automatic Gates",
      "Automatic Sliding Gate",
      "Automatic Swing Gate",
      "Telescopic Sliding Gate",
      "Industrial Doors",
      "Sectional Overhead Door",
      "High Speed Doors",
      "Rolling Shutters",
      "Boom Barriers",
      "Dock Levelers",
      "Dock Shelters",
      "Conveyor Systems",
      "Roller Conveyor",
      "Flat Belt Conveyor",
      "Modular Belt Conveyor",
      "Cleated Belt Conveyor",
      "Curved Belt Conveyor",
      "Incline Belt Conveyor",
      "Material Handling Equipment",

      // Locations
      "Industrial Automation Pune",
      "Industrial Automation Pimpri Chinchwad",
      "Industrial Automation Chakan",
      "Industrial Automation Hinjawadi",
      "Industrial Automation Maharashtra",
      "Industrial Automation India",
    ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title:
      "About Aven Automation | Industrial Entrance Automation Company",

    description:
      "Trusted provider of Automatic Gates, Industrial Doors, Boom Barriers, Dock Systems and Industrial Entrance Automation Solutions.",

    url: "https://avenautomation.in/about",

    siteName: "Aven Automation",

    type: "website",
  },
  twitter: {
    card: "summary_large_image",

    title:
      "About Aven Automation",

    description:
      "Industrial Entrance Automation Solutions across India.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIndustries />
      <CompanyOverview />
      {/* <DirectorMessage /> */}
      <WhyChooseUsAbout />
      

      
    </>
  );
}