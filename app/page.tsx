export const dynamic = 'force-static'; 

import { Footer } from "@/components/landing/Footer";
import { CTASection } from "@/components/landing/CTASection";
import { FeaturesSection } from "@/components/landing/FeatureSection";
import { HeroFunction } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { TestimonialsSection } from "@/components/landing/Testimonials";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/authOptions/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions)
  if(session && session.user.id) {
    redirect("/home")
  }
  return <div>
    <HeroFunction />
    <FeaturesSection />
    <HowItWorksSection />
    {/* <TestimonialsSection /> */}
    <CTASection />
    <Footer />
  </div>
}
