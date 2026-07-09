import AboutHero from "@/components/public/about/AboutHero";
import CompanyOverview from "@/components/public/about/CompanyOverview";
import WhyChooseUsAbout from "@/components/public/about/WhyChooseUsAbout";
import DirectorMessage from "@/components/public/about/DirectorMessage";
import AboutIndustries from "@/components/public/about/AboutIndustries";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",

  description:
    "Learn about Aven Automation, a trusted provider of Automatic Gates, Industrial Doors, Boom Barriers, Dock Systems and Industrial Entrance Automation Solutions.",

  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIndustries />
      <CompanyOverview />
      <DirectorMessage />
      <WhyChooseUsAbout />
      

      
    </>
  );
}