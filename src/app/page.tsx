import HeroSection from "@/components/public/home/HeroSection";
import TrustSection from "@/components/public/home/TrustSection";
import WhyChooseUsSection from "@/components/public/home/WhyChooseUsSection";
import FeaturedProductsSection from "@/components/public/home/FeaturedProductsSection";
import StatisticsSection from "@/components/public/home/StatisticsSection";
import CTASection from "@/components/public/home/CTASection";
// import ContactStrip from "@/components/public/home/ContactStrip";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <FeaturedProductsSection />

      <TrustSection />

      <WhyChooseUsSection />

      

      <StatisticsSection />

      <CTASection />

      {/* <ContactStrip /> */}
    </>
  );
}