"use client";
import Header from "../components/Header";
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
    const { data: session } = useSession();

    if (session && session.user) {
        redirect("/editor");
    }

    return (
        <main>
            <div className="flex flex-col min-h-[100vh]">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                        <div className="container px-4 md:px-6 flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Secure and Intuitive Note-Taking
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    CipherNotes is a secure and intuitive
                                    note-taking application.
                                </p>
                                <div
                                    className="bg-zinc-950 dark:hover:bg-zinc-900 hover:bg-zinc-700  text-white font-bold space-x-4 rounded-md border border-gray-200  px-8 py-2 shadow-sm transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950  dark:hover:text-gray-50 dark:focus-visible:ring-gray-300 w-max m-auto cursor-pointer select-none"
                                    onClick={() =>
                                        signIn("google", { redirect: false })
                                    }
                                >
                                    Get started
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        © 2024 CipherNotes. All rights reserved.
                    </p>
                </footer>
            </div>
        </main>
    );
}
