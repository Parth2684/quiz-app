import AuthHeader from "@/components/AuthHeader";

interface AuthLayoutProps {
    children: React.ReactNode;
}
  
  export default async function AuthLayout ({ children }: AuthLayoutProps) {
    return (
      <div className="max-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 flex justify-center px-4">

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-20"></div>
          <div className="absolute -bottom-8 -right-4 w-72 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-20 animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-20 animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-md">
          <AuthHeader/>
          {children}
        </div>
      </div>
    );
  };