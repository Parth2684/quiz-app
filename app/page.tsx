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
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quizzo - Your Ultimate Quiz Hub",
  description: "Welcome to Quizzo, the ultimate platform to create, manage, and take quizzes. Join and test your knowledge now!",
  openGraph: {
    title: "Quizzo - Your Ultimate Quiz Hub",
    description: "Create and solve quizzes effortlessly. Track scores, rank on leaderboards, and learn faster.",
    url: "https://quizzo.yoursite.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quizzo Homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quizzo - Your Ultimate Quiz Hub",
    description: "Create, solve, and dominate the leaderboard with Quizzo.",
    images: ["/og-image.png"],
  },
};

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
