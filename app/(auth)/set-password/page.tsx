import { NotVerified } from "@/components/NotVerified"
import { Verified } from "@/components/Verified"
import axios from "axios"

interface PageProps {
  searchParams: Promise<{ token?: string }>
}

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
  
  if (!token) {
    return <NotVerified />
  }
  
  const isVerified = await verifyEmail(token)
  
  return (
    <div className="flex items-center justify-center">
      <div className="w-fit h-fit">
        {isVerified ? <Verified token={token} /> : <NotVerified />}
      </div>
    </div>
  )
}