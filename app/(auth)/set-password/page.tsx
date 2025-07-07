import { VerificationPage } from "@/components/VerificationPage"
import { NotVerified } from "@/components/NotVerified"
import axios from "axios"
import { Metadata } from "next";

interface PageProps {
  searchParams: Promise<{ token?: string }>
}
export const metadata: Metadata = {
  title: "Set Your Password | Quizzo",
  description: "Secure your Quizzo account by setting a strong password. Quick and safe account setup.",
};


async function verifyEmail(token: string) {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/signup/verifyEmail?token=${token}`)
    if(response.status !== 200) {
        return false
    }
    return true
  } catch (error) {
    console.error('Email verification failed:', error)
    return false
  }
}

export default async function SetPassword({ searchParams }: PageProps) {
  const params = await searchParams
  const token = params.token
  if(!token) {
    return <NotVerified />
  }
  const isVerified =  await verifyEmail(token as string)
  
  
  return (
      <div>
        {isVerified ? <VerificationPage token={token as string} /> : <NotVerified />}
      </div>
  
  )
}