// app/haven/page.tsx

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";



const HavenPage = async () => {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }



    return (
        <main className="max-w-7xl mx-auto py-12 px-6">
            <header className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    Your Haven 🧘‍♀️
                </h1>
                
                {/* Button to redirect to the new session creation page */}
                <Link href="/Haven/new" passHref>
                <Button className="bg-primary text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-gray-700/30 hover:scale-105 transition-all duration-300">                        <Plus className="w-5 h-5" />
                        Start New Session
                    </Button>
                </Link>
            </header>

            <div className="border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Past Sessions
                </h2>
                
                {/* Placeholder for the list of past content */}
                {/* You would replace this with a component that iterates over 'pastSessions' */}
                <div className="bg-white p-8 rounded-xl border border-gray-100 min-h-[300px] flex items-center justify-center text-center text-gray-500 italic">
                    {/* {pastSessions.length > 0 ? <SessionList sessions={pastSessions} /> : ( */}
                        <p>No past entries found. Click "Start New Session" to begin your journey.</p>
                    {/* )} */}
                </div>
            </div>
        </main>
    );
};

export default HavenPage;