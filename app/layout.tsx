import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Background from "@/components/layout/Background";
import TopBar from "@/components/layout/TopBar";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/authOptions/authOptions";
import LoadingOverlay from "@/components/layout/LoadingOverlay";
import RouterLoadingWrapper from "@/components/layout/RouterLoadingWrapper";
import RouterPushPatch from "@/components/layout/RouterPushPatch";



export const metadata: Metadata = {
  title: "Quizzo - Create & Solve Quizzes Effortlessly",
  description: "Quizzo is a full-stack quiz platform with real-time leaderboard, secure auth, and dynamic quiz creation with the help of AI.",
  keywords: ["Quizzo", "quiz app", "full stack", "Next.js", "Prisma", "NextAuth", "leaderboard", "AI Quiz"],
  authors: [{ name: "Parth Bhosle", url: "https://www.linkedin.com/in/parth-bhosle-46a078271/" }],
  creator: "Parth Bhosle",
  metadataBase: new URL("https://quizzo.parthcodes.com"),
  openGraph: {
    title: "Quizzo - Create & Solve Quizzes",
    description: "A powerful quiz platform with dynamic quiz creation, real-time scoring and secure login.",
    url: "https://quizzo.yoursite.com",
    siteName: "Quizzo",
    images: [
      {
        url: "/favicon.ico", 
        alt: "Quizzo OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quizzo - Create & Solve Quizzes",
    description: "A fast, full-stack quiz app with real-time leaderboards and secure login.",
    images: ["/favicon.ico"],
  },
  icons: {
    icon: "/favicon.ico",
  }
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{ 
  const session: Session | null = await getServerSession(authOptions);
  let isSignedIn: boolean
  if(!session || !session.user.id){
    isSignedIn = false;
  }else{
    isSignedIn = true; 
  }
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload font files manually */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlEA.woff2"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLFj_Z1xlEA.woff2"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1xlEA.woff2"
        />

        {/* Link stylesheet to apply fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative print:pt-0 print:mt-0 print:mb-0 print:pl-0 print:pr-0">
          <Background />
          <TopBar isSignnedIn={Boolean(isSignedIn)} />
          <RouterLoadingWrapper>
          <RouterPushPatch>
            <LoadingOverlay />
          <Toaster position="top-center" reverseOrder={false} />
          <div className="mt-14 mb-14">
            {children}
          </div>
          </RouterPushPatch>
          </RouterLoadingWrapper>
        </div>
      </body>
    </html>
  );
}
