"use client";
import { useState } from "react";
import { CheckCircle, Play, X } from "lucide-react";

const FeaturedCard = ({ item }) => (
  <div className="flex-shrink-0 w-80">
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-2xl border border-slate-200/50 shadow-lg ${item.shadow} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
    >
      <div
        className="h-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${item.image})` }}
      ></div>
      <div className="p-5">
        <p className="font-bold text-lg text-slate-900">{item.title}</p>
        <p className="text-sm text-slate-500 mb-2">{item.category}</p>
        <p className="text-sm text-slate-500 mb-4">{item.duration}</p>
        <button className="w-full bg-purple-100 text-purple-700 border border-purple-200 font-bold py-3 px-4 rounded-lg hover:bg-purple-200 transition-colors shadow-sm">
          Start Now
        </button>
      </div>
    </div>
  </div>
);

const ExerciseItemCard = ({ exercise, onPlay }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-2xl border border-slate-200/50 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className={`flex items-center justify-center h-32 ${exercise.bgColor}`}>
      <span className="text-5xl opacity-80">{exercise.icon}</span>
    </div>
    <div className="p-4">
      <p className="font-bold text-slate-900 mb-1">{exercise.title}</p>
      <p className="text-sm text-slate-500 mb-3">{exercise.duration}</p>
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-semibold ${exercise.tagColor} py-1 px-2 rounded-md`}
        >
          {exercise.tag}
        </span>
        <button
          onClick={() => onPlay(exercise)}
          className="p-2 rounded-full text-white bg-purple-400/50 hover:bg-purple-500/70 transition-colors"
        >
          <Play className="w-5 h-5 text-purple-800" />
        </button>
      </div>
    </div>
  </div>
);

// --- Modal Component ---
const ExerciseModal = ({ exercise, onClose }) => {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-96 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col items-center text-center">
          <div className={`flex items-center justify-center h-32 w-full ${exercise.bgColor} rounded-xl mb-4`}>
            <span className="text-6xl">{exercise.icon}</span>
          </div>
          <h2 className="text-xl font-bold mb-2">{exercise.title}</h2>
          <p className="text-slate-500 text-sm mb-4">{exercise.duration} • {exercise.tag}</p>

          {/* Simulated "player" */}
          <div className="bg-slate-100 w-full h-16 flex items-center justify-center rounded-lg mb-4">
            <Play className="w-6 h-6 text-purple-600" />
            <span className="ml-2 text-slate-600">Playing Exercise...</span>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition"
          >
            Finish Exercise
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MiraExercises() {
  const [activeExercise, setActiveExercise] = useState(null);

  const featuredContent = [
    {
      title: "Vocal Warm-up",
      category: "Voice Reflection",
      duration: "5 min",
      image: "/first.png",
      shadow: "shadow-purple-500/5 hover:shadow-purple-500/10",
    },
    {
      title: "Mindful Breathing",
      category: "Stress & Relaxation",
      duration: "10 min",
      image: "/second.png",
      shadow: "shadow-indigo-500/5 hover:shadow-indigo-500/10",
    },
    {
      title: "Cognitive Puzzle",
      category: "Cognitive Challenges",
      duration: "7 min",
      image: "/third.png",
      shadow: "shadow-pink-500/5 hover:shadow-pink-500/10",
    },
  ];

  const exercises = [
    {
      title: "Voice Analysis",
      duration: "5 min",
      icon: "🎵",
      tag: "Voice Analysis",
      bgColor: "bg-purple-100/50",
      tagColor: "bg-purple-100 text-purple-600",
    },
    {
      title: "Mood Check-in",
      duration: "3 min",
      icon: "😊",
      tag: "Audio Guided",
      bgColor: "bg-indigo-100/50",
      tagColor: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Emotional Expression",
      duration: "7 min",
      icon: "🧠",
      tag: "Text Prompts",
      bgColor: "bg-pink-100/50",
      tagColor: "bg-pink-100 text-pink-600",
    },
    {
      title: "Vocal Journal",
      duration: "10 min",
      icon: "🎤",
      tag: "Voice Analysis",
      bgColor: "bg-purple-100/50",
      tagColor: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 
      bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] relative">
      
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_500px_at_50%_200px,#C4B5FD,transparent),radial-gradient(circle_500px_at_50%_800px,#A5B4FC,transparent)]"></div>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-10 lg:mb-14">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900">Mind & Voice Exercises</h2>
          <div className="flex items-center gap-2 bg-green-100/50 text-green-600 font-semibold py-2 px-4 rounded-full text-sm">
            <CheckCircle className="w-5 h-5" />
            <span>2 Done Today</span>
          </div>
        </div>

        {/* Featured Content */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-slate-900">Featured Content</h3>
          <div className="flex overflow-x-auto gap-8 pb-6 -mx-4 px-4 scrollbar-hide">
            {featuredContent.map((item, index) => (
              <FeaturedCard key={index} item={item} />
            ))}
          </div>
        </section>

        {/* Exercise Grid */}
        <section>
          <div className="border-b border-slate-200 mb-8">
            <nav className="flex gap-8 -mb-px overflow-x-auto">
              <a className="py-3 px-1 border-b-2 border-purple-600 text-purple-600 font-semibold text-sm whitespace-nowrap" href="#">
                Voice Reflection & Mood
              </a>
              <a className="py-3 px-1 border-b-2 border-transparent text-slate-500 hover:text-purple-600 hover:border-purple-600/50 font-medium text-sm transition-colors whitespace-nowrap" href="#">
                Stress & Relaxation
              </a>
              <a className="py-3 px-1 border-b-2 border-transparent text-slate-500 hover:text-purple-600 hover:border-purple-600/50 font-medium text-sm transition-colors whitespace-nowrap" href="#">
                Cognitive Challenges
              </a>
            </nav>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {exercises.map((exercise, index) => (
              <ExerciseItemCard key={index} exercise={exercise} onPlay={setActiveExercise} />
            ))}
          </div>
        </section>
      </main>

      {/* Modal */}
      <ExerciseModal exercise={activeExercise} onClose={() => setActiveExercise(null)} />
    </div>
  );
}
