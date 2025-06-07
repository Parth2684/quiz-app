import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Background from "@/components/layout/Background";
import Cursorflow from "@/components/layout/Cursorflow";
import TopBar from "@/components/layout/TopBar";
import { usePathname } from "next/navigation";
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />


export const metadata: Metadata = {
  title: "Quizzo",
  description: "Get the best quizzes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{ 
  const isSignnedIn = false
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
          <Background /> 
          <Cursorflow />
          <TopBar isSignnedIn={Boolean(isSignnedIn)} />
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </div>
      </body>
    </html>
  );
}
