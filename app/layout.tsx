import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />


export const metadata: Metadata = {
  title: "Quizzo",
  description: "Get the best quizzes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-animate font-poppins">
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
