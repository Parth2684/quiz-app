import prisma from "@/lib/singleton";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import Google from "next-auth/providers/google";

export const authOptions: AuthOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) {
                    return null
                }
                const user = await prisma.user.findFirst({
                    where: { email: credentials.email, provider: "Credentials" }
                })
                if(!user?.password) {
                    return null
                }
                const correctPassword = await bcrypt.compare(credentials.password, user.password)
                if(!correctPassword) {
                    return null
                }
                return user
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            if(account?.provider === "google" && user.email) {
                const existingUser = await prisma.user.findUnique({ where: { email: user.email } })
                if(!existingUser) {
                    await prisma.user.create({
                        data: {
                            name: user.name as string,
                            email: user.email,
                            provider: "google",
                            verified: true
                        }
                    })
                }
                const fullUser = await prisma.user.findUnique({where: { email: user.email }})
                if(fullUser){
                    user.id = fullUser.id
                }
            }
            return true
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.image = user.image
            }
            return token
        },
        
        async session({ session, token }) {
            if(token && token.id){
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string
                session.user.image = token.image as string
            }
            return session;
        }
    },
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/signin",
        signOut: "/signin"
    }
    
}