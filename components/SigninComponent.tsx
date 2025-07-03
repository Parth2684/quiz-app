"use client"

import { useState } from "react";
import { Card } from "./Card";
import { InputBar } from "./InputBar";
import Link from "next/link";
import { Button } from "./Button";
import { Divider } from "./Divider";
import { GoogleButton } from "./GoogleButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { NotVerified } from "./NotVerified";


export const SigninComponent = () => {
    // Your state and handlers here
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const router = useRouter()
  
    return (
        <Card>
          <form 
            onSubmit={async (e) => {
                e.preventDefault(); // don't forget this to stop page reload
                setIsLoading(true);
                const res = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                callbackUrl: "/home"
                });
                if(res?.error) {
                  return <NotVerified />
                }
                
                setIsLoading(false);
            }}
            className="space-y-2"
            >
            <InputBar
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              icon={<span>📧</span>}
            />
            
            <InputBar
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              icon={<span>🔒</span>}
            />
            
            <div className="flex items-center justify-between">
              <Link  href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                Forgot password?
              </Link>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>
          
          <Divider />
          
          <GoogleButton
            onClick={() => {
              setIsGoogleLoading(true)
              signIn("google", {callbackUrl: "/home"})
              setIsGoogleLoading(false)
            }}
            isLoading={isGoogleLoading}
            text="Sign in with Google"
          />
          
          <div className="text-center mt-6">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
    );
  };