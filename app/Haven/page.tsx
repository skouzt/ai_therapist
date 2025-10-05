// app/haven/page.tsx

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
// Assuming you have a component to list previous sessions/journals
// import SessionList from '@/components/haven/session-list'; 

// Fetch data for the page (Server Component)
const HavenPage = async () => {
    // 1. Authentication Check
    const user = await currentUser();

    if (!user) {
        // Redirect unauthenticated users to the sign-in page
        redirect("/sign-in");
    }

    // Optional: Fetch the user's past therapy sessions or journals here.
    // const pastSessions = await getPastSessions(user.id);

    return (
        <main className="max-w-7xl mx-auto py-12 px-6">
            <header className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    Your Haven 🧘‍♀️
                </h1>
                
                {/* Button to redirect to the new session creation page */}
                <Link href="/Haven/new" passHref>
                    <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150">
                        <Plus className="w-5 h-5" />
                        Start New Session
                    </button>
                </Link>
            </header>

            <div className="border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Past Sessions & Journals
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