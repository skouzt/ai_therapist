"use server";

import { auth } from "@clerk/nextjs/server";
import { createsupabaseClient } from "../supabase";

// Types
export interface CreateTherapist {
  name: string;
  style: string;
  voice: string;
  language: string;
  gender: string;
  primary_concern: string;
  therapy_goal: string;
}

export interface UpdateTherapist extends Partial<CreateTherapist> {
  id: string;
}

export interface TherapistSession {
  id?: string;
  profile_id: string;
  started_at: string;
  ended_at?: string;
  title?: string;
  summary?: string;
}

export const createTherapist = async (formData: CreateTherapist) => {
  const { userId: author } = await auth();

  if (!author) {
    throw new Error("User not authenticated");
  }

  const supabase = createsupabaseClient();

  const { data, error } = await supabase
    .from("therapist")
    .insert({ ...formData, author })
    .select()
    .single();

  if (error) {
    console.error("Error creating therapist:", error);
    throw new Error(error.message || "Failed to create therapist");
  }

  if (!data) {
    throw new Error("No data returned from therapist creation");
  }

  return data;
};

// Get all therapists for the authenticated user
export const getUserTherapists = async () => {
  const { userId: author } = await auth();

  if (!author) {
    throw new Error("User not authenticated");
  }

  const supabase = createsupabaseClient();

  const { data, error } = await supabase
    .from("therapist")
    .select("*")
    .eq("author", author)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching therapists:", error);
    throw new Error(error.message || "Failed to fetch therapists");
  }

  return data || [];
};

// Get a specific therapist by ID
export const getTherapistById = async (therapistId: string) => {
  const { userId: author } = await auth();

  if (!author) {
    throw new Error("User not authenticated");
  }

  const supabase = createsupabaseClient();

  const { data, error } = await supabase
    .from("therapist")
    .select("*")
    .eq("id", therapistId)
    .eq("author", author)
    .single();

  if (error) {
    console.error("Error fetching therapist:", error);
    throw new Error(error.message || "Failed to fetch therapist");
  }

  return data;
};

// Update an existing therapist
export const updateTherapist = async (updateData: UpdateTherapist) => {
  const { userId: author } = await auth();

  if (!author) {
    throw new Error("User not authenticated");
  }

  const supabase = createsupabaseClient();
  const { id, ...updateFields } = updateData;

  const { data, error } = await supabase
    .from("therapist")
    .update(updateFields)
    .eq("id", id)
    .eq("author", author)
    .select()
    .single();

  if (error) {
    console.error("Error updating therapist:", error);
    throw new Error(error.message || "Failed to update therapist");
  }

  return data;
};

// Delete a therapist
export const deleteTherapist = async (therapistId: string) => {
  const { userId: author } = await auth();

  if (!author) {
    throw new Error("User not authenticated");
  }

  const supabase = createsupabaseClient();

  // First, delete all associated sessions
  await supabase.from("session_history").delete().eq("profile_id", therapistId);

  // Then delete the therapist
  const { error } = await supabase
    .from("therapist")
    .delete()
    .eq("id", therapistId)
    .eq("author", author);

  if (error) {
    console.error("Error deleting therapist:", error);
    throw new Error(error.message || "Failed to delete therapist");
  }

  return { success: true };
};

// Session management functions

// Create a new therapy session
export const createSession = async (profileId: string, title?: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const supabase = createsupabaseClient();

  // Verify the therapist belongs to the user
  const { data: therapist } = await supabase
    .from("therapist")
    .select("id")
    .eq("id", profileId)
    .eq("author", userId)
    .single();

  if (!therapist) {
    throw new Error("Therapist not found or access denied");
  }

  const { data, error } = await supabase
    .from("session_history")
    .insert({
      profile_id: profileId,
      started_at: new Date().toISOString(),
      title: title || `Session ${new Date().toLocaleDateString()}`,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating session:", error);
    throw new Error(error.message || "Failed to create session");
  }

  return data;
};

// End a therapy session
export const endSession = async (sessionId: number, summary?: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const supabase = createsupabaseClient();

  // Verify session belongs to user's therapist
  const { data: session } = await supabase
    .from("session_history")
    .select(
      `
      id,
      therapist:profile_id (
        author
      )
    `
    )
    .eq("id", sessionId)
    .single();

  if (!session || session.therapist?.author !== userId) {
    throw new Error("Session not found or access denied");
  }

  const { data, error } = await supabase
    .from("session_history")
    .update({
      ended_at: new Date().toISOString(),
      summary: summary,
    })
    .eq("id", sessionId)
    .select()
    .single();

  if (error) {
    console.error("Error ending session:", error);
    throw new Error(error.message || "Failed to end session");
  }

  return data;
};

// Get all sessions for a therapist
export const getTherapistSessions = async (therapistId: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const supabase = createsupabaseClient();

  // Verify therapist belongs to user
  const { data: therapist } = await supabase
    .from("therapist")
    .select("id")
    .eq("id", therapistId)
    .eq("author", userId)
    .single();

  if (!therapist) {
    throw new Error("Therapist not found or access denied");
  }

  const { data, error } = await supabase
    .from("session_history")
    .select("*")
    .eq("profile_id", therapistId)
    .order("started_at", { ascending: false });

  if (error) {
    console.error("Error fetching sessions:", error);
    throw new Error(error.message || "Failed to fetch sessions");
  }

  return data || [];
};

// Get a specific session
export const getSessionById = async (sessionId: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const supabase = createsupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .select(
      `
      *,
      therapist:profile_id (
        id,
        name,
        style,
        voice,
        language,
        gender,
        primary_concern,
        therapy_goal
      )
    `
    )
    .eq("id", sessionId)
    .single();

  if (error) {
    console.error("Error fetching session:", error);
    throw new Error(error.message || "Failed to fetch session");
  }

  // Verify session belongs to user's therapist
  if (data.therapist?.author !== userId) {
    throw new Error("Session not found or access denied");
  }

  return data;
};

// Update session details
export const updateSession = async (
  sessionId: number,
  updates: { title?: string; summary?: string }
) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const supabase = createsupabaseClient();

  // Verify session belongs to user's therapist
  const { data: session } = await supabase
    .from("session_history")
    .select(
      `
      id,
      therapist:profile_id (
        author
      )
    `
    )
    .eq("id", sessionId)
    .single();

  if (!session || session.therapist?.author !== userId) {
    throw new Error("Session not found or access denied");
  }

  const { data, error } = await supabase
    .from("session_history")
    .update(updates)
    .eq("id", sessionId)
    .select()
    .single();

  if (error) {
    console.error("Error updating session:", error);
    throw new Error(error.message || "Failed to update session");
  }

  return data;
};

// Delete a session
export const deleteSession = async (sessionId: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const supabase = createsupabaseClient();

  // Verify session belongs to user's therapist
  const { data: session } = await supabase
    .from("session_history")
    .select(
      `
      id,
      therapist:profile_id (
        author
      )
    `
    )
    .eq("id", sessionId)
    .single();

  if (!session || session.therapist?.author !== userId) {
    throw new Error("Session not found or access denied");
  }

  const { error } = await supabase
    .from("session_history")
    .delete()
    .eq("id", sessionId);

  if (error) {
    console.error("Error deleting session:", error);
    throw new Error(error.message || "Failed to delete session");
  }

  return { success: true };
};
