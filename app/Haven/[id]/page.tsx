import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MiraAssistant from "@/component/Mira/therapist"; 
import { getcompanion } from "@/lib/action/therapist.action";



interface  TherapySessionProps{
  params: Promise<{id:string}>
}

// Server Component - fetches user data and renders the session page
const TherapySession = async ({ params }: TherapySessionProps) => {
    
    const {id} = await params
    const companion = await getcompanion(id)
    const user = await currentUser();
    const {preferred_name,style,voice,goal,struggle} = companion

      if (!user) {
        redirect("/sign-in");
    }

    const userImage = user.imageUrl || "/logo.png";
    return (
        <main className="min-h-screen pt-4 pb-12 bg-gray-50">
            
            <MiraAssistant 
            style={style}
            voice={voice}
            preferred_name={preferred_name}
            userImage={userImage} 
            goal={goal}              
            struggle={struggle}     
            therapyId={id}   
             />
        </main>
    )
}

export default TherapySession;