// CalmnessTrackerSection.jsx
import React from "react";

const TrackerGraph = () => (
  <svg
    fill="none"
    height="100%"
    preserveAspectRatio="none"
    viewBox="-3 0 478 150"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
      stroke="#42b6f0"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    ></path>
  </svg>
);

export const CalmnessTrackerSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-blue-50 via-white to-emerald-50"></div>

      {/* Soft glow blobs */}
      <div className="absolute top-1/3 left-1/4 w-[18rem] h-[18rem] bg-gradient-to-r from-sky-200 to-transparent opacity-40 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[20rem] h-[20rem] bg-gradient-to-l from-emerald-200 to-transparent opacity-40 blur-3xl rounded-full -z-10"></div>

      <h2 className="text-3xl font-bold text-center mb-12 relative z-10">
        Track Your Calmness
      </h2>

      <div className="p-8 glassmorphism rounded-xl relative z-10">
        <p className="text-lg font-medium">Calmness Level Over Time</p>
        <div className="flex items-baseline gap-4 mt-2">
          <p className="text-5xl font-bold text-primary">75%</p>
          <div className="flex items-center gap-1 text-green-500 font-medium">
            <span>+10%</span>
            <span className="text-sm text-black/60 dark:text-white/60">
              (Last 30 Days)
            </span>
          </div>
        </div>
        <div className="mt-8 h-48">
          <TrackerGraph />
        </div>
      </div>
    </section>
  );
};
