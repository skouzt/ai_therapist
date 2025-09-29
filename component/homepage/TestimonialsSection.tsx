import React from "react";

const TestimonialCard = ({
  quote,
  author,
  imgSrc,
}: {
  quote: string;
  author: string;
  imgSrc: string;
}) => (
  <div className="glassmorphism p-6 rounded-lg relative z-10">
    <img
      className="w-16 h-16 rounded-full mx-auto mb-4"
      src={imgSrc}
      alt={`${author}'s profile picture`}
    />
    <p className="text-black/60 italic text-center">"{quote}"</p>
    <p className="font-bold mt-4 text-center">- {author}</p>
  </div>
);

const testimonials = [
  {
    quote:
      "Mira has been a game-changer for my mental health. The personalized exercises have helped me manage my anxiety.",
    author: "Sarah M.",
    imgSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDDihRWjuq5_bSx9b2HBeaXwYncYSmYPX6IiB8MXVk0h28yPxPO4vAa3K2SS-ead9dSJZ8l4fGmtVvHx_qgQoPSe-RSj5flkS-FcL6hfsmLVbNPYdy6vDpao7qVwx5jV3-sLOnBMnz3H0COFW0N369VZX44pLfUHUNj9akvS0YiPXCOghuVOYe9n82fDIDsln_14ybDA5nBs9W9TNr1NYWUI5Y2vxjPulJfb6a5f_NHJJ_FwUcdnPugg2RIePF4enFyGWP9Zt4C4hU",
  },
  {
    quote:
      "I was skeptical, but Mira's feedback is incredibly insightful. It's like having a therapist in my pocket.",
    author: "David L.",
    imgSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4dceFtjdjGCIxyoUE2uWpet-b1yiZKqlvxbNpJbdfuUOzTDjt1K8UiwxKVtltyitlhbtOIFxgW_m5YK5PpUcps872oZso3GiH3g80rXA5N6y0mspgYOnW1tGQD2Hoin5iDUfSyoXXOu52fxNorvKF4K4HMeDMPCS_eEuWlLsG1Bwb6i1fyGW0a3JQAIaeuKcPu9KePhacv8SvzTcqXD8ORCPOcoDOKM8WUVzncjBGbeoODeC-zUZQJjCJ0jNLsBj6ZdHxNDs-S1Q",
  },
  {
    quote:
      "The progress tracking is so motivating. Seeing my improvements has boosted my confidence.",
    author: "Emily R.",
    imgSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4pFQ_20zyPrc2zSM7Y5bIJO7PhjNGyeCvIwRushOmv5AzVj-_VMTkFL79aICr5ks1tvBF5bM16zx0mkLc0mh3AtEMrRSHoe3UzA9FV0s4EfXyjcw8gFQgD5Cmg337hZHIz6DiHwq2bGPMcuJy0xj7a7fnbx09iupyOIlYypgOM1SJo076zlVi5bvBoPLC0hhQsU53p0hn0ZENt21fj56fpoSI_pZAKaV90f5uDB7aUVHVqaYGTcKycxP4bPNOEDwMwQgPz2IbQVo",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="relative py-20 overflow-hidden rounded-xl">
      {/* gradient orbs background */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-300/40 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-300/40 rounded-full blur-3xl" />

      <h2 className="text-3xl font-bold text-center mb-12 relative z-10">
        Testimonials / Success Stories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 pb-8 relative z-10">
        {testimonials.map((t) => (
          <TestimonialCard key={t.author} {...t} />
        ))}
      </div>
    </section>
  );
};
