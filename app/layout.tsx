import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Background from "@/components/layout/Background";
import Cursorflow from "@/components/layout/Cursorflow";
import TopBar from "@/components/layout/TopBar";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/authOptions/authOptions";



export const metadata: Metadata = {
  title: "Quizzo",
  description: "Get the best quizzes",
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
        <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
          <Background /> 
          <Cursorflow />
          <TopBar isSignnedIn={Boolean(isSignedIn)} />
          <Toaster position="top-center" reverseOrder={false} />
          <div className="mt-14 mb-14">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
