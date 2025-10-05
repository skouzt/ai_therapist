// app/companion/[id]/page.tsx

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MiraAssistant from "@/component/Mira/therapist"; 

// --- ASSISTANT CONFIGURATION FUNCTION ---
// Configure VAPI settings based on the companion ID
async function fetchAssistantConfig(id: string) {
    
    // Default config
    let config = {
        style: "calm", 
        voice: "female",
    };

    // Determine the style based on the companion ID
    if (id.includes('calm') || id.includes('empathetic')) {
        config.style = "calm"; 
    } else if (id.includes('energetic') || id.includes('friendly')) {
        config.style = "energetic"; 
    }
    
    // NOTE: If you need different voices, update the logic below
    config.voice = "female";

    console.log(`Using assistant config for ID: ${id}`, config);
    return config;
}

// ------------------------------------------------------------------------------------

interface TherapySessionProps {
    params: { id: string }
}

// Server Component - fetches user data and renders the session page
const TherapySession = async ({ params }: TherapySessionProps) => {
    
    // Get companion ID
    const companionId = params.id;

    // Handle missing or invalid ID
    if (!companionId || companionId === "undefined") {
        redirect("/");
    }

    // 1. Get authenticated user from Clerk
    const user = await currentUser();

    // 2. Redirect to sign-in if not authenticated
    if (!user) {
        redirect("/sign-in");
    }

    // 3. Fetch assistant configuration
    const companionConfig = await fetchAssistantConfig(companionId); 

    // 4. Extract required data
    const { style, voice } = companionConfig;
    // Use the specific style name from the ID (e.g., "calm", "energetic")
    // Fallback to the determined config style if ID doesn't contain a clear style word
    const finalStyle = companionId.split('-').pop() || style; 
    
    const userName = user.firstName || user.username || "User";
    const userImage = user.imageUrl || "/logo.png";

    // 5. Render the session page
    return (
        <main className="min-h-screen pt-4 pb-12 bg-gray-50">
            {/* The entire layout, including the header, is now handled by MiraAssistant for design consistency */}
            
            {/* Client Component: MiraAssistant */}
            <MiraAssistant 
                style={finalStyle} 
                voice={voice} 
                userName={userName}
                userImage={userImage}
            />
        </main>
    )
}

export default TherapySession;