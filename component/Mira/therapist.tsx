'use client';

import { cn, configureAssistant } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import getMiraColor from "@/constants/index"; 
import { Mic, MicOff, Phone, PhoneOff, Loader2, Brain, Repeat2 } from "lucide-react"; 

// IMPORT YOUR DATABASE ACTIONS
import { 
    updateTherapySession, 
    endTherapySession 
} from "@/lib/action/therapist.action";

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHING = "FINISHING", 
    FINISHED = "FINISHED",
}

interface MiraAssistantProps {
    userName: string;
    userImage: string;
    style: string;
    voice: string;
}

const MiraAssistant = ({
    userName,
    userImage,
    style,
    voice,
}: MiraAssistantProps) => {
    // --- State and Constants (Unchanged functionality) ---
    const assistantName = "Mira, The Wellness Guide";

    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    
    const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
    
    const [messages, setMessages] = useState<{ role: string; content: string }[]>(
        []
    );
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const transcriptRef = useRef<HTMLDivElement>(null); 

    // --- useEffects (Vapi Listeners & Scroll) - UNCHANGED ---
    useEffect(() => {
        if (transcriptRef.current) {
            transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (isSpeaking) lottieRef.current?.play();
        else lottieRef.current?.stop();
    }, [isSpeaking]);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        
        const onCallEnd = () => {
            if (callStatus === CallStatus.ACTIVE && currentSessionId !== null) {
                handleFinishSession(currentSessionId);
            } else {
                setCallStatus(CallStatus.FINISHED);
            }
        };

        const onMessage = (message: any) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                const newMessage = { role: message.role, content: message.transcript };
                setMessages((prev) => [...prev, newMessage]);
            }
        };

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);
        const onError = (error: Error) => {
            console.error("Mira error:", error);
            setCallStatus(CallStatus.FINISHED);
        }

        vapi.on("call-start", onCallStart);
        vapi.on("call-end", onCallEnd);
        vapi.on("message", onMessage);
        vapi.on("error", onError);
        vapi.on("speech-start", onSpeechStart);
        vapi.on("speech-end", onSpeechEnd);

        return () => {
            vapi.off("call-start", onCallStart);
            vapi.off("call-end", onCallEnd);
            vapi.off("message", onMessage);
            vapi.off("error", onError);
            vapi.off("speech-start", onSpeechStart);
            vapi.off("speech-end", onSpeechEnd);
        };
    }, [callStatus, currentSessionId]);

    // --- Control Functions - UNCHANGED ---
    const ToggleMicrophone = () => {
        const muted = vapi.isMuted();
        vapi.setMuted(!muted);
        setIsMuted(!muted);
    };

    const generateSummary = (): string => {
        return messages
            .map(m => `${m.role === 'assistant' ? assistantName : userName}: ${m.content}`)
            .join('\n\n');
    };

    const handleFinishSession = async (sessionId: number) => {
        setCallStatus(CallStatus.FINISHING); 
        
        const finalSummary = generateSummary();

        try {
            const result = await endTherapySession(sessionId, finalSummary);
            
            if (result.success) {
                console.log(`Session ${sessionId} successfully ended and recorded.`);
            } else {
                console.error("Failed to save session:", result.error);
                alert(`Failed to save session: ${result.error}`);
            }
        } catch (error) {
            console.error("Failed to save session summary:", error);
            alert("An error occurred while saving the session.");
        } finally {
            setCurrentSessionId(null);
            setCallStatus(CallStatus.FINISHED);
            setMessages([]);
        }
    };

    // START SESSION (VAPI call + Database write)
    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING);
        
        try {
            // Create new therapy session in database
            const result = await createTherapySession({
                goal_focus: `Therapy session with ${assistantName}`,
            });

            if (!result.success || !result.data) {
                throw new Error(result.error || "Failed to create session");
            }

            //@ts-ignore
            setCurrentSessionId(result.data.session_id);

            // Configure and start VAPI call
            const assistantOverrides = {
                variableValues: { userName },
                clientMessages: ["transcript"],
                serverMessages: [],
            };
            
            //@ts-expect-error
            vapi.start(configureAssistant(voice, style), assistantOverrides);

        } catch (error) {
            console.error("Failed to start session:", error);
            setCallStatus(CallStatus.INACTIVE);
            setCurrentSessionId(null);
            alert("Failed to start session. Please check authentication and database connection.");
        }
    };

    // END SESSION
    const handleDisconnect = () => {
        vapi.stop(); 
    };

    // --- Status Flags - UNCHANGED ---
    const isCallActive = callStatus === CallStatus.ACTIVE;
    const isConnecting = callStatus === CallStatus.CONNECTING;
    const isFinishing = callStatus === CallStatus.FINISHING; 
    const isFinished = callStatus === CallStatus.FINISHED;
    const isInactive = callStatus === CallStatus.INACTIVE;
    const isDisabled = isConnecting || isFinishing;

    // --- JSX RENDER (FIXED DESIGN) ---
    return (
        <div className="max-w-6xl mx-auto p-4 space-y-6">
            
            {/* 1. Header/Lesson Bar */}
            <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-purple-100/70 border border-purple-200">
                        <Brain className="size-6 text-purple-600" />
                    </div>
                    <div>
                        <p className="font-bold text-lg text-gray-800">{assistantName}</p>
                        <p className="text-sm text-gray-500">
                            Current Style: {style.charAt(0).toUpperCase() + style.slice(1)}
                        </p>
                    </div>
                </div>
                <div className="text-gray-500 text-sm font-medium">
                    {isCallActive ? `Session Time: Live` : (isFinished ? 'Session Ended' : 'Ready to Start')}
                </div>
            </div>

            {/* 2. Main Content Layout (70/30 Split) */}
            <section className="flex gap-4 h-[70vh] max-sm:flex-col">
                
                {/* 2a. Left Panel: Mira Visual & Transcript */}
                <div className="flex flex-col w-[68%] max-sm:w-full space-y-4">
                    
                    {/* Mira Visual Container */}
                    <div className="relative flex flex-col items-center justify-center p-12 h-[55%] border-2 border-orange-400 rounded-2xl bg-gradient-to-br from-orange-50 to-gray-50 shadow-sm">
                        
                        {/* Icon/Lottie Area */}
                         <div 
                            className="flex items-center justify-center rounded-2xl size-36 mb-4" 
                            style={{ backgroundColor: getMiraColor(style) }}
                        >
                            {isCallActive && isSpeaking ? (
                                <div className="size-36">
                                    <Lottie
                                        lottieRef={lottieRef}
                                        animationData={soundwaves}
                                        autoPlay={false}
                                        loop
                                    />
                                </div>
                            ) : (
                                <Brain className="size-20 text-white" />
                            )}
                        </div>                       
                        
                        {/* Dynamic status message */}
                        <p className="text-center text-gray-500 text-sm absolute bottom-6 max-w-md">
                            {isFinished && messages.length > 0
                                ? "Session summary is now available in your history."
                                : isInactive 
                                ? "Click 'Start Session' to begin." 
                                : isConnecting 
                                ? "Establishing secure connection..."
                                : isFinishing
                                ? "Finalizing and saving session data..."
                                : isSpeaking
                                ? "Mira is speaking..."
                                : isCallActive
                                ? "Start talking to Mira."
                                : null}
                        </p>
                    </div>

                    {/* Transcript Section */}
                    <div className="relative flex-grow min-h-[150px] border border-gray-200 rounded-2xl p-6 overflow-hidden bg-white shadow-sm">
                        <div 
                            ref={transcriptRef} 
                            className="overflow-y-auto w-full h-full flex flex-col gap-3 text-base pr-2" 
                        >
                            {(isInactive || isFinished) && messages.length === 0 && (
                                <p className="text-center text-gray-400 italic text-base mt-8">
                                    Conversation transcript will appear here once the session starts.
                                </p>
                            )}

                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex",
                                        message.role === "assistant" ? "justify-start" : "justify-end"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "p-3 rounded-2xl max-w-[80%] shadow-md text-sm",
                                            message.role === "assistant"
                                                ? "bg-gray-100 text-gray-800 rounded-tl-none"
                                                : "bg-purple-600 text-white rounded-br-none"
                                        )}
                                    >
                                        <span className="font-semibold mr-1">
                                            {message.role === "assistant" ? "Mira" : userName}:
                                        </span>{" "}
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Transcript Fade */}
                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent z-10 rounded-b-xl" />
                    </div>
                </div>

                {/* 2b. Right Panel: User & Controls */}
                <div className="flex flex-col w-[32%] max-sm:w-full space-y-4">
                    
                    {/* User Profile Card */}
                    <div className="flex flex-col items-center p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
                        <Image
                            src={userImage}
                            alt={userName}
                            width={120}
                            height={120}
                            className="rounded-full object-cover shadow-md mb-4"
                        />
                        <p className="font-bold text-xl text-gray-900">{userName}</p>
                        <p className="text-sm text-gray-500 mt-1">User</p>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex-grow flex flex-col gap-3">
                        
                        {/* Small Button Row */}
                        <div className="flex gap-3">
                            {/* Mic Toggle Button */}
                            <button
                                onClick={ToggleMicrophone}
                                disabled={!isCallActive || isDisabled}
                                className={cn(
                                    "flex-1 p-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border",
                                    !isCallActive || isDisabled ? "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200" :
                                    isMuted 
                                        ? "bg-white text-gray-700 hover:bg-gray-50 border-gray-300" 
                                        : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                                )}
                            >
                                {isMuted ? <MicOff className="size-5" /> : <Mic className="size-5" />}
                                {isMuted ? "Mic Off" : "Mic On"}
                            </button>
                            
                            {/* Repeat Button */}
                            <button
                                disabled={!isCallActive || isDisabled}
                                className={cn(
                                    "flex-1 p-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border",
                                    "bg-white text-blue-600 hover:bg-blue-50 border-blue-200",
                                    (!isCallActive || isDisabled) && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                <Repeat2 className="size-5" />
                                Repeat
                            </button>
                        </div>
                        
                        {/* Large Start/End Button */}
                        <button
                            onClick={isCallActive ? handleDisconnect : handleCall}
                            className={cn(
                                "rounded-xl py-5 font-bold text-white text-lg transition-all flex items-center justify-center gap-3 w-full shadow-md hover:shadow-lg",
                                isCallActive || isFinishing || isConnecting
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "bg-green-500 hover:bg-green-600",
                                isDisabled && "opacity-80 cursor-wait",
                            )}
                            disabled={isDisabled}
                        >
                            {isConnecting && (<Loader2 className="animate-spin size-5" />)}
                            {isFinishing && (<Loader2 className="animate-spin size-5" />)}
                            
                            {isConnecting ? "Connecting..." : 
                            isFinishing ? "Saving Session..." : 
                            isCallActive ? (
                                <>
                                    <PhoneOff className="size-5" />
                                    End Session
                                </>
                            ) : (
                                <>
                                    <Phone className="size-5" />
                                    Start Session
                                </>
                            )}
                        </button>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default MiraAssistant;