// ExercisesPreviewSection.jsx
import React from "react";

const ExerciseCard = ({
  title,
  description,
  imgSrc,
  imgAlt,
}: {
  title: string;
  description: string;
  imgSrc: string;
  imgAlt: string;
}) => (
  <div
    className="group rounded-xl overflow-hidden glassmorphism transform 
               hover:-translate-y-2 transition-transform duration-300 relative z-10"
  >
    <img alt={imgAlt} className="h-48 w-full object-cover" src={imgSrc} />
    <div className="p-6">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-black/60 ">{description}</p>
    </div>
  </div>
);

export const ExercisesPreviewSection = () => {
  const exercises = [
    {
      title: "Breathing Relaxation",
      description:
        "Practice deep breathing techniques to calm your mind and body.",
      imgSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA1nqJJ1HikYv9Xw7Nc2IQwHlIKl5jLCiXBV3kbRRkFgnj4-lFQ-pFVfnImNDVX0NMh5NFj4JOb9D5lfhWUHyWOnZVmBsFlTDwsvsfdMdUI4QiVrevnl-8xUB0wo_LC5VISVIdfH1j2oVOiDxLYjoDVirPfHkpDcy9b6UfLVdGDXLqE3ZHS3bvgWQuRqaO-1fft5at_35-FqLnttBopr0D6dgbP-E-lUto6QJ77Ya6jPvqKGCeWV2QgK28RKTmdVVCSkSpFRn5pJIQ",
      imgAlt: "Breathing Relaxation Illustration",
    },
    {
      title: "Mindful Speaking",
      description:
        "Engage in mindful speaking exercises to enhance self-awareness.",
      imgSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCIp7adbVu5MXiHzi0CUJZs-eqJR6vPZWSiwFeqv6VtmBAxr2yr4kGs2H3lAIXoPqkAMRxuv9qz28oXtPs8o53xYslRzkQxXgsUzYKmpNUfBHopeO2WZPRlQ7bS6hbgC-3JyPlsQw0B-Y06n-miMTSSwvYpOW57TPrt9250Gcfmg-eh4Jo47SEs7ql1N4YVMgt2Ydb3NywXbpUS25IDZAViYzvwIoXWclxlatQUU4ejyxM8qVmIR6gY_kk3CtlTxnuTFf-X3UQYdMo",
      imgAlt: "Mindful Speaking Illustration",
    },
    {
      title: "Emotional Expression",
      description:
        "Explore exercises designed to help you express your emotions effectively.",
      imgSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA8c5rd6oBXTPCo6g6iZ4_kLs_5AP_2J5b6OWBImihPp_es8YM9PwexCRnGIgm4rdWEqjgWUMzSMOQlGTBPEayG_tgUWdx5L7GSY17cDcxsMLaCfVELAKmjQ02SAxycxbVplBG27VcZ2IITwGti0vXm_AWYIJ2FGCklbHuTMeI-5liknD-cH-D1ZPlNJUZxWecNVczOul1YBrNB4brBF7OnX8pCy2uXECqBMpaZMprl71xbbfsRw_WuX9BlRzoPMOjwkH3AYcUXU5U",
      imgAlt: "Emotional Expression Illustration",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-50 via-white to-indigo-50"></div>

      {/* Spotlight blobs */}
      <div className="absolute -top-10 left-1/4 w-[20rem] h-[20rem] bg-gradient-to-r from-pink-200 to-transparent opacity-40 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[22rem] h-[22rem] bg-gradient-to-l from-indigo-200 to-transparent opacity-40 blur-3xl rounded-full -z-10"></div>

      <h2 className="text-3xl font-bold text-center mb-12 relative z-10">
        Daily Exercises Preview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.title} {...exercise} />
        ))}
      </div>
    </section>
  );
};
