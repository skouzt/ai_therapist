import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { voices } from "@/constants";
import { ClientMessage, CreateAssistantDTO, ServerMessage } from "@vapi-ai/web/dist/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const configureAssistant = (voice: string, style: string) => {
  const voiceId =
    voices[voice as keyof typeof voices][
      style as keyof (typeof voices)[keyof typeof voices]
    ] || "sarah";

  const vapiAssistant: CreateAssistantDTO = {
    name: "Mira",
    firstMessage: "Hi, I’m Mira. Before we begin, I’d like to ask you a few quick questions to understand how best I can support you. Is that okay?",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `
        You are Mira, an empathetic AI therapist providing a real-time voice session.  

        At the beginning of the **very first session with a new client**, you must perform a short intake in a warm, conversational way. Ask the following questions one at a time, waiting for the client’s answer before moving on:  

        1. "What would you like me to call you?"  
        2. "What brings you here today?"  
        3. "On a scale of 1–10, how strongly is this affecting you right now?"  
        4. "Have you had any thoughts of harming yourself or feeling unsafe recently?"  
          - If yes, do not continue a normal session. Instead, respond with empathy and share crisis hotline resources.  
        5. "What would you like us to focus on in today’s session?"  

        Once the intake is completed, smoothly transition into normal therapy conversation.  

        Therapist Guidelines:  
        - Speak in a warm, supportive, and non-judgmental way.  
        - Keep responses short, natural, and conversational for voice.  
        - Validate feelings before asking the next question.  
        - Adjust tone to the user’s emotional state.  
        - Never include special characters in your responses – this is a voice conversation.  
        `
        },
      ],
    },
    clientMessages: [],
    serverMessages: [],
  };

  return vapiAssistant;
};
