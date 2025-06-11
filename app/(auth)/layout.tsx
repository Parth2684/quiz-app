import { headers } from "next/headers";

interface AuthLayoutProps {
    children: React.ReactNode;
  }
  
  export default async function AuthLayout ({ children }: AuthLayoutProps) {
    let title;
    let subtitle;
    const headerList = await headers()
    const pathname = headerList.get('x-pathname')
    if(pathname == "/signup") {
      title = "Join Us"
      subtitle="Create your account and start your journey"
    }
    if(pathname == "/signin"){
      title="Welcome Back" 
      subtitle="Sign in to your account"
    }
    if(pathname == "/set-password") {
      title="Set Your Password" 
      subtitle="Complete your account setup"
    }
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-20"></div>
          <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-20 animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-20 animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-gray-300 text-lg">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </div>
    );
  };