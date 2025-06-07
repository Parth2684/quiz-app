"use client"
import { Card } from "./Card";
import { Alert } from "./Alert";
import { Button } from "./Button";
import { useRouter, useSearchParams } from "next/navigation";



export const NotVerified = () => {
  
  const router = useRouter();
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  
  const getErrorMessage = (errorType: any) => {
    switch(errorType) {
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'Access denied. You do not have permission to sign in.';
      case 'Verification':
        return 'The verification link is invalid or has expired.';
      case 'Default':
      default:
        return 'An unexpected error occurred during authentication.';
    }
  };

  return (
    // <AuthLayout 
    //   title="Oops!" 
    //   subtitle="Something went wrong"
    // >
      <Card>
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">😔</div>
          
          <Alert 
            type="error" 
            message={getErrorMessage(error)}
          />
          
          <div className="space-y-4">
            <Button 
              onClick={() => router.push('/signin')} 
              className="w-full"
            >
              Try Again
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => router.push('/')} 
              className="w-full"
            >
              Go Home
            </Button>
          </div>
          
          <div className="text-sm text-gray-400">
            <p>If the problem persists, please contact support.</p>
          </div>
        </div>
      </Card>
  );
};