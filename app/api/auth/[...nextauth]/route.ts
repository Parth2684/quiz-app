import prisma from "@/lib/singleton";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import Google from "next-auth/providers/google";


const handler = NextAuth({
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
            }
            return true
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token
        },
        
        async session({ session, token, user }) {
            if(token.id){
                session.user.id = token.id as string;
                session.user.email = user.email;
                session.user.name = user.name as string
                session.user.image = user.image as string
            }
            return session;
        }
    },
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/signin"
    }
})

export { handler as GET, handler as POST }