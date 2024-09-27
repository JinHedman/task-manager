import NextAuth from "next-auth";

// extend Session type from nextauth
declare module "next-auth" {
    interface Session{
        user: {
            id: string;
            email: string;
            name: string;
        };
    }
}