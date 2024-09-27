"use client";
import TaskList from "../components/TaskList"; 
import CreateTask from "../components/CreateTask"; 
import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Create() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
          router.push('/api/auth/signin'); // Redirect to sign-in page if not authenticated
        }
      }, [status, router]);
    if (status === 'loading') return <p>Loading...</p>;


    return (
        <main>
        <TaskList />
        <CreateTask />
        </main>
    );
}
