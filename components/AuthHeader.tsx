"use client";

import { usePathname } from "next/navigation";

export default function AuthHeader() {
  const pathname = usePathname();

  let title = "";
  let subtitle = "";

  switch (pathname) {
    case "/signup":
      title = "Join Us";
      subtitle = "Create your account and start your journey";
      break;
    case "/signin":
      title = "Welcome Back";
      subtitle = "Sign in to your account";
      break;
    case "/set-password":
      title = "Set Your Password";
      subtitle = "Complete your account setup";
      break;
    default:
      title = "Welcome";
      subtitle = "Let’s get started";
  }

  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-300 text-md">{subtitle}</p>
      )}
    </div>
  );
}
