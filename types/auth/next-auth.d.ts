import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            image?: string;
        }
    }
}

declare module "jwt" {
    interface JWT {
        id: string;
    }
}