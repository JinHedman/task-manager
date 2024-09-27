"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton(){
    const { data: session } = useSession(); // current session

    if(session){
        return(
            <>
                <p>Sigend in as {session.user?.email}</p>
                <button onClick={() => signOut()}></button>
            </>
        );
    }
    return <button onClick={() => signIn()}>Sign in</button>;
}