import HeroSection from "@/components/public/home/HeroSection";
import AboutSection from "@/components/public/home/AboutSection";
import FeaturedProductsSection from "@/components/public/home/FeaturedProductsSection";
import StatisticsSection from "@/components/public/home/StatisticsSection";
import SolutionsSwiper from "@/components/public/home/SolutionsSwiper";
import ProcessSection from "@/components/public/home/ProcessSection";
import IndustriesSection from "@/components/public/home/IndustriesSection";


export default function HomePage() {
  return (
    <>
      <SolutionsSwiper/>
      {/* <HeroSection /> */}
      <FeaturedProductsSection />
      <AboutSection />
      <IndustriesSection />

      <ProcessSection />
      {/* <StatisticsSection /> */}
    </>
  );
}