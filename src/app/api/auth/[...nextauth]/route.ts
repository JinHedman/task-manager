import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async session({ session,token }){
            if(session?.user){
                session.user.id = token.sub as string; // assign ID to user from token
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET, // secure nextauth setupt with secret
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
