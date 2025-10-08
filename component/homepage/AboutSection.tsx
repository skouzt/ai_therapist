import Link from "next/link";
import React from "react";

// AboutSection.jsx
export const AboutSection = () => {
  return (
    <section className="relative py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center rounded-xl overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-blue-100 -z-10"></div>

      <div>
        <h2 className="text-3xl font-bold mb-4">About Mira</h2>
        <p className="text-black leading-relaxed">
          Mira is an AI-powered voice therapy app designed to make mental health
          support accessible and convenient. Our mission is to empower
          individuals to take control of their emotional well-being through
          personalized voice exercises and insightful feedback. We believe that
          everyone deserves to feel heard and supported on their journey to a
          healthier mind.
        </p>
      </div>
      <div>
        <img
          alt="Abstract illustration"
          className="rounded-xl shadow-lg w-full h-auto"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8aHpfzU8wCC2ieIvluwbK6GBZwWPCUgAJ8jDtAYXTDiTKgSpvsbyoU1p1Zy1m8DwMZ1FSScIRJ6aVxSFzRmrMr8q1AUj6zo-5DWkeY6y5UCCNpL8DvRge8aSuxd6t9HU6WSgXBs_JqQJfLtF6e7ejfXXnhFPdxheWpeTHbWEMWuDGsNH6rwURw04M44kNvC59teRJbV74bU6ZV4XOS9rFC83PgF7mLYx2Lbh84kwSE17--nJOfDzr6c8f0YfdwlxOr12W-ijdX3A"
        />
      </div>
    </section>
  );
};

// CtaSection.jsx (Call to Action)
export const CtaSection = () => {
  return (
    <section className="relative text-center py-20 my-20 rounded-xl overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-transparent to-blue-200 -z-10"></div>

      <h2 className="text-4xl font-bold max-w-2xl mx-auto">
        Start your healing journey today.
      </h2>
       <Link href="/Haven/new" passHref>
      <button
        className="mt-8 bg-primary text-white font-bold py-4 px-8 
                   rounded-full shadow-lg shadow-primary/30 hover:scale-105 
                   transition-all duration-300"
      >
        Get Started with Mira
      </button>
      </Link>
    </section>
  );
};

// Footer.jsx
export const Footer = () => {
  const footerLinks = [
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  return (
    <footer className="relative py-10 text-center text-black overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-blue-100 -z-10"></div>

      <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
        {footerLinks.map((link) => (
          <a
            key={link.name}
            className="hover:text-primary transition-colors"
            href={link.href}
          >
            {link.name}
          </a>
        ))}
      </div>
      <p>© 2025 Mira. All rights reserved.</p>
    </footer>
  );
};
