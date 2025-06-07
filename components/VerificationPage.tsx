"use client"
import { FormEvent, MouseEvent, useState } from "react";
import { Card } from "./Card";
import { Alert } from "./Alert";
import { InputBar } from "./InputBar";
import { Button } from "./Button";
import Link from "next/link";
import { ResponseSchema } from "@/types/auth/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const VerificationPage = ({token}: {token: string}) => {
    // Your state and handlers here
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const [verificationStatus, setVerificationStatus] = useState('pending'); // 'pending', 'success', 'error'
    async function handlePasswordSet (e: FormEvent<HTMLFormElement>) {
      e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("Password Dont Match")
            return;
        }setIsLoading(true)
        try {
            const response: ResponseSchema = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/signup/setPassword?token=${token}`, {
                password
            })
            if(response.status !== 200) {
                toast.error(String(response.data.msg))
                return
            }
            toast.success("Set Password Sucessfull")
            setVerificationStatus("success")
            router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/signin`)
        } catch (error: any) {
            console.error("Signin error", error)
            toast.error(error?.response?.data?.msg || "Error Setting Password")
            setErrors(error)
            setVerificationStatus("error")
        } finally{
          setIsLoading(false)
        }
    }
  
    return (
        <Card>
          {verificationStatus === 'success' && (
            <Alert 
              type="success" 
              message="Email verified successfully! Please set your password." 
              className="mb-6"
            />
          )}
          
          {verificationStatus === 'error' && (
            <Alert 
              type="error" 
              message="Verification failed. Please try again or request a new link." 
              className="mb-6"
            />
          )}
  
          <form onSubmit={(e) =>handlePasswordSet(e)} className="space-y-6">
            <InputBar
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<span>🔒</span>}
            />
            
            <InputBar
              label="Confirm Password"
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<span>🔒</span>}
            />
            
            <Button
              type="submit" 
              className="w-full" 
              isLoading={isLoading}
            >
              Set Password
            </Button>
          </form>
          
          <div className="text-center mt-6">
              <Link href="/signin" className="text-purple-400 hover:text-purple-300 font-semibold">
                Sign in
              </Link>
          </div>
        </Card>
    );
  };