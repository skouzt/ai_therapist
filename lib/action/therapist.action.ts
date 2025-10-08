"use server";

import { auth } from "@clerk/nextjs/server";
import { createsupabaseClient } from "@/lib/supabase/server";
import { CreateTherapy, SessionResponse } from "@/types";


export const createUserProfile = async (formData: CreateTherapy) => {
    const { userId: author } = await auth(); 
    if (!author) {
        throw new Error("Authentication failed: User ID not found.");
    }
    
    const supabase = await createsupabaseClient();

    const dataToUpsert = { id: author,  ...formData,  };
    
    const { data, error } = await supabase
        .from('user')
        .upsert(dataToUpsert)
        .select('id') 
        .single(); 

    if (error || !data) {
        throw new Error(error?.message || "Failed to create or update user profile."); 
    }

    return data; 
}

export const getcompanion = async(id: string) => {
    const supabse = await createsupabaseClient()
   const {data, error} = await supabse
    .from('user')
    .select()
    .eq('id',id)
    if(error) return console.log(error)
        return data[0]
}
export const addToTherapySessions = async (user: string) => {
    const {userId} =await auth()
    const supabase =  await createsupabaseClient()
    const{data, error} = await supabase.from('TherapySessions')
    .insert({
        therapy_id :user,
        user_id :userId,

    })
    if(error) throw new Error(error.message);
    return data
}


export async function getUserTherapySessions(): Promise<SessionResponse> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const supabase = await createsupabaseClient();

    const { data: sessions, error } = await supabase
      .from("TherapySessions")
      .select("*")
      .eq("user_id", userId)
      .order("start_time", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: sessions };
  } catch (error) {
    console.error("Error fetching therapy sessions:", error);
    return { success: false, error: "Failed to fetch sessions" };
  }
}


export async function getTherapySessionById(
  sessionId: number
): Promise<SessionResponse> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const supabase = await createsupabaseClient();

    const { data: session, error } = await supabase
      .from("TherapySessions")
      .select("*")
      .eq("session_id", sessionId)
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, error: error.message };
    }

    if (!session) {
      return { success: false, error: "Session not found" };
    }

    return { success: true, data: session };
  } catch (error) {
    console.error("Error fetching therapy session:", error);
    return { success: false, error: "Failed to fetch session" };
  }
}

