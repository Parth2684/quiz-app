import { Footer } from "@/components/landing/Footer";
import { CTASection } from "@/components/landing/CTASection";
import { FeaturesSection } from "@/components/landing/FeatureSection";
import { HeroFunction } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { TestimonialsSection } from "@/components/landing/Testimonials";

export default function Home() {
  return <div>
    <HeroFunction />
    <FeaturesSection />
    <HowItWorksSection />
    <TestimonialsSection />
    <CTASection />
    <Footer />
  </div>
}
