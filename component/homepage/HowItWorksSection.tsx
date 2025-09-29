// HowItWorksSection.jsx
import React from "react";

const StepCard = ({ title, description }: { title: string; description: string }) => (
  <div className="p-6 glassmorphism rounded-xl text-center relative z-10">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-black/60">{description}</p>
  </div>
);

export const HowItWorksSection = () => {
  const steps = [
    {
      title: "Speak to Mira",
      description:
        "Begin by sharing your thoughts and feelings with our AI voice therapist.",
    },
    {
      title: "Guided Voice Exercises",
      description:
        "Engage in tailored voice exercises designed to address your specific needs.",
    },
    {
      title: "Personalized Feedback",
      description:
        "Receive insightful feedback based on your voice patterns and progress.",
    },
    {
      title: "Track Your Progress",
      description:
        "Monitor your journey and celebrate your achievements with our tools.",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Diagonal Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-100 via-white to-indigo-100"></div>

      {/* Soft Gradient Spotlights */}
      <div className="absolute top-1/4 left-1/3 w-[18rem] h-[18rem] bg-gradient-to-r from-rose-200 to-transparent opacity-40 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[20rem] h-[20rem] bg-gradient-to-l from-indigo-200 to-transparent opacity-40 blur-3xl rounded-full -z-10"></div>

      <h2 className="text-3xl font-bold text-center mb-12 relative z-10">
        How Mira Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {steps.map((step) => (
          <StepCard
            key={step.title}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>
  );
};
