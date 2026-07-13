import AboutHero from "@/components/public/about/AboutHero";
import CompanyOverview from "@/components/public/about/CompanyOverview";
import WhyChooseUsAbout from "@/components/public/about/WhyChooseUsAbout";
import DirectorMessage from "@/components/public/about/DirectorMessage";
import AboutIndustries from "@/components/public/about/AboutIndustries";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Aven Automation | Industrial Entrance Automation Company",

  description:
  "Learn about Aven Automation, a leading Industrial Entrance Automation company providing Automatic Gates, Industrial Doors, High Speed Doors, Boom Barriers, Dock Levelers, Dock Shelters and automation solutions across Pune, Maharashtra and India.",

    keywords: [
      "About Aven Automation",
      "Industrial Automation Company",
      "Industrial Entrance Automation Company",
      "Automatic Gate Company",
      "Industrial Door Company",
      "Boom Barrier Company",
      "High Speed Door Company",
      "Industrial Automation Experts",
      "Automation Engineering Company",
      "Industrial Automation Pune",
      "Industrial Automation Maharashtra",
      "Aven Automation",
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