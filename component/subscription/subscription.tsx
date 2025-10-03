"use client";
import React, { useState } from 'react';

const CheckIcon = () => (
  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
  </svg>
);

const ChevronIcon = ({ isOpen }) => (
  <svg className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
  </svg>
);

const PricingCard = ({ title, price, features, isPro, buttonText = "Subscribe" }) => (
  <div className={`glassmorphism p-8 rounded-xl flex flex-col relative ${isPro ? 'pro-glow border-2 border-primary' : ''}`}>
    {isPro && (
      <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
        RECOMMENDED
      </div>
    )}
    <h3 className="text-2xl font-bold text-black mb-2">{title}</h3>
    <p className="mb-6">
      <span className="text-5xl font-black text-black">${price}</span>
      <span className="text-black/70">/month</span>
    </p>
    <ul className="space-y-4 mb-8 text-black/80 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-3">
          <CheckIcon />
          {feature}
        </li>
      ))}
    </ul>
    <button className={`w-full font-bold py-3 rounded-lg transition-colors ${
      isPro 
        ? 'bg-primary text-white hover:opacity-90' 
        : 'bg-primary/20 text-primary hover:bg-primary/30'
    }`}>
      {buttonText}
    </button>
  </div>
);

const FAQItem = ({ question, answer, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <details className="glassmorphism rounded-lg p-5 group" open={isOpen} onClick={(e) => {
      e.preventDefault();
      setIsOpen(!isOpen);
    }}>
      <summary className="flex justify-between items-center cursor-pointer font-medium text-black list-none">
        {question}
        <ChevronIcon isOpen={isOpen} />
      </summary>
      <p className="mt-4 text-black/70">{answer}</p>
    </details>
  );
};

export const Subscription = () => {
  const pricingPlans = [
    {
      title: "Basic",
      price: 0,
      features: [
        "5 voice therapy sessions per month",
        "Basic breathing exercises",
        "Progress tracking",
        "Community support"
      ],
      isPro: false
    },
    {
      title: "Pro",
      price: 19,
      features: [
        "Unlimited voice therapy sessions",
        "Advanced vocal exercises",
        "Real-time AI feedback",
        "Personalized therapy plans",
        "Priority support",
        "Progress analytics"
      ],
      isPro: true
    },
    {
      title: "Premium",
      price: 39,
      features: [
        "Everything in Pro",
        "1-on-1 virtual sessions",
        "Custom exercise programs",
        "Family sharing (up to 4 members)",
        "Dedicated therapist support",
        "Export therapy reports",
        "Early access to new features"
      ],
      isPro: false
    }
  ];

  const faqs = [
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can easily upgrade or downgrade your plan at any time through your account settings. Changes will be reflected in your next billing cycle.",
      defaultOpen: true
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and various other payment options depending on your region.",
      defaultOpen: false
    },
    {
      question: "How does the AI voice therapy work?",
      answer: "Mira uses advanced AI to analyze your voice patterns, breathing, and emotional tone. It provides personalized exercises and real-time feedback to help improve your vocal health and emotional well-being.",
      defaultOpen: false
    },
    {
      question: "Is there a free trial available?",
      answer: "Our 'Basic' plan is always free and offers a great way to get started with voice therapy. You can try out the core features before upgrading to a paid plan.",
      defaultOpen: false
    }
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white">
      <main className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-black mb-4">
            Choose the plan that's right for you
          </h1>
          <p className="text-lg text-black/70">
            Upgrade anytime, cancel anytime.
          </p>
        </section>

        {/* Pricing Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </section>
      </main>

      <style jsx>{`
        .glassmorphism {
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        .pro-glow {
          box-shadow: 0 0 20px 5px rgba(153, 66, 240, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Subscription;
