// --- @/types/db.ts or types.ts ---

/**
 * Interface for the 'Users' table data structure.
 * Note: This primarily serves as a reference since user data is managed by Clerk.
 */
export interface User {
    id: string;             // The Clerk userId (TEXT in DB)
    created_at: string;     // timestamp with time zone
    email: string | null;   // text
    full_name: string | null; // text
}


// --- Therapy Session Types ---

/**
 * Interface for the 'TherapySessions' table data structure.
 * This is the full structure as retrieved from the database.
 */
export interface TherapySession {
    session_id: number;     // int8 (BIGSERIAL)
    start_time: string;     // timestamp with time zone
    user_id: string;        // Foreign Key to Users.id (TEXT)
    
    // Nullable fields
    end_time: string | null;        // timestamp
    goal_focus: string | null;      // text
    session_summary: string | null; // text
}

/**
 * Type used when creating a new session record.
 * Only includes fields that are NOT auto-generated (session_id, start_time, user_id).
 */
export type CreateSession = {
    // goal_focus is the only optional parameter needed for insertion
    goal_focus?: string;
};

/**
 * Type used for fetching multiple session records, enabling pagination/limits.
 */
export type GetPastSessions = {
    limit?: number; // Maximum number of sessions to return
};

// --- Update Types ---

/**
 * Type used when ending a session.
 * The session_id is passed as a parameter, and these fields are updated.
 */
export type EndSessionUpdate = {
    end_time: string;
    session_summary: string;
};

export const voices = {
  female: {
    empathetic: "voice-id-1",
    energetic: "voice-id-2",
    friendly: "voice-id-3",
  },
  male: {
    empathetic: "voice-id-4",
    energetic: "voice-id-5",
    friendly: "voice-id-6",
  },
};

interface CreateTherapy {
    preferred_name: string; // <-- Note the underscore here
    voice: "male" | "female";
    style: "casual" | "formal";
    struggle: string;
    goal: string;
    pronouns?: string | undefined;
    
}

interface CreateSessionData {
  goal_focus: string;
}

interface UpdateSessionData {
  end_time?: Date;
  goal_focus?: string;
  session_summary?: string;
}

interface SessionResponse {
  success: boolean;
  data?: any;
  error?: string;
}

