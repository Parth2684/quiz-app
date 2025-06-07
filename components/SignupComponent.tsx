"use client"
import { FormEvent, useState } from "react";
import { Card } from "./Card";
import { InputBar } from "./InputBar";
import { Button } from "./Button";
import { GoogleButton } from "./GoogleButton";
import { signIn } from "next-auth/react";
import { Divider } from "./Divider";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export const SignupComponent = () => {
    const [formData, setFormData] = useState({ email: '', name: '' });
    const [errors, setErrors] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    async function handleSubmit (e: FormEvent<HTMLFormElement>) {
      e.preventDefault()
      setIsLoading(true)
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/signup/init`, {
            email: formData.email,
            name: formData.name
        })
        if (response.status == 200){
          toast.success("Email sent to your mail-id")
        }else{
          toast.error(response.data.msg)
        }
        setIsLoading(false)
    }
  
    return (
        <Card>
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">

          <InputBar
              label="Name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />


            <InputBar
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              icon={<span>📧</span>}
            />

            
            <Button 
              type="submit" 
              className="w-full" 
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </form>
          
          <Divider />
          
          <GoogleButton
            onClick={() => signIn("google", { callbackUrl: "/home" })}
            isLoading={isGoogleLoading}
            text="Sign up with Google"
          />
          
          <div className="text-center mt-6">
            <p className="text-gray-300">
              Already have an account?{' '}
              <Link href="/signin" className="text-purple-400 hover:text-purple-300 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
    );
  };