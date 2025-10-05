"use server";

import { auth } from "@clerk/nextjs/server";
import { createsupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { CreateTherapy, SessionResponse, UpdateSessionData } from "@/types";


export const createTherapy = async (formData: CreateTherapy) => {
    const { userId: author } = await auth();
    const supabase = await createsupabaseClient();

    const { data, error } = await supabase.from('user').insert({ ...formData, author }).select();

    if (error || !data) throw new Error(error?.message || "failed to create a session");

    return data[0];
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
/**
 * 
 * Get all therapy sessions for the current user
 */
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

/**
 * Get a specific therapy session by ID
 */
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

/**
 * Update a therapy session (end time, summary, etc.)
 */
export async function updateTherapySession(
  sessionId: number,
  updates: UpdateSessionData
): Promise<SessionResponse> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const supabase = await createsupabaseClient();

    // First verify the session belongs to the user
    const { data: existingSession, error: fetchError } = await supabase
      .from("TherapySessions")
      .select("session_id")
      .eq("session_id", sessionId)
      .eq("user_id", userId)
      .single();

    if (fetchError || !existingSession) {
      return { success: false, error: "Session not found or unauthorized" };
    }

    // Update the session
    const { data: updatedSession, error: updateError } = await supabase
      .from("TherapySessions")
      .update(updates)
      .eq("session_id", sessionId)
      .select()
      .single();

    if (updateError) {
      console.error("Supabase error:", updateError);
      return { success: false, error: updateError.message };
    }

    revalidatePath("/sessions");
    revalidatePath(`/sessions/${sessionId}`);
    return { success: true, data: updatedSession };
  } catch (error) {
    console.error("Error updating therapy session:", error);
    return { success: false, error: "Failed to update session" };
  }
}

/**
 * End a therapy session (set end_time and optionally add summary)
 */
export async function endTherapySession(
  sessionId: number,
  sessionSummary?: string
): Promise<SessionResponse> {
  try {
    const { userId } = await auth();

    console.log("🔐 Ending session - userId:", userId, "sessionId:", sessionId);

    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const supabase = await createsupabaseClient();
    
    console.log("🔍 Supabase client type:", typeof supabase);
    console.log("🔍 Supabase object keys:", Object.keys(supabase || {}));
    console.log("🔍 Has .from?:", typeof supabase?.from);

    // Check if session exists and belongs to user
    const { data: session, error: fetchError } = await supabase
      .from("TherapySessions")
      .select("*")
      .eq("session_id", sessionId)
      .eq("user_id", userId)
      .single();

    console.log("📋 Existing session:", session);
    console.log("❌ Fetch error:", fetchError);

    if (fetchError || !session) {
      return { success: false, error: "Session not found or unauthorized" };
    }

    if (session.end_time) {
      return { success: false, error: "Session already ended" };
    }

    // Update with end time
    const updateData: any = {
      end_time: new Date().toISOString(),
    };

    if (sessionSummary) {
      updateData.session_summary = sessionSummary;
    }

    console.log("📝 Updating session with:", updateData);

    const { data: updatedSession, error: updateError } = await supabase
      .from("TherapySessions")
      .update(updateData)
      .eq("session_id", sessionId)
      .select()
      .single();

    console.log("✅ Updated session:", updatedSession);
    console.log("❌ Update error:", updateError);

    if (updateError) {
      console.error("Supabase error:", updateError);
      return { success: false, error: updateError.message };
    }

    revalidatePath("/sessions");
    revalidatePath(`/sessions/${sessionId}`);
    return { success: true, data: updatedSession };
  } catch (error) {
    console.error("Error ending therapy session:", error);
    return { success: false, error: "Failed to end session" };
  }
}

/**
 * Delete a therapy session
 */
export async function deleteTherapySession(
  sessionId: number
): Promise<SessionResponse> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const supabase = await createsupabaseClient();

    // Verify session belongs to user before deleting
    const { data: session, error: fetchError } = await supabase
      .from("TherapySessions")
      .select("session_id")
      .eq("session_id", sessionId)
      .eq("user_id", userId)
      .single();

    if (fetchError || !session) {
      return { success: false, error: "Session not found or unauthorized" };
    }

    const { error: deleteError } = await supabase
      .from("TherapySessions")
      .delete()
      .eq("session_id", sessionId);

    if (deleteError) {
      console.error("Supabase error:", deleteError);
      return { success: false, error: deleteError.message };
    }

    revalidatePath("/sessions");
    return { success: true, data: { sessionId } };
  } catch (error) {
    console.error("Error deleting therapy session:", error);
    return { success: false, error: "Failed to delete session" };
  }
}

/**
 * Get active (ongoing) session for current user
 */
export async function getActiveSession(): Promise<SessionResponse> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const supabase = await createsupabaseClient();

    const { data: activeSession, error } = await supabase
      .from("TherapySessions")
      .select("*")
      .eq("user_id", userId)
      .is("end_time", null)
      .order("start_time", { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "no rows returned"
      console.error("Supabase error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: activeSession || null };
  } catch (error) {
    console.error("Error fetching active session:", error);
    return { success: false, error: "Failed to fetch active session" };
  }
}

/**
 * Get session statistics for current user
 */
export async function getSessionStatistics(): Promise<SessionResponse> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const supabase = await createsupabaseClient();

    // Get all sessions for the user
    const { data: sessions, error } = await supabase
      .from("TherapySessions")
      .select("start_time, end_time")
      .eq("user_id", userId);

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, error: error.message };
    }

    const totalSessions = sessions?.length || 0;
    const completedSessions =
      sessions?.filter((s) => s.end_time !== null).length || 0;
    const activeSessions = totalSessions - completedSessions;

    // Calculate total session time
    let totalMinutes = 0;
    sessions?.forEach((session) => {
      if (session.end_time) {
        const duration =
          new Date(session.end_time).getTime() -
          new Date(session.start_time).getTime();
        totalMinutes += duration / (1000 * 60);
      }
    });

    return {
      success: true,
      data: {
        totalSessions,
        completedSessions,
        activeSessions,
        totalMinutes: Math.round(totalMinutes),
        averageSessionMinutes:
          completedSessions > 0
            ? Math.round(totalMinutes / completedSessions)
            : 0,
      },
    };
  } catch (error) {
    console.error("Error fetching session statistics:", error);
    return { success: false, error: "Failed to fetch statistics" };
  }
}
