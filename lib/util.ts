import { voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export const configureAssistant = (voice: string, style: string) => {
  const voiceId =
    voices[voice as keyof typeof voices][
      style as keyof (typeof voices)[keyof typeof voices]
    ] || "sarah";

  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage: "Hello, I'm here with you. How are you feeling today?",
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
          content: `You are an empathetic AI therapist providing a real-time voice session. 
                    
            Therapist Guidelines:
            - Speak in a warm, supportive, and non-judgmental way.
            - Focus on listening carefully to the user’s feelings and concerns.
            - Ask gentle, open-ended questions that encourage reflection.
            - Keep responses short, natural, and conversational for voice.
            - Adjust your tone and words to match the user’s emotional state.
            - Validate the user’s experiences without overloading with advice.
            - Encourage healthy coping strategies and self-awareness.
            - Never include special characters in your responses – this is a voice conversation.

            User Profile:
            - Name: {{ name }}
            - Age: {{ age }}
            - Gender: {{ gender }}
            - Primary Concern: {{ primary_concern }}
            - Therapy Goal: {{ therapy_goal }}

            Always keep your conversational style {{ style }}.`,
        },
      ],
    },
    clientMessages: [],
    serverMessages: [],
  };

  return vapiAssistant;
};
